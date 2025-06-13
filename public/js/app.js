$dom(() => {
  renderCodeBlocks();
  secureAnchorTags();
});

function renderCodeBlocks() {
  fetch('./public/docs/code-snippets/@snippets.json')
    .then(response => response.json())
    .then(data => {
      const examples = data.examples;
      return Promise.all(
        examples.map(example => {
          const url = `./public/docs/code-snippets/${example}.txt`;
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
              return { example, modifiedContent: null, lang: null };
            });
        })
      ).then(results => {
        results.forEach(({ example, modifiedContent, lang }) => {
          if (!modifiedContent || lang === null) return;
          const codeblock = $(`.code-block[data-src=${example}]`);
          if (!codeblock) {
            console.warn(`renderCodeBlocks: data-src="${example}" element not found`);
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
      console.error("Error loading .json:", err);
    });
}

function secureAnchorTags(noopener = true, noreferrer = true) {
  $("main a").$this(link => {
    link.$attr("target") === null && link.$attr("target", "_blank");
    const relExists = link.$attr("rel");
    let rel = relExists ? relExists.split(" ").filter(i => i.trim() !== "") : [];
    noopener && !rel.includes("noopener") && rel.push("noopener");
    noreferrer && !rel.includes("noreferrer") && rel.push("noreferrer");
    rel.length > 0 && link.$attr("rel", rel.join(" "));
  });
}

// Usage examples:
// secureAnchorTags(); // Default: target="_blank" rel="noopener noreferrer"
// secureAnchorTags(true, false); // target="_blank" rel="noopener"
// secureAnchorTags(false, true); // target="_blank" rel="noreferrer"
// secureAnchorTags(false, false); // target="_blank"