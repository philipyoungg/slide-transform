(function(window) {
  'use strict';

  function defineFormy(config) {
    var
    Formy = {},
    slidesContainer,
    slides,
    totalSlide, // totalIndex
    circlesContainer,
    circles,
    prevIndex,
    currIndex;

    // make function global
    // Formy.initialize = initialize;
    Formy.nextSlide = nextSlide;
    Formy.prevSlide = prevSlide;
    Formy.goToSlide = goToSlide;
    Formy.subscribeNextSlide = subscribeNextSlide;
    Formy.subscribePrevSlide = subscribePrevSlide;

    // initialize Formy
    initialize();

    return Formy;

    // helper for creating an element
    function makeElement(settings) {
      var elem = document.createElement(settings.element);
      elem.classList.add(settings.class);
      return elem;
    }

    function initialize() {

      // check if element is defined
      if (typeof config.element === 'undefined' ) {
        throw new Error("you need to provide the element on parameter inside an object");
      }

      // set default value to true
      if (typeof config.navigation === 'undefined' ) {
        config.navigation = true;
      }

      // currIndex
      if (typeof config.index === 'undefined') {
        currIndex = 0;
      } else {
        currIndex = config.index;
      }

      // initialize the data needed
      prevIndex = currIndex;
      slidesContainer = element(config.element);
      slides = slidesContainer.children;
      totalSlide = slides.length;

      // generate offset [change with scss in the future]
      generateSlidesOffset();

      // render navigation if it's true
      if (config.navigation) {
        renderCirclesContainer();
        renderCircles();
      }

      goToSlide(currIndex);

    }

    //////////////////////////////////////////////////////////////////////////////

    function element(elem) {
      return document.querySelector(elem);
    }

    function allElement(elem) {
      return document.querySelectorAll(elem);
    }

    function subscribe(listener, elem, callback) {
      return elem.addEventListener(listener, callback);
    }

    function subscribeClick(elem, callback) {
      return subscribe('click', elem, callback);
    }

    function addClass(elem, className) {
      return elem.classList.add(className);
    }

    function removeClass(elem, className) {
      return elem.classList.remove(className);
    }

    function hasClass(elem, className) {
      return elem.classList.contains(className);
    }

    function addSibling(ref, elem) {
      return ref.parentNode.appendChild(elem);
    }

    function forEach(elem, callback) {
      return [].forEach.call(elem, callback);
    }

    //////////////////////////////////////////////////////////////////////////////

    function subscribeNextSlide(elem) {
      return subscribeClick(element(elem), nextSlide);
    }

    function subscribePrevSlide(elem) {
      return subscribeClick(element(elem), prevSlide);
    }

    //////////////////////////////////////////////////////////////////////////////

    function nextSlide() {
      if (currIndex < totalSlide - 1) {
        var newIndex = currIndex + 1;
        goToSlide(newIndex);
      }
    }

    function prevSlide() {
      if (currIndex > 0) {
        var newIndex = currIndex - 1;
        goToSlide(newIndex);
      }
    }

    function goToSlide(newIndex) {
      // if slides number are between possibilty
      if (newIndex >= 0 && newIndex < totalSlide) {

        // store previous index from current slide index
        prevIndex = currIndex;

        // change current index to the new one
        currIndex = newIndex;

        // this function returns the right transform translateX number
        var offset = generateOffset(newIndex);

        // offset the slide to new absolute place
        slidesContainer.style.transform = 'translateX(' + offset + '%)';

        // change circle active classes if it's rendered from config
        if (config.navigation) {
          replaceCurrentCircleClass(prevIndex, newIndex);
        }

      } else {
        console.error('slide index error, email hello@philipyoungg when you encountered this error.');
      }
    }

  //////////////////////////////////////////////////////////////////////////////

    function generateOffset(index) {
      return index * -100;
    }

    // replace with css on scss
    function generateSlidesOffset() {
      forEach(slides, addSlideOffset);
    }

    function addSlideOffset(item, index) {
      var offsetX = index * 100;
      slides[index].style.transform = 'translateX(' + offsetX + '%)';
    }

    //////////////////////////////////////////////////////////////////////////////

    function renderCirclesContainer() {
      circlesContainer = makeElement({
        element: 'div',
        class: 'circles-container'
      });
      circles = circlesContainer.children;
      addSibling(slidesContainer, circlesContainer);
    }

    function renderCircles() {
      forEach(slides, renderCircle);
      // initialize the class
      addClass(circles[currIndex], 'active');
    }

    function renderCircle(item, index) {
      var circle = makeElement({
        element: 'div',
        class: 'circle'
      });
      circle.setAttribute('slide-index', index);
      subscribeClick(circle, circleClickHandlers);
      circlesContainer.appendChild(circle);
    }

    function circleClickHandlers(e) {
      // convert from string to number
      var slideIndex = Number(e.target.getAttribute('slide-index'));
      goToSlide(slideIndex);
    }

    function replaceCurrentCircleClass(prevIndex, newIndex) {
      removeClass(circles[prevIndex], 'active');
      addClass(circles[newIndex], 'active');
    }

  }

  if ( typeof formy === 'undefined') {
    window.formy = defineFormy;
  } else {
    console.log("formy already defined.");
  }

})(window);

////////////////////////////////////////////////////////////////////////////////

var formy = [];

// var forms = formy({ element: '.page-container' });

// forms.subscribeNextSlide('.next-button');
// forms.subscribePrevSlide('.prev-button');

////////////////////////////////////////////////////////////////////////////////
