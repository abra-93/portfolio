const ready = "dist";
const source = "src";

const fs = require("fs");

let path = {
  build: {
    html: ready + "/",
    css: ready + "/css/",
    js: ready + "/js/",
    img: ready + "/img/",
    fonts: ready + "/fonts/",
  },
  src: {
    html: [source + "/*.html", "!" + source + "/_*.html"],
    css: source + "/scss/style.scss",
    js: source + "/js/script.js",
    img: source + "/img/**/*.{jpg,png,svg}",
    fonts: source + "/fonts/*.ttf",
  },
  watch: {
    html: source + "/**/*.html",
    css: source + "/scss/**/*.scss",
    js: source + "/js/**/*.js",
    img: source + "/img/**/*.{jpg,png,svg}",
  },
  clean: "./" + ready + "/",
};

const { src, dest } = require("gulp");
const gulp = require("gulp");
const include = require("gulp-file-include");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const brsync = require("browser-sync").create();
const del = require("del");
const imagemin = require("gulp-imagemin");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

function browserSync() {
  brsync.init({
    server: {
      baseDir: "./" + ready + "/",
    },
    port: 3000,
    notify: false,
  });
}
// html task
function html() {
  return src(path.src.html)
    .pipe(include())
    .pipe(dest(path.build.html))
    .pipe(brsync.stream());
}
// style task
function css() {
  return src(path.src.css)
    .pipe(scss({ outputStyle: "exspanded" }))
    .pipe(gcmq())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(brsync.stream());
}
// script task
function js() {
  return src(path.src.js)
    .pipe(include())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(brsync.stream());
}
// image task
function images() {
  return src(path.src.img)
    .pipe(imagemin())
    .pipe(dest(path.build.img))
    .pipe(brsync.stream());
}

function fonts() {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.fonts = fonts;
exports.images = images;
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;
