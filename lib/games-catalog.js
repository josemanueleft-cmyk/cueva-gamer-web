/* =============================================================
   Catálogo de juegos interactivo — Cueva Gamer
   Búsqueda, filtros combinados, tarjetas dinámicas y modal.
   Los juegos viven en lib/games-data.js (window.GAMES_DATA).
   ============================================================= */
(function () {
  "use strict";

  var ICONS = {
    platform: {
      ps5: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="11" rx="5"/><path d="M8 12v3M6.5 13.5h3"/><circle cx="16" cy="12.5" r="1"/><circle cx="18.5" cy="15" r="1"/><path d="M11 8V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/></svg>',
      xbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M7 7l5 6 5-6M8 17c1.2-2 2.4-3.2 4-3.2s2.8 1.2 4 3.2"/></svg>',
      switch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="4"/><circle cx="12" cy="6" r="1"/><path d="M9 18h.01M12 18h.01M15 18h.01"/></svg>',
      pc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
      vr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2.5a2 2 0 0 1-1.6-.8L12 14l-.9 1.2a2 2 0 0 1-1.6.8H7a3 3 0 0 1-3-3V9Z"/><circle cx="8.5" cy="11" r="1"/><circle cx="15.5" cy="11" r="1"/></svg>'
    },
    genre: {
      accion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
      aventura: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6.5v5c0 5 3.4 8.3 8 9.5 4.6-1.2 8-4.5 8-9.5v-5L12 3Z"/><path d="M9 12l2 2 4-4.5"/></svg>',
      deportes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18M3 12h18M4.5 7.5c2.2 1.3 12.8 1.3 15 0M4.5 16.5c2.2-1.3 12.8-1.3 15 0"/></svg>',
      carreras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v18"/><path d="M4 4h6l1 1.5H20L17 9l3 3.5H11L10 11H4Z"/></svg>',
      peleas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 19 5"/><path d="M19 19 5 5"/><path d="M4 20l2-2M20 20l-2-2"/></svg>',
      shooter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><path d="M12 6v2.5M12 15.5V18M6 12h2.5M15.5 12H18"/></svg>',
      estrategia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z"/><path d="M12 2v20M3 7l9 5 9-5M3 17l9-5 9 5"/></svg>',
      otros: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>'
    },
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15.3 20a5 5 0 0 1 5.4-5.1"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    externalLink: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>'
  };

  var PLATFORM_META = {
    ps5: { label: "PlayStation", short: "PS5" },
    xbox: { label: "Xbox", short: "Xbox Series X" },
    switch: { label: "Nintendo Switch", short: "Nintendo Switch" },
    pc: { label: "PC", short: "PC" },
    vr: { label: "Realidad Virtual", short: "VR" }
  };

  var GENRE_META = {
    accion: "Acción",
    aventura: "Aventura",
    deportes: "Deportes",
    carreras: "Carreras",
    peleas: "Peleas",
    shooter: "Shooter",
    estrategia: "Estrategia",
    otros: "Otros"
  };

  var COVERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  function coverFor(id) { return COVERS[(id - 1) % COVERS.length]; }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function whatsappUrl(game) {
    var brand = window.__BRAND__ || {};
    var digits = String(brand.phoneHref || "").replace(/[^\d]/g, "");
    var text = "Hola, quiero consultar la disponibilidad de " + game.name + " en La Cueva Gamer.";
    return digits ? "https://wa.me/" + digits + "?text=" + encodeURIComponent(text) : "#";
  }

  function posterInner(game) {
    if (game.image) {
      return '<img class="game-poster-img" src="' + esc(game.image) + '" alt="" loading="lazy" />' +
        '<h3 class="game-poster-title">' + esc(game.name) + "</h3>";
    }
    return '<span class="game-poster-icon" aria-hidden="true">' + (ICONS.genre[game.genre] || "") + "</span>" +
      '<h3 class="game-poster-title">' + esc(game.name) + "</h3>";
  }

  function cardHTML(game) {
    var platformLabels = game.platforms.map(function (p) { return (PLATFORM_META[p] || {}).short || p; }).join(" · ");
    var platformIcon = ICONS.platform[game.platforms[0]] || "";
    return (
      '<article class="game-card">' +
        '<div class="game-cover game-cover--' + coverFor(game.id) + (game.image ? " game-cover--photo" : "") + '">' +
          posterInner(game) +
        "</div>" +
        '<div class="game-card-body">' +
          '<div class="game-meta-row">' + platformIcon + "<span>" + esc(platformLabels) + "</span></div>" +
          '<div class="game-meta-row">' + (ICONS.genre[game.genre] || "") + "<span>" + esc(GENRE_META[game.genre] || game.genre) + "</span></div>" +
          '<div class="game-meta-row">' + ICONS.users + "<span>" + esc(game.players) + "</span></div>" +
          '<div class="game-availability' + (game.available ? "" : " is-off") + '"><span class="dot"></span>' + (game.available ? "Disponible" : "No disponible") + "</div>" +
          '<button type="button" class="btn btn-ghost btn-sm game-card-cta" data-open-game="' + game.id + '">Ver juego</button>' +
        "</div>" +
      "</article>"
    );
  }

  function init() {
    var section = document.querySelector("[data-games-app]");
    if (!section || !window.GAMES_DATA) return;

    var grid = section.querySelector("[data-games-grid]");
    var empty = section.querySelector("[data-games-empty]");
    var countEl = section.querySelector("[data-games-count]");
    var searchInput = section.querySelector("[data-games-search]");
    var platformFilters = section.querySelector('[data-games-filters="platform"]');
    var genreFilters = section.querySelector('[data-games-filters="genre"]');
    var quickList = section.querySelector("[data-games-quick]");
    var modal = document.querySelector("[data-game-modal]");
    if (!grid || !modal) return;

    var state = { search: "", platform: "todos", genre: "todos" };
    var lastFocused = null;

    function matches(game) {
      var q = state.search.trim().toLowerCase();
      var searchOk = !q || game.name.toLowerCase().indexOf(q) !== -1;
      var platformOk = state.platform === "todos" || game.platforms.indexOf(state.platform) !== -1;
      var genreOk = state.genre === "todos" || game.genre === state.genre;
      return searchOk && platformOk && genreOk;
    }

    function setActivePill(group, value, attr) {
      if (!group) return;
      var pills = group.querySelectorAll("[" + attr + "]");
      for (var i = 0; i < pills.length; i++) {
        var isActive = pills[i].getAttribute(attr) === value;
        pills[i].classList.toggle("is-active", isActive);
        pills[i].setAttribute("aria-pressed", isActive ? "true" : "false");
      }
    }

    function render() {
      var list = window.GAMES_DATA.filter(matches);

      if (!list.length) {
        grid.innerHTML = "";
        grid.hidden = true;
        empty.hidden = false;
      } else {
        empty.hidden = true;
        grid.hidden = false;
        grid.innerHTML = list.map(cardHTML).join("");
        var cards = grid.querySelectorAll(".game-card");
        cards.forEach(function (card, i) {
          card.style.transitionDelay = Math.min(i * 40, 320) + "ms";
        });
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            cards.forEach(function (card) { card.classList.add("is-in"); });
          });
        });
      }

      if (countEl) {
        countEl.textContent = list.length + (list.length === 1 ? " juego disponible" : " juegos disponibles");
      }
    }

    function openModal(id) {
      var game = null;
      for (var i = 0; i < window.GAMES_DATA.length; i++) {
        if (window.GAMES_DATA[i].id === id) { game = window.GAMES_DATA[i]; break; }
      }
      if (!game) return;

      var poster = modal.querySelector("[data-modal-poster]");
      poster.className = "game-modal-poster game-cover game-cover--" + coverFor(game.id) + (game.image ? " game-cover--photo" : "");
      poster.innerHTML = posterInner(game);

      modal.querySelector("[data-modal-genre]").textContent = GENRE_META[game.genre] || game.genre;
      modal.querySelector("[data-modal-name]").textContent = game.name;
      modal.querySelector("[data-modal-description]").textContent = game.description || "";

      var platformLabels = game.platforms.map(function (p) { return (PLATFORM_META[p] || {}).label || p; }).join(" · ");
      var platformIcon = ICONS.platform[game.platforms[0]] || "";
      modal.querySelector("[data-modal-platform]").innerHTML = platformIcon + "<span>" + esc(platformLabels) + "</span>";
      modal.querySelector("[data-modal-players]").innerHTML = ICONS.users + "<span>" + esc(game.players) + "</span>";

      var availEl = modal.querySelector("[data-modal-availability]");
      availEl.className = "game-availability" + (game.available ? "" : " is-off");
      availEl.innerHTML = '<span class="dot"></span>' + (game.available ? "Disponible" : "No disponible");

      var waLink = modal.querySelector("[data-modal-whatsapp]");
      waLink.href = whatsappUrl(game);
      var urlLink = modal.querySelector("[data-modal-url]");
      if (game.url) { urlLink.href = game.url; urlLink.hidden = false; }
      else { urlLink.hidden = true; }

      lastFocused = document.activeElement;
      modal.hidden = false;
      document.documentElement.classList.add("modal-open");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { modal.classList.add("is-open"); });
      });
      var closeBtn = modal.querySelector("[data-modal-close-btn]");
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      if (modal.hidden) return;
      modal.classList.remove("is-open");
      document.documentElement.classList.remove("modal-open");
      window.setTimeout(function () { modal.hidden = true; }, 350);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    grid.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-open-game]");
      if (!btn) return;
      openModal(parseInt(btn.getAttribute("data-open-game"), 10));
    });

    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-modal-close]")) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.search = searchInput.value;
        render();
      });
    }

    if (platformFilters) {
      platformFilters.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter-platform]");
        if (!btn) return;
        state.platform = btn.getAttribute("data-filter-platform");
        setActivePill(platformFilters, state.platform, "data-filter-platform");
        render();
      });
    }

    if (genreFilters) {
      genreFilters.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter-genre]");
        if (!btn) return;
        state.genre = btn.getAttribute("data-filter-genre");
        setActivePill(genreFilters, state.genre, "data-filter-genre");
        render();
      });
    }

    if (quickList) {
      quickList.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-quick-platform]");
        if (!btn) return;
        state.platform = btn.getAttribute("data-quick-platform");
        setActivePill(platformFilters, state.platform, "data-filter-platform");
        render();
        section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      });
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
