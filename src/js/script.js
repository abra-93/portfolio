"use strict";

window.addEventListener("load", function () {
  const links = document.querySelectorAll(".js-menu"),
    block = document.querySelectorAll(".js-content"),
    line = document.querySelectorAll(".js-progress-line"),
    tabs = document.querySelectorAll(".js-tabs"),
    works = document.querySelectorAll(".js-work");

  // Navigation and transition to ro blocks
  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((el) => {
        el.classList.remove("link-active"); // сбрасываем активный стиль у элемента
      });
      this.classList.add("link-active"); // вешаем стили на нажатую ссылку меню
      if (window.innerWidth > 960) {
        let linkHref = this.getAttribute("href").split("").slice(1).join(""); // получаем значение атрибута href ссылок меню

        block.forEach((item) => {
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
  });

  // Progress line animation
  function progressLine() {
    let progress = [90, 90, 60, 30, 40, 40];

    for (let i = 0; i < progress.length; i++) {
      const elem = progress[i];
      line[i].innerHTML = elem + "%";
      line[i].style.width = `${elem}%`;
    }

    line.forEach((item) => {
      item.classList.add("animate__animated", "animate__fadeInLeft");
    });
  }
  setTimeout(progressLine(line), 2000);

  // Tabs works

  document.querySelector(".js-nav").addEventListener("click", function (event) {
    // if (event.target.tagName !== "LI") return false;
    let filterClass = event.target.dataset["f"];

    works.forEach((elem) => {
      elem.classList.remove("hide");
      if (!elem.classList.contains(filterClass) && filterClass !== "all") {
        console.log(filterClass);
        elem.classList.add("hide");
      }
    });
  });

  const anchors = document.querySelectorAll('a[href^="#"');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href");

      document.querySelector(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
});
