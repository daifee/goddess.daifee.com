'use strict';

const crypto = require('crypto');
const { Service } = require('egg');

let tempKeysCache = {};

const util = {
  // 获取随机数
  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
  // obj 转 query string
  json2str(obj) {
    const arr = [];
    Object.keys(obj).sort().forEach(function(item) {
      const val = obj[item] || '';
      arr.push(item + '=' + val);
    });
    return arr.join('&');
  },
  // 计算签名
  getSignature(opt, method, domain, key) {
    const formatString = method + domain + '/v2/index.php?' + util.json2str(opt);
    const hmac = crypto.createHmac('sha1', key);
    const sign = hmac.update(new Buffer(formatString, 'utf8')).digest('base64');
    return sign;
  },
};

class TencentCosService extends Service {
  constructor(ctx) {
    super(ctx);
    // tencentCos配置，全部配置项小写开头（官方Demo是大写开头）
    this.config = ctx.app.config.tencentCos;
  }

  // 这里改成允许的路径前缀，这里可以根据自己网站的用户登录态判断允许上传的目录，例子：* 或者 user.id/*
  async getTempKeys(allowPrefix = '*') {
    const { bucket, region, url, domain, secretId, secretKey, proxy } = this.config;
    const shortBucketName = bucket.substr(0, bucket.lastIndexOf('-'));
    const appId = bucket.substr(1 + bucket.lastIndexOf('-'));
    const policy = {
      version: '2.0',
      statement: [{
        action: [
          // 简单文件操作
          'name/cos:PostObject',
          'name/cos:AppendObject',
          'name/cos:GetObject',
          'name/cos:HeadObject',
          'name/cos:OptionsObject',
          'name/cos:PostObjectRestore',
          // 分片上传操作
          'name/cos:InitiateMultipartUpload',
          'name/cos:ListMultipartUploads',
          'name/cos:ListParts',
          'name/cos:UploadPart',
          'name/cos:CompleteMultipartUpload',
          'name/cos:AbortMultipartUpload',
        ],
        effect: 'allow',
        principal: { qcs: [ '*' ] },
        resource: [
          `qcs::cos:${region}:uid/${appId}:prefix//${appId}/${shortBucketName}/${allowPrefix}`,
        ],
      }],
    };
    const policyStr = JSON.stringify(policy);

    // cache
    if (tempKeysCache.expiredTime - Date.now() / 1000 > 30 && tempKeysCache.policyStr === policyStr) {
      return tempKeysCache;
    }

    const Action = 'GetFederationToken';
    const Nonce = util.getRandom(10000, 20000);
    const Timestamp = parseInt(+new Date() / 1000);
    const Method = 'GET';

    const params = {
      Action,
      Nonce,
      Region: '',
      SecretId: secretId,
      Timestamp,
      durationSeconds: 7200,
      name: '',
      policy: policyStr,
    };
    params.Signature = encodeURIComponent(util.getSignature(params, Method, domain, secretKey));

    const requestUrl = url + '?' + util.json2str(params);
    let responseBody;
    try {
      const response = await this.app.curl(requestUrl, {
        dataType: 'json',
        headers: {
          Host: domain,
          Accept: 'application/json',
        },
        proxy: proxy || '',
      });
      // body
      responseBody = response.data;
    } catch (error) {
      this.ctx.throw(20501, error.message, { error });
    }

    if (responseBody.code) {
      const message = responseBody.errorDesc + ': ' + responseBody.code;
      this.ctx.throw(20502, '', { error: new Error(message) });
    }

    tempKeysCache = responseBody.data;
    tempKeysCache.policyStr = policyStr;
    return tempKeysCache;
  }
}

module.exports = TencentCosService;
