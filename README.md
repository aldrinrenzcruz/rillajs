# Rilla.js 

A Lightweight Vanilla JS Utility Library

[Visit Rilla.js Documentation](https://aldrinrenzcruz.github.io/rillajs/)

## Overview

Rilla is a minimalistic JavaScript utility library designed to simplify DOM selection, manipulation, and event handling without relying on larger external dependencies like jQuery.

## Features

- **DOM Selection** (`$`, `$id`)
- **DOM Manipulation** (`$append`, `$prepend`, `$paint`, `html`, `text`, `val`)
- **Attribute Handling** (`$attr`)
- **Class Management** (`addClass`, `removeClass`, `toggleClass`)
- **Event Handling** (`$click`, `$keydown`, `$submit`, etc.)
- **Storage Utilities** (`$local`, `$session`)
- **Element Visibility** (`show`, `hide`, `toggle`, `fadeIn`, `fadeOut`, `fadeToggle`)
- **Draggable Elements** (`.draggable`, `.draggable-header`)

## Installation

Simply include the rilla.min.js file in your project:

```html
<script src="path/to/rilla.min.js"></script>
```

## Usage

### Element Selection

```javascript
// Select by CSS selector (returns single element or NodeList)
const element = $('#container');

// Select within an element
const childElement = element.$('.child');

// Get element by ID
const elementById = $id('container');
```

### DOM Manipulation

```javascript
// Append HTML to an element (returns the element for chaining)
element.$append('<div class="new-item">Content</div>');

// Prepend HTML
element.$prepend('<header>New Header</header>');

// Replace all content
element.$paint('<div>New Content</div>');

// Get or set HTML content
element.html();         // Get HTML content
element.html('<p>New content</p>');  // Set HTML content

// Get or set text content
element.text();         // Get text content
element.text('New text');  // Set text content

// Get or set input value
element.val();          // Get value
element.val('New value');  // Set value
```

### Attributes and Classes

```javascript
// Get or set attributes
element.$attr('data-id');  // Get attribute
element.$attr('data-id', 'new-value');  // Set attribute

// Add classes
element.addClass('active highlighted');

// Remove classes
element.removeClass('highlighted');

// Toggle classes
element.toggleClass('active');
```

### Event Handling

```javascript
// Click event with callback function
element.$click(function(event) {
    console.log('Clicked!', this);  // 'this' refers to the element
});

// Prevent default behavior
element.$submit(function(event) {
    // Do something
}).prevent();

// Stop propagation
element.$click(function(event) {
    // Do something
}).stop();

// Chain prevent and stop
element.$click(function(event) {
    // Do something
}).prevent().stop();

// Remove event listener
element.$removeClick(callbackFunction);
```

### Document and Window Events

```javascript
// DOM ready event
$dom(function() {
    console.log('DOM fully loaded');
});

// Window load event
$window(function() {
    console.log('Window loaded');
});

// Window events
window.$resize(function(event) {
    console.log('Window resized');
});
```

### Show/Hide and Fade Effects

```javascript
// Show element (accepts element or ID)
show('elementId');  // Default display is 'block'
show('elementId', 'flex');  // Custom display value

// Hide element
hide('elementId');

// Toggle visibility
toggle('elementId');

// Fade effects
fadeIn('elementId');
fadeOut('elementId');
fadeToggle('elementId');
```

### Storage Utilities

```javascript
// Local storage
$local('key', 'value');  // Set value
const value = $local('key');  // Get value
$local('key', null);  // Remove value

// Session storage
$session('key', 'value');  // Set value
const sessionValue = $session('key');  // Get value
$session('key', null);  // Remove value
```

### Draggable Elements

Add the `draggable` class to any element you want to make draggable:

```html
<div class="draggable">
    <!-- Add a header element with the class "draggable-header" -->
    <div class="draggable-header">Drag me</div>
    <!-- Content -->
</div>
```

## Global Usage in HTML Attributes

To use the library functions inside HTML attributes like `onclick`, make sure to use the global reference:

```html
<button onclick="console.log(window.$('#container'))">Toggle</button>
```

## Browser Support

Rilla.js is designed for modern browsers and uses ES6 features. It works in all major browsers that support ES6.

## License

[MIT License](LICENSE)