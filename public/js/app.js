$dom(() => {
  renderLandingCodeBlocks();
});

function renderLandingCodeBlocks() {
  fetch('./public/docs/code-snippets/landing/@landing.json')
    .then(response => response.json())
    .then(data => {
      const examples = data.examples;
      return Promise.all(
        examples.map(example => {
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
              $error(`Error fetching ${url}:`, err);
              return { example, modifiedContent: null, lang: null };
            });
        })
      ).then(results => {
        results.forEach(({ example, modifiedContent, lang }) => {
          if (!modifiedContent || lang === null) return;
          const codeblock = $(`.code-block[data-src=${example}]`);
          if (!codeblock) {
            $warn(`renderLandingCodeBlocks: data-src="${example}" element not found`);
            return;
          }
          codeblock
            .$append(`<pre></pre>`)
            .$("pre")
            .$append(`<code class="language-${lang}"></code>`)
            .$("code")
            .$text(modifiedContent)
            .$this((el) => { hljs.highlightElement(el) })
            .$parent()
            .$wrap("<div class='relative'></div>")
            .$parent()
            .$prepend("<span class='code-type'></span>")
            .$(".code-type")
            .$text(lang.trim())
            .$parent()
            .$prepend("<button class='copy-btn'></button>")
            .$(".copy-btn")
            .$text("Copy")
            .$this(btn =>
              btn.$on('click', () => {
                navigator.clipboard.writeText(modifiedContent);
                btn.$text("Copied");
                setTimeout(() => btn.$text("Copy"), 1500);
              })
            );
        });
      });
    })
    .catch(err => {
      $error("Error loading .json:", err);
    });
}