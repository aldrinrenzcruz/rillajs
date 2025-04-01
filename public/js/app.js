$dom(() => {
  renderLandingCodeBlocks();
  initializeSidebarSmoothScroll();
});

function initializeSidebarSmoothScroll() {
  $('a[href^="#"]').forEach(anchor => {
    anchor.on('click', function (e) {
      const targetId = this.$attr('href');
      const targetElement = $(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 12,
        behavior: 'smooth'
      });
    }).prevent();
  });
}

const examples = ["dom-selection", "installation", "dom-manipulation", "element-references", "attributes-classes", "event-handling", "document-window", "visibility", "storage", "draggable", "global-usage"];

function renderLandingCodeBlocks() {
  Promise.all(
    examples.map(async example => {
      const url = `./public/docs/code-snippets/landing/${example}.txt`;
      return fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.text();
        })
        .then(data => {
          const lines = data.split("\n");
          const lang = lines[0].replace(/^#\s*/, "");
          const modifiedContent = lines.slice(2).join("\n");
          return { example, modifiedContent, lang };
        })
        .catch(err => {
          console.error(`Error fetching ${url}:`, err);
          return { example, data: null, lang };
        });
    })
  ).then(results => {
    results.forEach(({ example, modifiedContent, lang }) => {
      $(`.code-block[data-src=${example}]`)
        .$append(`<pre></pre>`)
        .$("pre")
        .$append(`<code class="language-${lang}"></code>`)
        .$("code")
        .text(modifiedContent)
        .$this((el) => { hljs.highlightElement(el) })
        .parent()
        .wrap("<div class='relative'></div>")
        .parent()
        .$append("<button class='absolute top-2 right-2 px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded hover:bg-gray-700 transition hover:cursor-pointer'></button>")
        .$("button")
        .text(lang.trim() || "copy")
        .$this(btn =>
          btn.on('click', () => {
            navigator.clipboard.writeText(modifiedContent);
            btn.text("copied!");
            setTimeout(() => btn.text(lang || "copy"), 1500);
          })
        )
    });
  });
}