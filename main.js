(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------- Splash ---------- */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hide = function () { splash.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 450);
    else window.addEventListener("load", function () { setTimeout(hide, 350); });
    setTimeout(hide, 3200);
  }

  /* ---------- Nav ---------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 60) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = $("[data-nav-burger]");
    var mobile = $("[data-nav-mobile]");
    if (burger && mobile) {
      var isOpen = function () { return mobile.getAttribute("data-open") === "true"; };
      var open = function () {
        mobile.setAttribute("data-open", "true");
        mobile.removeAttribute("aria-hidden");
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Cerrar menú");
        var firstLink = mobile.querySelector("a");
        firstLink && firstLink.focus();
      };
      var close = function () {
        mobile.setAttribute("data-open", "false");
        mobile.setAttribute("aria-hidden", "true");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Abrir menú");
        burger.focus();
      };
      burger.addEventListener("click", function () { isOpen() ? close() : open(); });
      $$("a", mobile).forEach(function (a) { a.addEventListener("click", close); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isOpen()) close();
      });
    }
  }

  /* ---------- Smooth anchor scroll (native) ---------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 76;
      var top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length || typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------- Mouse-reactive hero gradient (signature effect) ---------- */
  function initHeroGradient() {
    var hero = $(".hero");
    if (!hero) return;
    var root = document.documentElement;
    var mx = 28, my = 32, tx = 28, ty = 32;
    root.style.setProperty("--mx", mx + "%");
    root.style.setProperty("--my", my + "%");

    if (fineHover) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width) * 100;
        ty = ((e.clientY - r.top) / r.height) * 100;
      });
    }

    function frame() {
      mx += (tx - mx) * 0.045;
      my += (ty - my) * 0.045;
      root.style.setProperty("--mx", mx.toFixed(2) + "%");
      root.style.setProperty("--my", my.toFixed(2) + "%");
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Card halo follows cursor ---------- */
  function initCardHalo() {
    if (!fineHover) return;
    $$(".card, .price-card, .testimonial").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var mx = ((e.clientX - r.left) / r.width) * 100;
        var my = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mx", mx.toFixed(1) + "%");
        card.style.setProperty("--my", my.toFixed(1) + "%");
      });
    });
  }

  /* ---------- Marquee ---------- */
  function initMarquee() {
    $$("[data-marquee]").forEach(function (track) {
      if (track.dataset.marqueeBound) return;
      track.dataset.marqueeBound = "1";
      var clone = track.cloneNode(true);
      clone.removeAttribute("data-marquee");
      clone.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(clone);

      if (!window.gsap) return;
      var distance = track.getBoundingClientRect().width + parseFloat(getComputedStyle(track).marginRight || "0");
      var speed = 46;
      var tween = gsap.to([track, clone], {
        x: -distance,
        duration: distance / speed,
        ease: "none",
        repeat: -1,
        modifiers: { x: gsap.utils.unitize(function (x) { return parseFloat(x) % distance; }) }
      });
      var wrap = track.closest(".marquee");
      if (wrap) {
        wrap.addEventListener("mouseenter", function () { tween.pause(); });
        wrap.addEventListener("mouseleave", function () { tween.play(); });
      }
    });
  }

  /* ---------- Count-up ---------- */
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length) return;
    els.forEach(function (el) {
      var target = parseFloat(el.dataset.countTo);
      var decimals = (el.dataset.countTo.split(".")[1] || "").length;
      var suffix = el.dataset.countSuffix || "";
      var trigger = function () {
        if (window.gsap) {
          var obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.3, ease: "power2.out",
            onUpdate: function () { el.textContent = obj.v.toFixed(decimals) + suffix; }
          });
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };
      if (typeof IntersectionObserver === "undefined") { trigger(); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { trigger(); io.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------- Games carousels (one or more per page) ---------- */
  function initGamesCarousel() {
    $$(".games-carousel").forEach(function (wrap) {
      var track = wrap.querySelector("[data-carousel-track]");
      var prev = wrap.querySelector("[data-carousel-prev]");
      var next = wrap.querySelector("[data-carousel-next]");
      if (!track || !prev || !next || track.dataset.carouselBound) return;
      track.dataset.carouselBound = "1";

      var step = function () {
        var card = track.querySelector(".game-card") || track.firstElementChild;
        if (!card) return track.clientWidth * 0.8;
        var style = getComputedStyle(track);
        var gap = parseFloat(style.columnGap || style.gap || "16");
        return card.getBoundingClientRect().width + gap;
      };

      var updateButtons = function () {
        var max = track.scrollWidth - track.clientWidth - 2;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= max;
      };

      prev.addEventListener("click", function () {
        track.scrollBy({ left: -step() * 2, behavior: reduced ? "auto" : "smooth" });
      });
      next.addEventListener("click", function () {
        track.scrollBy({ left: step() * 2, behavior: reduced ? "auto" : "smooth" });
      });
      var scrollRaf = null;
      track.addEventListener("scroll", function () {
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(function () { updateButtons(); scrollRaf = null; });
      }, { passive: true });
      window.addEventListener("resize", updateButtons);
      updateButtons();
    });
  }

  /* ---------- Contact links from manifest ---------- */
  function mountContactLinks() {
    $$("[data-contact]").forEach(function (el) {
      var key = el.getAttribute("data-contact");
      if (!data[key]) return;
      if (el.tagName === "A") {
        if (key === "whatsapp") el.href = data.whatsapp;
        else if (key === "instagram") el.href = data.instagram;
        else if (key === "tiktok") el.href = data.tiktok;
        else if (key === "mapsUrl") el.href = data.mapsUrl;
        else if (key === "phoneHref") el.href = data.phoneHref;
      }
    });
  }

  function boot() {
    safe(mountContactLinks, "mountContactLinks");
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initReveals, "initReveals");
    safe(initHeroGradient, "initHeroGradient");
    safe(initCardHalo, "initCardHalo");
    safe(initCountUp, "initCountUp");
    safe(initGamesCarousel, "initGamesCarousel");

    if (window.gsap) {
      safe(initMarquee, "initMarquee");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
