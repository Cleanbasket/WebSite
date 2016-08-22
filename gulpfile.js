var gulp = require('gulp');
var path = require('path');
var del = require('del');
var browserSync = require('browser-sync');

var data = require('gulp-data');
var hb = require('gulp-hb');
var sass = require('gulp-sass');
var changed = require('gulp-changed');

const repositoryName = "WebSite"

var config = {
    dest: "./build",
    html: {
        src: "./src"
    }
}

function clean() {
    return del([ config.dest ]);
}

function renderHtmlFactory(rootPath) {
    var hbStream = hb()
        .partials('./src/partials/**/*.hbs')

    return function renderHtml() {
        return gulp.src([
            path.join(config.html.src, "/**/*.html"),
            // "!**/templates{,/**}",
            "!**/partials{,/**}"
        ])
        // .pipe(changed(config.dest))
        .pipe(data(function (file) {
            return {
                rootPath: rootPath
            };
        }))
        .pipe(hbStream)
        .pipe(gulp.dest(config.dest))
    }
}

function compileSassFactory(isGhPages) {
    return function compileSass () {
        return gulp.src([
            "src/styles/**/*.scss"
        ])
        .pipe(changed(path.join(config.dest, 'css')))
        .pipe(sass({
            includePaths: [
                isGhPages ? "src/styles/ghPages" : "src/styles/dev",
                "public/bower_components/normalize-scss/sass",
                "src/styles/common"
            ]
        }).on('error', sass.logError))
        .pipe(gulp.dest(path.join(config.dest, 'css')))
    }
}

function buildJs() {
    return gulp.src([
        "src/scripts/**/*.js"
    ])
    .pipe(changed(path.join(config.dest, "js")))
    .pipe(gulp.dest(path.join(config.dest, "js")))
}

function copyPublic() {
    var publicGlob = ["public/"];

    publicGlob = publicGlob.map(function (i) {
        if (i[i.length - 1] === path.sep) {
            i = i.slice(0, i.length - 1);
        }
        return i + '/**/*';
    })

    return gulp.src(publicGlob)
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest))
}

function browserSyncTask(done) {
    browserSync({
        // server: {
        //  baseDir: config.build.dest
        // },
        server: [config.dest, "./public"],
        open : false
    }, done)

}

function browserSyncWatch() {
    gulp.watch([
    `${config.dest}/**/*.html`,
    `${config.dest}/**/*.css`,
    `${config.dest}/**/*.js`
    ]).on('change', browserSync.reload);
}

function buildWatch() {
    gulp.watch("src/styles/**/*.scss", function (done) {
        // console.log('hey')
        compileSassFactory()();
        done()
    });
    gulp.watch("src/scripts/**/*.js", function (done) {
        // console.log('hey')
        buildJs();
        done()
    })
    gulp.watch("src/**/*.{html,hbs}", function (done) {
        console.log('renderHtml');
        renderHtmlFactory('')();
        done();
    })  
}

var htmlTask = gulp.series(clean, renderHtmlFactory(''));
// var htmlWatchTask = 
var sassTask = gulp.series(clean, compileSassFactory());
var jsTask = gulp.series(clean, buildJs);
var copyPublicTask = gulp.series(clean, copyPublic);

var buildTask = gulp.series(
    clean, 
    gulp.parallel(
        renderHtmlFactory(''), 
        compileSassFactory(), 
        buildJs, 
        copyPublic
    )
);

var buildGhPagesTask = gulp.series(
    clean,
    gulp.parallel(
        renderHtmlFactory('/' + repositoryName),
        compileSassFactory(true),
        buildJs,
        copyPublic
    )
);

var serveTask = gulp.series(
    clean,
    gulp.parallel(
        renderHtmlFactory(''),
        compileSassFactory(),
        buildJs
    ),
    browserSyncTask,
    gulp.parallel(
        browserSyncWatch,
        buildWatch
    )
);





gulp.task('html', htmlTask);
// gulp.task('html-watch', htmlWatchTask);
gulp.task('sass', sassTask);
// gulp.task('sass-watch', htmlWatchTask);
gulp.task('js', jsTask);
// gulp.task('js-watch', htmlWatchTask);
gulp.task('copy-public', copyPublicTask);
gulp.task('build', buildTask);
gulp.task('build-ghPages', buildGhPagesTask);
gulp.task('serve', serveTask);

