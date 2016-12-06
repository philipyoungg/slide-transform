((window) => {
  // helpers
  const forEach = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i);
    }
  };

  function SlideTransform(config) {
    const initializeSlidesContainer = (container) => {
      Object.assign(container.style, {
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
      while (container.children.length > 0) {
        proxySlidesContainer.appendChild(container.children[0]);
      }

      forEach(proxySlidesContainer.children, (slide, index) => {
        Object.assign(slide.style, {
          width: '100%',
          height: '100%',
          position: 'absolute',
          transform: `translateX(${index * 100}%)`,
          webkitTransform: `translateX(${index * 100}%)`,
        });
      });
      container.appendChild(proxySlidesContainer);
    };

    const renderStepsContainer = (container) => {
      const slidesContainer = container.querySelector('.slides-container');
      const stepsContainer = document.createElement('div');
      stepsContainer.classList.add('steps-container');
      container.appendChild(stepsContainer);

      for (let index = 0; index < slidesContainer.children.length; index++) {
        const step = document.createElement('div');
        step.classList.add('step');
        step.setAttribute('slide-index', index);
        step.addEventListener('click', (e) => {
          this.goToSlide(Number(e.target.getAttribute('slide-index')));
        });
        stepsContainer.appendChild(step);
      }
    };

    // initialize

    if (typeof config !== 'object') {
      throw new Error("you didn't provide object. Refer to documentation.");
    }
    if (!config.element) {
      throw new Error('you need to provide the element on parameter inside an object');
    }

    this.navigation = typeof config.navigation === 'undefined' ? true : config.navigation;
    this.container = document.querySelector(config.element);
    if (!this.container) throw new Error('container element not found');
    this.totalIndex = this.container.children.length;
    this.currIndex = config.index || 0;
    this.prevIndex = this.currIndex;

    initializeSlidesContainer(this.container);

    if (this.navigation) {
      renderStepsContainer(this.container);
      this.stepsContainer = this.container.querySelector('.steps-container');
    }

    this.goToSlide(this.currIndex);
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
        const stepsContainer = this.container.querySelector('.steps-container');
        stepsContainer.children[this.prevIndex].classList.remove('active');
        stepsContainer.children[this.currIndex].classList.add('active');
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

  SlideTransform.prototype.subscribeNextSlide = function subscribeNextSlide(element) {
    document.querySelector(element).addEventListener('click', () => {
      this.nextSlide();
    });
  };

  SlideTransform.prototype.subscribePrevSlide = function subscribePrevSlide(element) {
    document.querySelector(element).addEventListener('click', () => {
      this.prevSlide();
    });
  };

  window.SlideTransform = SlideTransform; //eslint-disable-line
})(window);
