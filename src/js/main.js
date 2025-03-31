$dom(() => {
  hljs.highlightAll();

  // Smooth scrolling for anchor links
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

  // Create copy btn for each code blocks
  $("pre").forEach((pre) => {
    pre
      .wrap("<div class='relative'></div>")
      .parentNode.appendChild($create("button")
        .text("Copy")
        .addClass("absolute top-2 right-2 px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded hover:bg-gray-700 transition hover:cursor-pointer")
        .$this(btn =>
          btn.$click(() => {
            navigator.clipboard.writeText(pre.text());
            btn.text("Copied!");
            setTimeout(() => btn.text("Copy"), 1500);
          })
        )
      )
  });
});