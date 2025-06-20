const sidebarListData = [
  {
    title: "Getting Started",
    href: "#getting-started",
    items: [
      { title: "Download", href: "#download" },
      { title: "CDN", href: "#cdn" },
      { title: "Installation", href: "#installation" }
    ]
  },
  {
    title: "DOM Selection",
    href: "#dom-selection",
    items: [
      { title: "$(element)", href: "#selector" },
      { title: "getElement", href: "#getElement" }
    ]
  },
  {
    title: "DOM Traversal",
    href: "#dom-traversal",
    items: [
      { title: "this", href: "#this" },
      { title: "parent", href: "#parent" },
      { title: "children", href: "#children" },
      { title: "siblings", href: "#siblings" }
    ]
  },
  {
    title: "DOM Manipulation",
    href: "#dom-manipulation",
    items: [
      { title: "wrap", href: "#wrap" },
      { title: "unwrap", href: "#unwrap" },
      { title: "render", href: "#render" },
      { title: "prepend", href: "#prepend" },
      { title: "append", href: "#append" },
      { title: "before", href: "#before" },
      { title: "after", href: "#after" },
      { title: "text", href: "#text" },
      { title: "value", href: "#value" },
      { title: "inner", href: "#inner" },
      { title: "outer", href: "#outer" }
    ]
  },
  {
    title: "Event Handling",
    href: "#event-handling",
    items: [
      { title: "on", href: "#on" },
      { title: "off", href: "#off" },
      { title: "prevent", href: "#prevent" },
      { title: "stop", href: "#stop" },
      { title: "dom", href: "#dom" },
      { title: "window", href: "#window" }
    ]
  },
  {
    title: "Attribute Utilities",
    href: "#attribute-utilities",
    items: [
      { title: "attr", href: "#attr" },
      { title: "data", href: "#data" },
      { title: "css", href: "#css" },
      { title: "class", href: "#class" },
      { title: "hasClass", href: "#hasClass" },
      { title: "addClass", href: "#addClass" },
      { title: "removeClass", href: "#removeClass" },
      { title: "toggleClass", href: "#toggleClass" }
    ]
  },
  {
    title: "String Manipulation",
    href: "#string-manipulation",
    items: [
      { title: "toTitleCase", href: "#toTitleCase" },
      { title: "toSentenceCase", href: "#toSentenceCase" },
      { title: "toKebabCase", href: "#toKebabCase" },
      { title: "truncate", href: "#truncate" }
    ]
  },
  {
    title: "Array Manipulation",
    href: "#array-manipulation",
    items: [
      { title: "shuffle", href: "#shuffle" }
    ]
  },
  {
    title: "Element Visibility",
    href: "#element-visibility",
    items: [
      { title: "show", href: "#show" },
      { title: "hide", href: "#hide" },
      { title: "toggle", href: "#toggle" },
      { title: "animateIn", href: "#animateIn" },
      { title: "animateOut", href: "#animateOut" },
      { title: "animateToggle", href: "#animateToggle" },
      { title: "animateSlideScreens", href: "#animateSlideScreens" },
      { title: "animateZoomScreens", href: "#animateZoomScreens" },
    ]
  },
  {
    title: "Storage Utilities",
    href: "#storage-utilities",
    items: [
      { title: "local", href: "#local" },
      { title: "session", href: "#session" }
    ]
  },
  {
    title: "Element Interaction",
    href: "#element-interaction",
    items: [
      { title: "draggable", href: "#draggable" }
    ]
  },
  {
    title: "URL Utilities",
    href: "#url-utilities",
    items: [
      { title: "url", href: "#url" },
      { title: "param", href: "#param" },
      { title: "hash", href: "#hash" },
      { title: "secureLinks", href: "#secureLinks" }
    ]
  },
  {
    title: "Page Utilities",
    href: "#page-utilities",
    items: [
      { title: "title", href: "#title" }
    ]
  },
  {
    title: "More Information",
    href: "#more-information",
    items: [
      { title: "Github", href: "#github" },
      { title: "License", href: "#license" }
    ]
  }
];

function renderSidebar() {
  const template = sidebarListData.map((section, index) => {
    const listItems = section.items.map(item => `
      <li><a href="${item.href}">${item.title}</a></li>
    `).join("");
    return `
      <li${index > 0 ? " class='pt-2'" : ""}>
        <span>
          <a href="${section.href}">${section.title}</a>
        </span>
        <ul class="space-y-2 text-sm mt-2 pl-4">
          ${listItems}
        </ul>
      </li>
    `;
  }).join("");
  $("#sidebar-list-placeholder").$append(template);
}

$dom(() => {
  renderSidebar();
})