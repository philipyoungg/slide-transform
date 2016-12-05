'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (window) {
  function SlideTransform(config) {
    var _this = this;

    var initializeSlidesContainer = function initializeSlidesContainer() {
      _extends(_this.container.style, {
        position: 'relative',
        overflow: 'hidden'
      });

      var proxySlidesContainer = document.createElement('div');
      proxySlidesContainer.classList.add('slides-container');
      _extends(proxySlidesContainer.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: '0.3s ease-in-out',
        webkitTransition: '0.3s ease-in-out'
      });

      // cut all slides from container to slidesContainer
      while (_this.container.children.length > 0) {
        proxySlidesContainer.appendChild(_this.container.children[0]);
      }

      [].forEach.call(proxySlidesContainer.children, function (slide, index) {
        _extends(slide.style, {
          width: '100%',
          height: '100%',
          position: 'absolute',
          transform: 'translateX(' + index * 100 + '%)',
          webkitTransform: 'translateX(' + index * 100 + '%)'
        });
      });
      _this.container.appendChild(proxySlidesContainer);
    };

    var renderStepsContainer = function renderStepsContainer() {
      var stepsContainer = document.createElement('div');
      stepsContainer.classList.add('steps-container');
      _this.container.appendChild(stepsContainer);

      for (var index = 0; index < _this.container.children[0].children.length; index++) {
        var step = document.createElement('div');
        step.classList.add('step');
        step.setAttribute('slide-index', index);
        step.addEventListener('click', function (e) {
          _this.goToSlide(Number(e.target.getAttribute('slide-index')));
        });
        stepsContainer.appendChild(step);
      }

      stepsContainer.children[_this.currIndex].classList.add('active');
    };

    // initialize

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
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
      var offset = newIndex * -100;

      _extends(this.container.children[0].style, {
        transform: 'translateX(' + offset + '%)',
        webkitTransform: 'translateX(' + offset + '%)'
      });

      if (this.navigation) {
        var slidesContainer = this.container.querySelector('.slides-container');
        slidesContainer.children[this.prevIndex].classList.remove('active');
        slidesContainer.children[this.currIndex].classList.add('active');
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

  SlideTransform.prototype.subscribeNextSlide = function subscribeNextSlide() {
    var _this2 = this;

    document.querySelector().addEventListener('click', function () {
      _this2.nextSlide();
    });
  };

  SlideTransform.prototype.subscribePrevSlide = function subscribePrevSlide() {
    var _this3 = this;

    document.querySelector().addEventListener('click', function () {
      _this3.prevSlide();
    });
  };
})(window);
