Element.prototype.secureLinks = function (noopener = true, noreferrer = true) {
  return this.$("a").$this(link => {
    !link.$attr("target") && link.$attr("target", "_blank");
    const rel = (link.$attr("rel") || "").split(" ").filter(Boolean);
    noopener && !rel.includes("noopener") && rel.push("noopener");
    noreferrer && !rel.includes("noreferrer") && rel.push("noreferrer");
    rel.length && link.$attr("rel", rel.join(" "));
  });
};

NodeList.prototype.secureLinks = function (noopener = true, noreferrer = true) {
  return this.forEach(el => el.secureLinks(noopener, noreferrer)) || this;
};