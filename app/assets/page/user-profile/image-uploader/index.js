/**
 * 图片上传器
 *
 * * ImageUploader
 * * List
 * * Item
 */

class ImageUploader {

}

class List {

}

class Item {
  state = 'empty'; // loading, success, error
  url = '';
  list = null;
  $el = null;

  onInputChange = () => {
    // todo
  };

  onLoadSuccess = () => {
    //
  };

  onLoadError = () => {
    //
  };

  onClose = () => {
    // todo
  };

  render() {
    // todo
  }

  didMount() {
    this.$el.on('change', 'input', this.onInputChange);
  }
}
