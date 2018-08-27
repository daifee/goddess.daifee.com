import COS from 'cos-js-sdk-v5';
import '../../component/navbar-layout';
import '../../component/blog-list';
import '../../component/pagination';
import './styles.scss';

const $ = window.$;
const Bucket = 'goddess-1257388993';
const Region = 'ap-chengdu';

// 初始化实例
const cos = new COS({
    getAuthorization(options, callback) {
        // 异步获取签名
        $.get('/api/v1/cos/sts', {
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

// 监听选文件
document.getElementById('picture-1').onchange = function () {

    const file = this.files[0];
    if (!file) return;

    // 分片上传文件
    cos.sliceUploadFile({
        Bucket,
        Region,
        Key: 'a/' + file.name,
        Body: file,
    }, function (err, data) {
        console.log(err, data);
    });

};
