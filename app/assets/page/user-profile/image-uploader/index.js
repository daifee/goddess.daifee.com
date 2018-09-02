/**
 * 图片上传器
 *
 * * ImageUploader
 * * List
 * * Item
 */
import COS from 'cos-js-sdk-v5';
import * as ajax from '../../../util/ajax';
import itemTpl from './item.hbs';
import compare from '../../../handlebars-helper-dir/compare';
import './styles.scss';

const $ = window.$;
const Bucket = 'goddess-1257388993';
const Region = 'ap-chengdu';

// 初始化实例
const cos = new COS({
  getAuthorization(options, callback) {
    // 异步获取签名
    ajax.get('/api/v1/cos/sts', {
      bucket: options.Bucket,
      region: options.Region,
    })
      .done(response => {
        if (response.code) {
          return callback(new Error(response.message));
        }

        const keys = response.data.credentials;
        callback({
          TmpSecretId: keys.tmpSecretId,
          TmpSecretKey: keys.tmpSecretKey,
          XCosSecurityToken: keys.sessionToken,
          ExpiredTime: response.data.expiredTime,
        });
      })
      .fail(error => {
        callback(error);
      });
  },
});


export default class ImageUploader {
  constructor(el, path = '') {
    this.path = path;
    this.$el = $(el);
    this.list = new List(this);
  }

  getUrls() {
    const result = [];
    this.$el.find('.image>img').each(function () {
      result.push(this.src);
    });
    return result;
  }
}

class List {
  constructor(container) {
    this.Item = Item;
    this.container = container;
    this.addItem(this);
    this.addItem(this);
    this.addItem(this);
    this.addItem(this);
    this.addItem(this);
    this.addItem(this);
    this.addItem(this);
    this.addItem(this);
    this.addItem(this);
  }

  addItem() {
    const item = new this.Item(this);
    this.container.$el.append(item.$el);
  }
}

class Item {
  static id = 0;
  constructor(list) {
    Item.id++;
    this.id = 'image-loader-item-' + Item.id;
    this.state = 'empty'; // loading, success, error
    this.url = '';
    this.list = list;

    this.$el = null;
    this.init();
  }

  init() {
    this.render();
    this.mountEvent();
  }

  handleClear = () => {
    this.state = 'empty';
    this.url = '';
    this.$el.find('input').val('');
    this.render();
  }

  handleError() {
    this.state = 'error';
    this.url = '';
    this.$el.find('input').val('');
    this.render();
  }

  handleSuccess(data) {
    this.state = 'success';
    this.url = `https://${data.Location}`;
    this.render();
  }

  handleLoading() {
    this.state = 'loading';
    this.render();
  }

  onInputChange = () => {
    const input = this.$el.find('input')[0];
    const file = input.files[0];
    if (!file) {
      // return this.handleClear();
      return;
    }

    const day = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
    const key = `${this.list.container.path}/${day}-${file.name}`;

    this.handleLoading();
    cos.sliceUploadFile({
      Bucket,
      Region,
      Key: key,
      Body: file,
    }, (error, data) => {
      if (error) {
        this.handleError(error);
      } else {
        this.handleSuccess(data);
      }
    });
  };

  render() {
    const html = itemTpl({
      id: this.id,
      state: this.state,
      url: this.url,
    }, {
      helpers: { compare },
    });
    const $el = $(html);

    if (this.$el) {
      this.$el.replaceWith($el);
    }
    this.$el = $el;

    this.mountEvent();
    return this.$el;
  }

  mountEvent() {
    $(document.body)
      .on('change', `.${this.id} input`, this.onInputChange)
      .on('click', `.${this.id} .clear`, this.handleClear);

  }
}
