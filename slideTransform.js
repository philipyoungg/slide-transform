'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// //////////////
// TO USE: assign variable to an element
// var slide = slideTransform({element: 'slide-container'})
// /////////////

(function (window) {
  var slideTransform = function slideTransform(config) {
    var d = document;
    var container = void 0;
    var slidesContainer = void 0;
    var slides = void 0;
    var totalSlide = void 0; // totalIndex
    var circlesContainer = void 0;
    var circles = void 0;
    var prevIndex = void 0;
    var currIndex = void 0;

    // ////////////////////////////////////////////////////////////////////////////

    var forEach = function forEach(elem, callback) {
      return [].forEach.call(elem, callback);
    };

    // ////////////////////////////////////////////////////////////////////////////

    var addSlideOffset = function addSlideOffset(item, index) {
      var offset = index * 100;
      _extends(slides[index].style, {
        transform: 'translateX(' + offset + '%)',
        webkitTransform: 'translateX(' + offset + '%)',
        MozTransform: 'translateX(' + offset + '%)'
      });
    };

    var initializeSlideContainer = function initializeSlideContainer() {
      container = d.querySelector(config.element);
      if (!container) throw new Error('element are not defined or not available');
      _extends(container.style, {
        position: 'relative',
        overflow: 'hidden'
      });

      var proxySlidesContainer = d.createElement('div');
      _extends(proxySlidesContainer.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: '0.3s ease-in-out'
      });

      // cut all slides from container to slidesContainer
      while (container.children.length > 0) {
        _extends(container.children[0].style, {
          width: '100%',
          height: '100%',
          position: 'absolute'
        });
        proxySlidesContainer.appendChild(container.children[0]);
      }

      container.appendChild(proxySlidesContainer);
    };

    // ////////////////////////////////////////////////////////////////////////////

    var goToSlide = function goToSlide(newIndex) {
      if (newIndex >= 0 && newIndex < totalSlide) {
        prevIndex = currIndex;
        currIndex = newIndex;
        var offset = newIndex * -100;

        _extends(slidesContainer.style, {
          transform: 'translateX(' + offset + '%)',
          webkitTransform: 'translateX(' + offset + '%)',
          MozTransform: 'translateX(' + offset + '%)'
        });

        if (config.navigation) {
          circles[prevIndex].classList.remove('active');
          circles[newIndex].classList.add('active');
        }
      } else {
        console.error('slide index error, report this when you encountered this error.'); //eslint-disable-line
      }
    };

    var nextSlide = function nextSlide() {
      if (currIndex < totalSlide - 1) {
        var newIndex = currIndex + 1;
        goToSlide(newIndex);
      }
    };

    var prevSlide = function prevSlide() {
      if (currIndex > 0) {
        var newIndex = currIndex - 1;
        goToSlide(newIndex);
      }
    };

    var subscribeNextSlide = function subscribeNextSlide(element) {
      d.querySelector(element).addEventListener('click', function () {
        nextSlide();
      });
    };

    var subscribePrevSlide = function subscribePrevSlide(element) {
      d.querySelector(element).addEventListener('click', function () {
        prevSlide();
      });
    };

    // ////////////////////////////////////////////////////////////////////////////

    var renderCirclesContainer = function renderCirclesContainer() {
      circlesContainer = d.createElement('div');
      circlesContainer.classList.add('circles-container');
      circles = circlesContainer.children;
      slidesContainer.parentNode.appendChild(circlesContainer);
    };

    var renderCircle = function renderCircle(item, index) {
      var circle = d.createElement('div');
      circle.classList.add('circle');
      circle.setAttribute('slide-index', index);
      circle.addEventListener('click', function (e) {
        goToSlide(Number(e.target.getAttribute('slide-index')));
      });
      circlesContainer.appendChild(circle);
    };

    var renderCircles = function renderCircles() {
      forEach(slides, renderCircle);
      // initialize the class
      circles[currIndex].classList.add('active');
    };

    // ////////////////////////////////////////////////////////////////////////////

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
      throw new Error("you didn't provide object. Refer to documentation.");
    }

    if (!config.element) {
      throw new Error('you need to provide the element on parameter inside an object');
    }

    if (typeof config.navigation === 'undefined') {
      config.navigation = true; //eslint-disable-line
    }

    // initialize current index
    currIndex = typeof config.index === 'undefined' ? 0 : config.index;

    initializeSlideContainer();

    // initialize the data needed
    prevIndex = currIndex;
    slidesContainer = container.children[0];
    slides = slidesContainer.children;
    totalSlide = slides.length;

    forEach(slides, addSlideOffset);

    // render navigation if it's true
    if (config.navigation) {
      renderCirclesContainer();
      renderCircles();
    }

    goToSlide(currIndex);

    return {
      nextSlide: nextSlide,
      prevSlide: prevSlide,
      goToSlide: goToSlide,
      subscribeNextSlide: subscribeNextSlide,
      subscribePrevSlide: subscribePrevSlide
    };
  };

  // ////////////////////////////////////////////////////////////////////////////

  // initialize slide transform

  if (typeof slideTransform === 'undefined') {
    window.slideTransform = slideTransform; //eslint-disable-line
  } else {
    console.log('slideTransform already defined.'); //eslint-disable-line
  }
})(window);
