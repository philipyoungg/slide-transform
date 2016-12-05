// //////////////
// TO USE: assign variable to an element
// var slide = slideTransform({element: 'slide-container'})
// /////////////

((window) => {
  function SlideTransform(config) {
    if (typeof config !== 'object') {
      throw "you didn't provide object. Refer to documentation.";
    }
    if (!config.element) {
      throw 'you need to provide the element on parameter inside an object';
    }

    this.navigation = typeof config.navigation === 'undefined' ? true : config.navigation;
    this.container = document.querySelector(config.element);
    this.totalIndex = this.container.children.length;
    this.currIndex = config.index || 0;
    this.prevIndex = this.currIndex;

    this.initializeSlidesContainer();

    if (this.navigation) {
      this.renderCirclesContainer();
      this.circlesContainer = this.container.querySelector('.circles-container');
    }

    this.goToSlide(this.currIndex);
  }

  SlideTransform.prototype.initializeSlidesContainer = function () {
    Object.assign(this.container.style, {
      position: 'relative',
      overflow: 'hidden',
    });

    const proxySlidesContainer = document.createElement('div');
    proxySlidesContainer.classList.add('slides-container');
    Object.assign(proxySlidesContainer.style, {
      width: '100%',
      height: '100%',
      position: 'absolute',
      transition: '0.3s ease-in-out',
    });

      // cut all slides from container to slidesContainer
    while (this.container.children.length > 0) {
      proxySlidesContainer.appendChild(this.container.children[0]);
    }

    [].forEach.call(proxySlidesContainer.children, (slide, index) => {
      Object.assign(slide.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        transform: `translateX(${index * 100}%)`,
        webkitTransform: `translateX(${index * 100}%)`,
        MozTransform: `translateX(${index * 100}%)`,
      });
    });
    this.container.appendChild(proxySlidesContainer);
  };

  SlideTransform.prototype.goToSlide = function (newIndex) {
    if (newIndex >= 0 && newIndex < this.totalIndex) {
      this.prevIndex = this.currIndex;
      this.currIndex = newIndex;
      const offset = newIndex * -100;

      Object.assign(this.container.children[0].style, {
        transform: `translateX(${offset}%)`,
        webkitTransform: `translateX(${offset}%)`,
        MozTransform: `translateX(${offset}%)`,
      });

      if (this.navigation) {
        this.container.children[1].children[this.prevIndex].classList.remove('active');
        this.container.children[1].children[this.currIndex].classList.add('active');
      }
    } else {
        console.error('slide index error, report this when you encountered this error.'); //eslint-disable-line
    }
  };

  SlideTransform.prototype.nextSlide = function () {
    if (this.currIndex < this.totalIndex - 1) {
      const newIndex = this.currIndex + 1;
      this.goToSlide(newIndex);
    }
  };

  SlideTransform.prototype.prevSlide = function () {
    if (this.currIndex > 0) {
      const newIndex = this.currIndex - 1;
      this.goToSlide(newIndex);
    }
  };

  SlideTransform.prototype.subscribeNextSlide = function () {
    document.querySelector().addEventListener('click', () => {
      this.nextSlide();
    });
  };

  SlideTransform.prototype.subscribePrevSlide = function () {
    document.querySelector().addEventListener('click', () => {
      this.prevSlide();
    });
  };

  SlideTransform.prototype.renderCirclesContainer = function () {
    const circlesContainer = document.createElement('div');
    circlesContainer.classList.add('circles-container');
    Object.assign(circlesContainer.style, {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    });
    this.container.appendChild(circlesContainer);

    for (let index = 0; index < this.container.children[0].children.length; index++) {
      const circle = document.createElement('div');
      circle.classList.add('circle');
      circle.setAttribute('slide-index', index);
      circle.addEventListener('click', (e) => {
        this.goToSlide(Number(e.target.getAttribute('slide-index')));
      });
      circlesContainer.appendChild(circle);
    }

    circlesContainer.children[this.currIndex].classList.add('active');
  };
  window.SlideTransform = SlideTransform;
})(window);

const x = new SlideTransform({
  element: '.container',
});
