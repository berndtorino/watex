let gulp = require("gulp");
let inliner = require("gulp-inline-base64");
let cleanCSS = require("gulp-clean-css");
let concat = require("gulp-concat");
let insert = require("gulp-insert");
let babel = require("gulp-babel");
let fs = require("fs");

gulp.task("default", () => {
    return gulp.src([KATEX + ""])
})

const KATEX = "./node_modules/katex/"
const TMP = "./tmp/";
const DIST = "./";
const SRC = "./src/";

const cssInject = 'document.body.innerHTML += "<style>{{css}}</style>"';

gulp.task("default", ["css", "js", "combine"])

gulp.task("combine", ["js", "css"], () => {
    return gulp.src([SRC + "header.js", TMP + "katex.js"])
        .pipe(concat("watex.user.js"))
        .pipe(gulp.dest(DIST));
})

gulp.task("js", ["css"], () => {
    let css = fs.readFileSync(TMP + "katex.css");
    css = css.toString().split("\"").join("\\\"");
    css = cssInject.replace("{{css}}", css);
    return gulp.src([KATEX + "dist/katex.js", KATEX + "dist/contrib/auto-render.min.js", SRC+"watex.js"])
        .pipe(concat("katex.js"))
        .pipe(insert.append(css))
        .pipe(babel({ presets: ["babili"] }))
        .pipe(gulp.dest(TMP));
})

gulp.task("css", () => {
    return gulp.src([KATEX + "dist/katex.css"])
        .pipe(inliner({
            baseDir: KATEX + "dist/",
            debug: true
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(TMP));
});