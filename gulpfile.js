var gulp = require('gulp');
var concat = require('gulp-concat');
var spritesmith = require('gulp.spritesmith');

var PROJECT_NAME = "game-template";

gulp.task('spritesheet-json', function() {
  // generate PNG and JSON files for game images
  return gulp.src("./app/game/sprites/*.*")
    .pipe(spritesmith({
      imgName: PROJECT_NAME + ".png",
      cssName: PROJECT_NAME + ".json",
      cssTemplate: texturePackerTemplate,
      algorithm: "binary-tree",
      padding: 1
    }))
    .pipe(gulp.dest("./dist/assets/"));

  function texturePackerTemplate(params) {
  	var items = params.items,
  		itemObj = {frames: []},
  		frames = itemObj.frames,
  		item;

  	if (items.length > 0) {
  		item = items[0];
  		itemObj.meta = {
  			app: "https://github.com/Ensighten/spritesmith",
  			image: item.image,
  			format: "RGBA8888",
  			size: {
  				w: item.total_width,
  				h: item.total_height
  			},
  			scale: 1
  		};
  	}

  	items.forEach(function (item) {
  		frames.push({
  			filename: item.name,
  			frame: {
  				x: item.x,
  				y: item.y,
  				w: item.width,
  				h: item.height
  			},
  			rotated: false,
  			trimmed: false,
  			spriteSourceSize: {
  				x: 0,
  				y: 0,
  				w: item.width,
  				h: item.height
  			},
  			sourceSize: {
  				w: item.width,
  				h: item.height
  			}
  		});
  	});

  	return JSON.stringify(itemObj);
  }
});

gulp.task('spritesheet-css', function() {
  // generate PNG and CSS files for game images
  return gulp.src("./app/game/sprites/*.*")
    .pipe(spritesmith({
      imgName: PROJECT_NAME + ".png",
      cssName: PROJECT_NAME + ".css",
      cssOpts: {
        cssSelector: function(sprite) {
          return '.' + sprite.name;
        }
      },
      algorithm: "binary-tree",
      padding: 1
    }))
    .pipe(gulp.dest("./dist/assets/"));
});

gulp.task('phaser', function() {
  return gulp.src([
    'node_modules/phaser/build/pixi.min.js',
    'node_modules/phaser/build/phaser.min.js',
    'node_modules/phaser-ads/build/phaser-ads.min.js'
  ])
    .pipe(concat('phaser.js'))
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('spritesheet', ['spritesheet-css', 'spritesheet-json'], function() {
});

gulp.task('fonts', function() {
  return gulp.src([
    'app/game/fonts/**/*'
  ])
    .pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('default', ['spritesheet', 'fonts', 'phaser'], function() {
});
