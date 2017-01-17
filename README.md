# Slide transform
Quick documentation are available below.
demo available on [http://slide.philipyoungg.com](http://slide.philipyoungg.com)

## Motivation

I wanted to make user experience better when filling out form. Tried to seach on Google and found no similar library available, so I made this.

This library helps you to separate single div to several pages. Example case: It makes filling long form easier for user. They can also go back to previous  and next page by using prev/next button .

## How to use

```html
<!-- add this on head -->
<head>
    <script src="slideTransform.min.js"></script>
    <link rel="stylesheet" href="slideTransform.css">
</head>
<body>
  <!-- slide with class container -->
  <div class="container">
    <!-- slides... -->
  </div>
  <script>
  // convert the container to slide
  var form = newSlideTransform({
    element: '.container',
    navigation: true,
  })
  </script>
</body>

```

## CSS behavior [IMPORTANT]

The container selector must have `width` and `height`.

```css
<!-- example css -->
.container {
  width: 500px;
  height: 300px;
  background: rgba(0, 0, 0, 0.1);
}
```

## Structure

### HTML structure
```html

<form class="container"> <!-- container form -->
  <div> <!-- div inside form automatically converted to pages. In this case, this is page one -->
  <h2>Personal Details</h2>
    <input type="text" placeholder="name">
    <input type="text" placeholder="email">
    </div>
  <div> <!-- page two -->
    <h2>Authentication</h2>
    <input type="text" placeholder="username">
    <input type="text" placeholder="password">
  </div>
  <div> <!-- last page -->
    <h2>Thank you!</h2>
    <button>Submit</button>
  </div>
</form>

```

### Slide binding

```javascript

// bind the HTML to form instance
var form = newSlideTransform({
  element: '.container',
  navigation: true,
})

```

## API

### Instantiate new slide
```javascript

var mySlides = newSlideTransform(config)

```

### Config options
```javascript

var config = {
    element: '.container', // class or ID selector
    navigation: false, // use false if you don't want to render current form location. Default to true.
}

var mySlides = newSlideTransform(config)

```

### Bind slide navigation
```javascript

var button = document.querySelector('#page3')

button.addEventListener('click', function() {
  mySlides.goToSlide(3)
}) // move to slide with index 3 

mySlides.subscribePrevSlide('#prev') // bind id prev to previous slide 
mySlides.subscribeNextSlide('#next') // bind id next to next slide 

```

