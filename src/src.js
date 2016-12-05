// //////////////
// TO USE: assign variable to an element
// var slide = formy({element: 'slide-container'})
// /////////////

((window) => {
  const defineFormy = (config) => {
    const d = document;
    let container;
    let slidesContainer;
    let slides;
    let totalSlide; // totalIndex
    let circlesContainer;
    let circles;
    let prevIndex;
    let currIndex;

    // ////////////////////////////////////////////////////////////////////////////

    const forEach = (elem, callback) =>
      [].forEach.call(elem, callback);


    // ////////////////////////////////////////////////////////////////////////////

    const addSlideOffset = (item, index) => {
      const offset = index * 100;
      Object.assign(slides[index].style, {
        transform: `translateX(${offset}%)`,
        webkitTransform: `translateX(${offset}%)`,
        MozTransform: `translateX(${offset}%)`,
      });
    };

    const initializeSlideContainer = () => {
      container = d.querySelector(config.element);
      if (!container) throw new Error('element are not defined or not available');
      Object.assign(container.style, {
        position: 'relative',
        overflow: 'hidden',
      });

      const proxySlidesContainer = d.createElement('div');
      Object.assign(proxySlidesContainer.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: '0.3s ease-in-out',
      });

      // cut all slides from container to slidesContainer
      while (container.children.length > 0) {
        Object.assign(container.children[0].style, {
          width: '100%',
          height: '100%',
          position: 'absolute',
        });
        proxySlidesContainer.appendChild(container.children[0]);
      }

      container.appendChild(proxySlidesContainer);
    };

    // ////////////////////////////////////////////////////////////////////////////

    const goToSlide = (newIndex) => {
      if (newIndex >= 0 && newIndex < totalSlide) {
        prevIndex = currIndex;
        currIndex = newIndex;
        const offset = newIndex * -100;

        Object.assign(slidesContainer.style, {
          transform: `translateX(${offset}%)`,
          webkitTransform: `translateX(${offset}%)`,
          MozTransform: `translateX(${offset}%)`,
        });

        if (config.navigation) {
          circles[prevIndex].classList.remove('active');
          circles[newIndex].classList.add('active');
        }
      } else {
        console.error('slide index error, report this when you encountered this error.'); //eslint-disable-line
      }
    };

    const nextSlide = () => {
      if (currIndex < totalSlide - 1) {
        const newIndex = currIndex + 1;
        goToSlide(newIndex);
      }
    };

    const prevSlide = () => {
      if (currIndex > 0) {
        const newIndex = currIndex - 1;
        goToSlide(newIndex);
      }
    };

    const subscribeNextSlide = (element) => {
      d.querySelector(element).addEventListener('click', () => {
        nextSlide();
      });
    };

    const subscribePrevSlide = (element) => {
      d.querySelector(element).addEventListener('click', () => {
        prevSlide();
      });
    };

    // ////////////////////////////////////////////////////////////////////////////

    const renderCirclesContainer = () => {
      circlesContainer = d.createElement('div');
      circlesContainer.classList.add('circles-container');
      circles = circlesContainer.children;
      slidesContainer.parentNode.appendChild(circlesContainer);
    };

    const renderCircle = (item, index) => {
      const circle = d.createElement('div');
      circle.classList.add('circle');
      circle.setAttribute('slide-index', index);
      circle.addEventListener('click', (e) => {
        goToSlide(Number(e.target.getAttribute('slide-index')));
      });
      circlesContainer.appendChild(circle);
    };

    const renderCircles = () => {
      forEach(slides, renderCircle);
      // initialize the class
      circles[currIndex].classList.add('active');
    };

    // ////////////////////////////////////////////////////////////////////////////

    if (typeof config !== 'object') {
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
      nextSlide,
      prevSlide,
      goToSlide,
      subscribeNextSlide,
      subscribePrevSlide,
    };
  };

  // ////////////////////////////////////////////////////////////////////////////

  // initialize Formy

  if (typeof formy === 'undefined') {
    window.formy = defineFormy; //eslint-disable-line
  } else {
    console.log('formy already defined.'); //eslint-disable-line
  }
})(window);
