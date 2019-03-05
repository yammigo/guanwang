//guulp 自动化任务部署
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
	less = require('gulp-less'),
	imgmin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	px2rem = require('gulp-px2rem-plugin'),
    cssUglify = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');
gulp.task('comless',function () {
	gulp.src('css/*.less')
		.pipe(less())
		// .pipe(px2rem({'width_design':1920,'valid_num':6,'pieces':10,'ignore_px':[1,2]}))
		.pipe(autoprefixer({
         browsers: ['last 2 versions'], //浏览器前缀
         cascade: false
        }))
		.pipe(gulp.dest('css'));
});

gulp.task('watch',function () {
	gulp.watch('css/*.less',['comless']);
});

gulp.task('imgmin',function () {
	gulp.src('src/static/img/*.{jpg,png}')
		.pipe(imgmin())
		.pipe(gulp.dest('dist/static/img'));
});

gulp.task('minjs',function () {
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});
gulp.task('mincss',function () {
	gulp.src('css/*.css')
		.pipe(cssUglify())
		.pipe(gulp.dest('css'));
});
gulp.task('htmlmin',function () {
	gulp.src('src/*.html')
		.pipe(htmlmin())
		.pipe(gulp.dest('dist/'));
});

//默认任务
gulp.task('default',['comless']);

gulp.task('pack',['minjs','mincss','htmlmin'],function () {

});
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

