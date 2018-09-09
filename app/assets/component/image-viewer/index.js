
import Swiper from 'swiper/dist/js/swiper.min';
import 'swiper/dist/css/swiper.css';
import './styles.scss';
import template from './template.hbs';


const $ = window.$;

export default class ImageViewer {
  constructor(initialSlide = 0, urls = []) {
    this.urls = urls;
    this.$el = null;
    this.swiper = null;
    this.initialSlide = initialSlide;

    this.render();
    this.initSwiper();

    this.mountEvent();
  }

  initSwiper() {
    this.swiper = new Swiper(this.$el.find('.swiper-container')[0], {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      initialSlide: this.initialSlide,
    });
  }

  render() {
    const html = template({ urls: this.urls });
    this.$el = $(html);
    $(document.body).append(this.$el);
  }

  mountEvent() {
    this.$el.on('click', '.close', this.clear);
  }

  clear = () => {
    this.$el.remove();
  }
}
