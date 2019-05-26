"use strict";

const gulp = require("gulp");
const gulpTs = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const path = require("path");
const nodemon = require("gulp-nodemon");

const project = gulpTs.createProject("tsconfig.json");

gulp.task("build", () => {
  del.sync(["./bin/**/*.*"]);
  gulp.src("./src/**/*.js").pipe(gulp.dest("bin/"));
  gulp.src("./src/**/*.json").pipe(gulp.dest("bin/"));
  gulp.src("./src/**/*.png").pipe(gulp.dest("bin/"));
  gulp.src("./src/**/*.ttf").pipe(gulp.dest("bin/"));
  const tsCompile = gulp
    .src("./src/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(project());

  return tsCompile.js
    .pipe(
      sourcemaps.write({
        sourceRoot: file =>
          path.relative(path.join(file.cwd, file.path), file.base)
      })
    )
    .pipe(gulp.dest("bin/"));
});

gulp.task(
  "watch",
  gulp.series("build", function() {
    gulp.watch("./src/**/*.ts", ["build"]);
  })
);

gulp.task(
  "start",
  gulp.series("build", function() {
    return nodemon({
      script: "./bin/index.js",
      watch: "./bin/index.js"
    });
  })
);

gulp.task(
  "serve",
  gulp.series("watch", function() {
    return nodemon({
      script: "./bin/index.js",
      watch: "./bin/"
    });
  })
);
