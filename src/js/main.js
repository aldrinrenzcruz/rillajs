$dom(() => {
  fetchCodeBlocksContent();
  initializeSidebarSmoothScroll();
  addCopyBtnToCodeBlocks();
});

function initializeSidebarSmoothScroll() {
  $('a[href^="#"]').forEach(anchor => {
    anchor.$click(function (e) {
      const targetId = this.$attr('href');
      const targetElement = $(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 12,
        behavior: 'smooth'
      });
    }).prevent();
  });
}

function addCopyBtnToCodeBlocks() {
  $("pre").forEach((pre) => {
    const lang = pre.$("code").$attr("class").split("-")[1];
    pre
      .wrap("<div class='relative'></div>")
      .parentNode.appendChild($create("button")
        .text(lang || "copy")
        .addClass("absolute top-2 right-2 px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded hover:bg-gray-700 transition hover:cursor-pointer")
        .$this(btn =>
          btn.$click(() => {
            navigator.clipboard.writeText(pre.text());
            btn.text("copied!");
            setTimeout(() => btn.text(lang || "copy"), 1500);
          })
        )
      )
  })
}
const examples = ["dom-selection", "installation", "dom-manipulation", "element-references", "attributes-classes", "event-handling", "document-window", "visibility", "storage", "draggable", "global-usage"];

function fetchCodeBlocksContent() {
  Promise.all(
    examples.map(async example => {
      const url = `./public/examples/${example}.txt`;
      return fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.text();
        })
        .then(data => ({ example, data }))
        .catch(err => {
          console.error(`Error fetching ${url}:`, err);
          return { example, data: null };
        });
    })
  )
    .then(results => {
      results.forEach(({ example, data }) => {
        if (data) {
          const codeElement = $(`.code-block[data-src=${example}] code`);
          codeElement.text(data);
          hljs.highlightElement(codeElement);
        }
      });
    });
}
