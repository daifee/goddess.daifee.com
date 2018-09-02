import '../../component/navbar-layout';
import '../../component/blog-list';
import '../../component/pagination';
import './styles.scss';
import ImageUploader from './image-uploader';
import * as ajax from '../../util/ajax';

const $ = window.$;
const userId = window.location.pathname.split('/')[2];

const imageUploader = new ImageUploader(document.getElementById('image-uploader-container'), userId);
const $submitBtn = $('input[type="submit"]');

$('#micro-blog').on('submit', () => {
  const pictureUrls = imageUploader.getUrls();
  if (!pictureUrls.length) {
    // eslint-disable-next-line
    window.alert('图片不能为空');
    return false;
  }
  const text = $('#text').val();

  if (!text) {
    // eslint-disable-next-line
    window.alert('内容不能为空');
    return false;
  }

  $submitBtn.text('loading...');
  const api = `/api/v1/users/${userId}/micro-blogs/`;
  ajax.post(api, JSON.stringify({ text, pictureUrls }))
    .done(response => {
      console.log(response);
    })
    .fail(error => {
      console.log(error);
    })
    .always(() => {
      $submitBtn.text('发布');
    });
  return false;
});
