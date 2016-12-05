((window) => {
  function SlideTransform(config) {
    const initializeSlidesContainer = () => {
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
        webkitTransition: '0.3s ease-in-out',
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
        });
      });
      this.container.appendChild(proxySlidesContainer);
    };

    const renderStepsContainer = () => {
      const stepsContainer = document.createElement('div');
      stepsContainer.classList.add('steps-container');
      this.container.appendChild(stepsContainer);

      for (let index = 0; index < this.container.children[0].children.length; index++) {
        const step = document.createElement('div');
        step.classList.add('step');
        step.setAttribute('slide-index', index);
        step.addEventListener('click', (e) => {
          this.goToSlide(Number(e.target.getAttribute('slide-index')));
        });
        stepsContainer.appendChild(step);
      }

      stepsContainer.children[this.currIndex].classList.add('active');
    };

    // initialize

    if (typeof config !== 'object') {
      throw "you didn't provide object. Refer to documentation.";
    }
    if (!config.element) {
      throw 'you need to provide the element on parameter inside an object';
    }

    this.navigation = typeof config.navigation === 'undefined' ? true : config.navigation;
    this.container = document.querySelector(config.element);
    if (!this.container) throw 'container element not found';
    this.totalIndex = this.container.children.length;
    this.currIndex = config.index || 0;
    this.prevIndex = this.currIndex;

    initializeSlidesContainer();

    if (this.navigation) {
      renderStepsContainer();
      this.stepsContainer = this.container.querySelector('.steps-container');
    }

    this.goToSlide(this.currIndex);

    window.SlideTransform = SlideTransform; //eslint-disable-line
  }

  SlideTransform.prototype.goToSlide = function goToSlide(newIndex) {
    if (newIndex >= 0 && newIndex < this.totalIndex) {
      this.prevIndex = this.currIndex;
      this.currIndex = newIndex;
      const offset = newIndex * -100;

      Object.assign(this.container.children[0].style, {
        transform: `translateX(${offset}%)`,
        webkitTransform: `translateX(${offset}%)`,
      });

      if (this.navigation) {
        const slidesContainer = this.container.querySelector('.slides-container');
        slidesContainer.children[this.prevIndex].classList.remove('active');
        slidesContainer.children[this.currIndex].classList.add('active');
      }
    } else {
        console.error('slide index error, report this when you encountered this error.'); //eslint-disable-line
    }
  };

  SlideTransform.prototype.nextSlide = function nextSlide() {
    if (this.currIndex < this.totalIndex - 1) {
      const newIndex = this.currIndex + 1;
      this.goToSlide(newIndex);
    }
  };

  SlideTransform.prototype.prevSlide = function prevSlide() {
    if (this.currIndex > 0) {
      const newIndex = this.currIndex - 1;
      this.goToSlide(newIndex);
    }
  };

  SlideTransform.prototype.subscribeNextSlide = function subscribeNextSlide() {
    document.querySelector().addEventListener('click', () => {
      this.nextSlide();
    });
  };

  SlideTransform.prototype.subscribePrevSlide = function subscribePrevSlide() {
    document.querySelector().addEventListener('click', () => {
      this.prevSlide();
    });
  };
})(window);
