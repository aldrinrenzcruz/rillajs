$dom(() => {
  renderCodeBlocks();
  $("main").secureLinks();
  $("footer").secureLinks();
});

function renderCodeBlocks() {
  let dir = "./docs/code-snippets";
  fetch(`${dir}/@snippets.json`)
    .then(response => response.json())
    .then(data => {
      return Promise.all(
        data.map(snippet => {
          const url = `${dir}/${snippet}.txt`;
          return fetch(url)
            .then(response => {
              if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
              return response.text();
            })
            .then(data => {
              const lines = data.split("\n");
              const lang = lines[0].replace(/^#\s*/, "");
              const content = lines.slice(2).join("\n");
              return { snippet, content, lang };
            })
            .catch(err => {
              console.error(`Error fetching ${url}:`, err);
              return { snippet, content: null, lang: null };
            });
        })
      );
    })
    .then(results => {
      $(".code-block").forEach((el) => {
        const dataSnippet = el.$attr("data-src");
        const snippetData = results.find(result => result.snippet === dataSnippet);
        if (!snippetData || !snippetData.content || snippetData.lang === null) {
          console.warn(`renderCodeBlocks: No valid data found for data-src="${dataSnippet}"`);
          return;
        }
        el.$append(`
          <div class="relative">
            <button class="copy-btn">Copy</button>
            <span class="code-type">${snippetData.lang.trim()}</span>
            <pre><code class="language-${snippetData.lang} hljs"></code></pre>
          </div>
        `)
        el.$("code").$text(snippetData.content).$this(el => { hljs.highlightElement(el) })
        el.$(".copy-btn").$on("click", function () {
          navigator.clipboard.writeText(snippetData.content);
          this.$text("Copied");
          setTimeout(() => this.$text("Copy"), 1500);
        });
      });
    })
    .catch(err => {
      console.error("Error loading .json:", err);
    });
}

$("#sidebar-menu-btn").$on("click", () => {
  animateToggle("#sidebar", "slide-in-right", "slide-out-left");
})

function animateIn(element, animation, callback) {
  const el = $getElement(element);
  el.classList.remove("hidden");
  el.classList.add(animation);
  setTimeout(() => {
    el.classList.remove(animation);
    (typeof callback === "function") && callback(true);
  }, 200);
}

function animateOut(element, animation, callback) {
  const el = $getElement(element);
  el.classList.add(animation);
  setTimeout(() => {
    el.classList.add("hidden");
    el.classList.remove(animation);
    (typeof callback === "function") && callback(true);
  }, 200);
}

function animateToggle(element, inAnimation, outAnimation, callback) {
  const el = $getElement(element);
  const isVisible = !el.classList.contains("hidden");
  if (isVisible) {
    animateOut(el, outAnimation, callback);
  } else {
    animateIn(el, inAnimation, callback);
  }
}