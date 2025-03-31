$dom(() => {
  initializeSidebarSmoothScroll();
  addCopyBtnToCodeBlocks();
  hljs.highlightAll();
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