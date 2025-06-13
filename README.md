# Rilla.js

**Writing JS Made Easy**

Rilla.js is a lightweight JavaScript utility library designed to simplify development and improve the developer experience.

> ⚠️ **Warning**: This early build (v0.1) is still in development and may undergo significant changes without prior notice, potentially breaking your code. Use it for testing purposes only.

## 🚀 Getting Started

### Download

Get the latest version of Rilla.js from the [GitHub repository](https://github.com/aldrinrenzcruz/rillajs):

- **Minified**: `dist/rilla.min.js`
- **Unminified**: `dist/rilla.js`

### CDN

Alternatively, you can start using it via CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/aldrinrenzcruz/rillajs/dist/rilla.min.js"></script>
```

### Installation

Simply add the rilla.min.js script tag in the `<head>` section of your HTML file:

```html
<script src="path/to/rilla.min.js"></script>
```

## 📖 Documentation

### DOM Selection

#### `$(element)`

Select DOM elements using id, className, tagName, etc:

```javascript
let container = $('#container');
let containers = $('.containers');
let containers = $('div');
```

As a method to select child elements:

```javascript
container.$('.test-btn');
$('#container .test-btn');
$('.masterlist li');
```

Chain with vanilla JS or Rilla methods:

```javascript
$('button').addEventListener(...)
$('container').$append()
```

### DOM Traversal

#### `$this`
Execute a callback function while maintaining method chaining:

```javascript
$('.button')
  .$addClass('loading')
  .$this(el => console.log('Button state:', el.$class()))
  .$text('Loading...');
```

#### `$parent`
Find a parent element at the specified level:

```javascript
element.$parent(); // defaults to level 1
const grandparent = element.$parent(2);
```

#### `$children`
Find all child elements at the specified level:

```javascript
element.$children(); // defaults to level 1
const grandchildren = element.$children(2);
```

#### `$siblings`
Get all sibling elements:

```javascript
element.$siblings();
```

### DOM Manipulation

#### `$wrap`
Wrap an element with a new element:

```javascript
element.$wrap("<div class='container box'></div>");

$("#note").$wrap("<div class='note-wrapper'></div>");
// Result:
// <div class="note-wrapper">
//   <p id="note">This is a note.</p>
// </div>
```

#### `$unwrap`
Unwrap an element from its parent:

```javascript
element.$unwrap();

$("#text").$unwrap();
// Removes parent wrapper if only child, or moves element out of parent
```

#### `$render`
Render HTML content into the element, replacing any existing content:

```javascript
let template = `
  <div>
    <h1>${section.title}</h1>
    <ul>
      ${section.items.map(item => `
        <li class="task-item ${item.done ? "completed" : "pending"}">
          <input type="checkbox" ${item.done ? "checked" : ""}>
          <span>${item.text}</span>
        </li>
      `).join("")}
    </ul>
  </div>
`;

$("#container").$render(template);
```

#### `$prepend`, `$append`, `$before`, `$after`
Insert elements at different positions:

```javascript
element.$prepend("<label>Username:</label>");
element.$append("<p>New Content</p>");
element.$before("<label for='name'>Name:</label>");
element.$after("<input type='text' id='name' />");
```

#### Content Methods
Get or set element content:

```javascript
// Text content
element.$text(); // get
element.$text("hello world"); // set

// Values
element.$value(); // get
element.$value("hello world"); // set

// HTML content
element.$inner(); // get innerHTML
element.$inner("<h1>New Title</h1>"); // set innerHTML
element.$outer(); // get outerHTML
element.$outer("<h1>New Title</h1>"); // set outerHTML
```

### Event Handling

#### `$on`, `$off`
Add and remove event listeners:

```javascript
$("#myButton").$on("click", function(e) {
  console.log("Button clicked!");
});

// Chain multiple events
$(".my-element")
  .$on("mouseenter", function() { this.style.opacity = "0.8"; })
  .$on("mouseleave", function() { this.style.opacity = "1"; })
  .$on("click", function() { alert("Element clicked!"); });

// Remove listeners
$('#myButton').$off(); // all listeners
$('#my-element').$off('click'); // specific event
```

#### `$prevent`, `$stop`
Add preventDefault() and stopPropagation():

```javascript
$('#myForm')
  .$on('submit', function(e) {
    console.log('Form submitted');
  })
  .$prevent();

$('#my-button')
  .$on('click', function(e) {
    console.log('Child button clicked');
  })
  .$stop();
```

#### `$dom`, `$window`
Execute code when DOM or page is ready:

```javascript
$dom(() => {
  console.log('DOM is ready!');
});

$window(() => {
  console.log('Page fully loaded!');
});
```

### Attributes & Data

#### `$attr`
Get or set attributes:

```javascript
btn.$attr("id"); // get
container.$attr("class", "btn-primary"); // set
```

#### `$data`
Work with data attributes:

```javascript
// Get all data attributes
$("#myElement").$data(); // { user: "john", age: "25" }

// Get specific data attribute
$("#myElement").$data("age"); // "25"

// Set data attribute
$("#myElement").$data("age", "30");

// Delete data attribute
$("#myElement").$data("age", "");
```

### CSS & Classes

#### `$css`
Get or set CSS properties:

```javascript
// Get computed style
$("#heading").$css('font-size'); // "16px"

// Set single property
$("#heading").$css('font-size', '20px');

// Set multiple properties
element.$css({
  width: '400px',
  height: '300px',
  backgroundColor: 'lightblue'
});

// Use function callbacks
element.$css('width', (el, currentWidth) => {
  return (parseInt(currentWidth) + 50) + 'px';
});
```

#### Class Methods

```javascript
// Get all classes
element.$class(); // ['mb-2', 'pb-3', 'font-bold']

// Set/clear classes
element.$class("new-class another-class"); // set
element.$class(""); // clear

// Class utilities
element.$hasClass("active"); // boolean
element.$addClass("active");
element.$removeClass("active");
element.$toggleClass("active");
```

### String Manipulation

#### `$toTitleCase`
Convert to title case:

```javascript
$toTitleCase("a tale of two cities");
// "A Tale of Two Cities"

"hello world".$toTitleCase();
// "Hello World"
```

#### `$toSentenceCase`
Convert to sentence case:

```javascript
$toSentenceCase("HELLO WORLD");
// "Hello world"
```

#### `$toKebabCase`
Convert to kebab-case:

```javascript
$toKebabCase("Hello World");
// "hello-world"

"JavaScript Framework".$toKebabCase();
// "javascript-framework"
```

### Element Visibility

#### `$show`, `$hide`, `$toggle`
Control element visibility:

```javascript
// Show elements
$show('#myModal'); // display: block
$show('#sidebar', 'flex'); // display: flex
$show('.myDiv', 'block', 300); // fade in over 300ms

// Hide elements
$hide('#myModal');
$hide('.myModal', 300); // fade out over 300ms

// Toggle visibility
$toggle('#myModal');
$toggle('.navbar', 'flex'); // toggle with flex display
```

### Storage Utilities

#### `$local`, `$session`
Work with localStorage and sessionStorage:

```javascript
// localStorage
$local('theme'); // get
$local('theme', 'dark'); // set
$local('theme', null); // delete

// sessionStorage
$session('cartItems'); // get
$session('isLoggedIn', true); // set
$session('cartItems', null); // delete
```

### Element Interaction

#### `$draggable`
Make elements draggable by adding CSS classes:

```css
.draggable {
  position: absolute;
  overflow: hidden;
  z-index: 1;
}

.drag-handle {
  z-index: 1;
  cursor: grab;
}
```

```html
<div class="draggable">
  <span class="drag-handle">Drag me</span>
  <!-- Content -->
</div>
```

## 🌐 Browser Support

Rilla.js is designed for modern environments and leverages ES6 features. It works reliably in all major browsers that support ES6.

## 🤝 Contributing

Explore the source code, report issues, or contribute on [GitHub](https://github.com/aldrinrenzcruz/rillajs).

## 📄 License

Rilla.js is open source and distributed under the [MIT License](LICENSE).

---

Made with ❤️ by [Aldrin Renz Cruz](https://github.com/aldrinrenzcruz)