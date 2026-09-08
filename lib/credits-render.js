(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(credits) {
    var list = document.querySelector("[data-credits]");
    if (!list) return;
    var ids = Object.keys(credits);
    if (!ids.length) {
      list.innerHTML = "<li>No hay imágenes externas registradas.</li>";
      return;
    }
    list.innerHTML = ids.map(function (id) {
      var c = credits[id];
      var creator = c.creator_url
        ? '<a href="' + esc(c.creator_url) + '" target="_blank" rel="noopener">' + esc(c.creator || "autor desconocido") + "</a>"
        : esc(c.creator || "autor desconocido");
      var license = c.license_url
        ? '<a href="' + esc(c.license_url) + '" target="_blank" rel="noopener">' + esc((c.license || "").toUpperCase()) + " " + esc(c.license_version || "") + "</a>"
        : esc((c.license || "").toUpperCase());
      var original = c.foreign_landing_url
        ? ' &middot; <a href="' + esc(c.foreign_landing_url) + '" target="_blank" rel="noopener">Ver original &#8599;</a>'
        : "";
      return "<li><strong>" + esc(c.title || id) + "</strong> &middot; " + creator + " &middot; " + license + original + "</li>";
    }).join("");
  }

  fetch("assets/credits.json")
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () {
      var list = document.querySelector("[data-credits]");
      if (list) list.innerHTML = "<li>No se pudieron cargar los créditos.</li>";
    });
})();
