var gulp = require('gulp');

//Configuration
var sourceFiles = {
    build: './bin/',
    imgbuild: './bin/img/',
    fontsBuild: './bin/fonts/',
    index: './src/index.html',
    images: './src/img/*',
    fonts: './src/fonts/*',
    hosts: {
        api: 'api'
    },
    port: '8888'
};

//Tools
var usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    del = require('del');


gulp.task('usemin', function () {
    return gulp.src(sourceFiles.index)
        .pipe(usemin({
            css: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest(sourceFiles.build));
});

gulp.task('image', function () {
    return gulp.src(sourceFiles.images)
        .pipe(gulp.dest(sourceFiles.imgbuild));
});

gulp.task('font', function () {
    return gulp.src(sourceFiles.fonts)
        .pipe(gulp.dest(sourceFiles.fontsBuild));
});

function serverModule() {
    return {
        opn: require('opn'),
        connect: require('connect'),
        modRewrite: require('connect-modrewrite'),
        serveStatic: require('serve-static'),
        serveIndex: require('serve-index'),
        http: require('http'),
        history: require('connect-history-api-fallback')
    };
}

gulp.task('connect', function () {
    var server = serverModule();

    var app = server.connect()
        .use(server.history())
        .use(server.serveStatic(sourceFiles.build))
        .use('/bower_components', server.serveStatic('bower_components'))
        .use(server.modRewrite([
            '^/api/(.*)$ ' + sourceFiles.hosts.api + '$1 [PNC]'
        ]))
        .use(server.serveIndex(sourceFiles.build));

    server.http.createServer(app)
        .listen(sourceFiles.port)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:' + sourceFiles.port);
        });

    server.opn('http://localhost:' + sourceFiles.port);
});

gulp.task('watch', function () {

    gulp.watch(
        [
            './src/**/*'
        ],
        ['usemin']
    );

});

gulp.task('clean', function (cb) {
    del(['./bin/*'], cb);
});


gulp.task('default', ['usemin', 'image', 'font', 'watch', 'connect']);