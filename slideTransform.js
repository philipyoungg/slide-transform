'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (window, d) {
  // helpers
  var forEach = function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
      callback(array[i], i);
    }
  };

  function SlideTransform(config) {
    var _this = this;

    var initializeSlidesContainer = function initializeSlidesContainer(container) {
      _extends(container.style, {
        position: 'relative',
        overflow: 'hidden'
      });

      var proxySlidesContainer = d.createElement('div');
      proxySlidesContainer.classList.add('slides-container');
      _extends(proxySlidesContainer.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: '0.3s ease-in-out',
        webkitTransition: '0.3s ease-in-out'
      });

      // cut all slides from container to slidesContainer
      while (container.children.length > 0) {
        proxySlidesContainer.appendChild(container.children[0]);
      }

      forEach(proxySlidesContainer.children, function (slide, index) {
        _extends(slide.style, {
          width: '100%',
          height: '100%',
          position: 'absolute',
          transform: 'translateX(' + index * 100 + '%)',
          webkitTransform: 'translateX(' + index * 100 + '%)'
        });
      });
      container.appendChild(proxySlidesContainer);
    };

    var renderStepsContainer = function renderStepsContainer(container) {
      var slidesContainer = container.querySelector('.slides-container');
      var stepsContainer = d.createElement('div');
      stepsContainer.classList.add('steps-container');
      container.appendChild(stepsContainer);

      for (var index = 0; index < slidesContainer.children.length; index++) {
        var step = d.createElement('div');
        step.classList.add('step');
        step.setAttribute('slide-index', index);
        step.addEventListener('click', function (e) {
          _this.goToSlide(Number(e.target.getAttribute('slide-index')));
        });
        stepsContainer.appendChild(step);
      }
    };

    // initialize

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
      throw new Error("you didn't provide object. Refer to documentation.");
    }
    if (!config.element) {
      throw new Error('you need to provide the element on parameter inside an object');
    }

    this.navigation = typeof config.navigation === 'undefined' ? true : config.navigation;
    this.container = d.querySelector(config.element);
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
      var offset = newIndex * -100;

      _extends(this.container.children[0].style, {
        transform: 'translateX(' + offset + '%)',
        webkitTransform: 'translateX(' + offset + '%)'
      });

      if (this.navigation) {
        var stepsContainer = this.container.querySelector('.steps-container');
        stepsContainer.children[this.prevIndex].classList.remove('active');
        stepsContainer.children[this.currIndex].classList.add('active');
      }
    } else {
      console.error('slide index error, report this when you encountered this error.'); //eslint-disable-line
    }
  };

  SlideTransform.prototype.nextSlide = function nextSlide() {
    if (this.currIndex < this.totalIndex - 1) {
      var newIndex = this.currIndex + 1;
      this.goToSlide(newIndex);
    }
  };

  SlideTransform.prototype.prevSlide = function prevSlide() {
    if (this.currIndex > 0) {
      var newIndex = this.currIndex - 1;
      this.goToSlide(newIndex);
    }
  };

  SlideTransform.prototype.subscribeNextSlide = function subscribeNextSlide(element) {
    var _this2 = this;

    d.querySelector(element).addEventListener('click', function () {
      _this2.nextSlide();
    });
  };

  SlideTransform.prototype.subscribePrevSlide = function subscribePrevSlide(element) {
    var _this3 = this;

    d.querySelector(element).addEventListener('click', function () {
      _this3.prevSlide();
    });
  };

  window.SlideTransform = function (config) {
    return new SlideTransform(config);
  }; //eslint-disable-line
})(window, document);
