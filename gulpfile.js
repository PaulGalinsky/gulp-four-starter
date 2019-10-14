const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
	//find main scss file in src
	return gulp.src('src/sass/style.scss')
	//pass through sass compiler
		.pipe(sass().on('error', sass.logError))
	//save compiled css in dist folder
		.pipe(gulp.dest('dist/css'))
	//stream changes to all browsers with browsersync
		.pipe(browserSync.stream());
}

function copyHTML() {
	//find .html files in src
	return gulp.src('src/*.html')
	// copy them to distribution fodler
		.pipe(gulp.dest('dist'));
}

function copyJS() {
	//find .js files in src
	return gulp.src('src/js/**/*.js')
	// copy them to distribution fodler
		.pipe(gulp.dest('dist/js'));
}


function watch() {
	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});
	gulp.watch('src/sass/**/*.scss', style);
	gulp.watch('src/*.html', copyHTML);
	gulp.watch('src/*.html').on('change', browserSync.reload);
	gulp.watch('src/js/**/*.js', copyJS);
	gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}

exports.copyHTML = copyHTML;
exports.copyJS = copyJS;
exports.style = style;
exports.watch = watch;
