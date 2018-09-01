// import COS from 'cos-js-sdk-v5';
import '../../component/navbar-layout';
import '../../component/blog-list';
import '../../component/pagination';
import './styles.scss';
// import * as ajax from '../../util/ajax';
import ImageUploader from './image-uploader';

const userId = window.location.pathname.split('/')[2];

new ImageUploader(document.getElementById('image-uploader-container'), userId);

// const Bucket = 'goddess-1257388993';
// const Region = 'ap-chengdu';


// // 初始化实例
// const cos = new COS({
//   getAuthorization(options, callback) {
//     // 异步获取签名
//     ajax.get('/api/v1/cos/sts', {
//       bucket: options.Bucket,
//       region: options.Region,
//     })
//       .done(response => {
//         if (response.code) {
//           return callback(new Error(response.message));
//         }

//         const keys = response.data.credentials;
//         callback({
//           TmpSecretId: keys.tmpSecretId,
//           TmpSecretKey: keys.tmpSecretKey,
//           XCosSecurityToken: keys.sessionToken,
//           ExpiredTime: response.data.expiredTime,
//         });
//       })
//       .fail(error => {
//         callback(error);
//       });
//   },
// });

// // 监听选文件
// document.getElementById('picture-1').onchange = function () {

//   const file = this.files[0];
//   if (!file) return;
//   // 当天上传相同文件名，会覆盖
//   const day = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
//   const key = `${userId}/${day}-${file.name}`;
//   // 分片上传文件
//   cos.sliceUploadFile({
//     Bucket,
//     Region,
//     Key: key,
//     Body: file,
//     onProgress(info) {
//       console.log(info);
//     },
//   }, function (err, data) {
//     console.log(err, data);
//   });

// };
