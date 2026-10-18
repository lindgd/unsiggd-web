// Språkvalg: ?lang=nb|en (appen sender det med), ellers sist valgte, ellers
// nettleserens språk. Uten JavaScript vises begge språk.
(function () {
  var KEY = "unsiggd-lang";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* privat modus */ }
  }

  function initial() {
    var param = new URLSearchParams(location.search).get("lang");
    if (param === "nb" || param === "no") return "nb";
    if (param === "en") return "en";
    var saved = stored();
    if (saved === "nb" || saved === "en") return saved;
    var nav = (navigator.language || "").toLowerCase();
    return /^(nb|nn|no)\b/.test(nav) ? "nb" : "en";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    var buttons = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(buttons[i].value === lang));
    }
  }

  apply(initial());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));
    var buttons = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (event) {
        var lang = event.currentTarget.value;
        remember(lang);
        apply(lang);
      });
    }
  });
})();
