var npmDir = 'node_modules';
var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglifyjs'),
    cssnano       = require('gulp-cssnano'),
    rename        = require('gulp-rename'),
    del           = require('del'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    cache         = require('gulp-cache'),
    autoprefixer  = require('gulp-autoprefixer'),
    uncss         = require('gulp-uncss'),
    htmlmin       = require('gulp-htmlmin'),
    inlineCss     = require('gulp-inline-css');

/**************************Компиляция SASS*************************************/
gulp.task('sass', function() {
    return gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer( ['last 15 versions', 'ie 8', 'ie 7'], { cascad: true }))
        /*.pipe(uncss({
            html: ['index.html', '.**!/!*.html']
        }))*/
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}))
});


/**************************Сжатие JS*******************************************/
gulp.task('scripts', function() {
    return gulp.src([
        npmDir+ '/jquery/dist/jquery.min.js',
        npmDir+ '/slick-carousel/slick/slick.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});


/**************************Сжатие CSS*******************************************/
gulp.task('css-libs', ['sass'], function(){
    return gulp.src(['./css/main.css',
        './css/popup.css'])
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
});


/**************************Browser Sync****************************************/
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: './'
        },
        notify:false
    });
});


gulp.task('clean', function(){
    return del.sync('dist/');
});

gulp.task('cleare', function(){
    return cache.clearAll();
});

/**************************Уменьшение изображений******************************/
gulp.task('img', function(){
    return gulp.src('./assets/images/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

/**************************Инлайн CSS******************************************/
/*gulp.task('inlineCss', function() {
 return gulp.src('app/*.html')
 .pipe(inlineCss({
 applyStyleTags: true,
 applyLinkTags: true,
 removeStyleTags: true,
 removeLinkTags: true
 }))
 });*/

/**************************************Сжатие html******************************/
gulp.task('minify', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});


/*************************************WATCH************************************/
gulp.task('watch', ['browser-sync', 'sass', 'css-libs', 'scripts'], function() {
    gulp.watch('./scss/**/*.scss', function () {
        setTimeout(function () {
        gulp.start('sass');
        }, 1000);
    });
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./js/**/*.js', browserSync.reload);
});



/*************************************СБОРКА***********************************/
gulp.task('build', ['clean', 'img', 'sass', 'scripts', 'minify'], function() {

    var buildCss = gulp.src([
        './css/main.css',
        './css/main.min.css',
    ])
        .pipe(gulp.dest('./dist/css'));

    var buildFonts = gulp.src('./fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));

    var builJs = gulp.src('./js/**/*')
        .pipe(gulp.dest('dist/js'));

    /*var buildHtml = gulp.src('app/*.html')
     .pipe(gulp.dest('dist'));*/
});