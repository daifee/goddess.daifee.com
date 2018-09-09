
import './styles.scss';
import ImageViewer from '../image-viewer';


const $ = window.$;


// image-viewer
$(document.body).on('click', '.blog-item .thumbnail-item', function () {
  const $target = $(this);
  const index = $target.index();
  const urls = [];
  $target.parent().children().each(function () {
    urls.push($(this).data('url'));
  });

  new ImageViewer(index, urls);
});
