"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.addEventListener("load", function () {
  var links = document.querySelectorAll(".js-menu"),
      block = document.querySelectorAll(".js-content"),
      line = document.querySelectorAll(".js-progress-line"),
      tabs = document.querySelectorAll(".js-tabs"),
      works = document.querySelectorAll(".js-work"); // Navigation and transition to ro blocks

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      links.forEach(function (el) {
        el.classList.remove("link-active"); // сбрасываем активный стиль у элемента
      });
      this.classList.add("link-active"); // вешаем стили на нажатую ссылку меню

      if (window.innerWidth > 960) {
        var linkHref = this.getAttribute("href").split("").slice(1).join(""); // получаем значение атрибута href ссылок меню

        block.forEach(function (item) {
          item.classList.add("animate__animated", "animate__fadeOutLeft"); // добавляем класссы animate.css

          if (item.getAttribute("id") === linkHref) {
            item.classList.remove("animate__fadeOutLeft");
            item.classList.add("block-active", "animate__fadeInLeft");
          } else {
            item.classList.remove("block-active", "animate__fadeInLeft");
          }
        });
      }
    });
  }); // Progress line animation

  function progressLine() {
    var progress = [90, 90, 60, 30, 40, 40];

    for (var i = 0; i < progress.length; i++) {
      var elem = progress[i];
      line[i].innerHTML = elem + "%";
      line[i].style.width = "".concat(elem, "%");
    }

    line.forEach(function (item) {
      item.classList.add("animate__animated", "animate__fadeInLeft");
    });
  }

  setTimeout(progressLine(line), 2000); // Tabs works

  document.querySelector(".js-nav").addEventListener("click", function (event) {
    // if (event.target.tagName !== "LI") return false;
    var filterClass = event.target.dataset["f"];
    works.forEach(function (elem) {
      elem.classList.remove("hide");

      if (!elem.classList.contains(filterClass) && filterClass !== "all") {
        console.log(filterClass);
        elem.classList.add("hide");
      }
    });
  });
  var anchors = document.querySelectorAll('a[href^="#"');

  var _iterator = _createForOfIteratorHelper(anchors),
      _step;

  try {
    var _loop = function _loop() {
      var anchor = _step.value;
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        var blockID = anchor.getAttribute("href");
        document.querySelector(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});