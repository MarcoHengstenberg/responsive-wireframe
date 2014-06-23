// gruntfile.js
module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// HTML Hint Block
		htmlhint: {
	    build: {
        options: {
          'tag-pair': true, // always watch for matching end-tags
          'tagname-lowercase': true, // lowercase for tagnames
          'attr-lowercase': true, // lowercase for attributes
          'attr-value-double-quotes': true, // double quotationmarks for attributes
          'doctype-first': true, // Check for a doctype
          'spec-char-escape': true, // Check for unescaped special characters
          'id-unique': true, // Check for unique IDs, not unique -> kickbandie
          'head-script-disabled': true, // Scripts go to the footer
          'style-disabled': true // no style tag in the header, only external CSS-files
        },
        src: ['*.html'] // check all HTML files
	    }
		},

		// LESS to CSS Block
		less: {
			build: {
				options: {
					paths: ['less'], // watch this folder
					report: true // report in the terminal what you did
				},

				files: {
					'css/wired.css' : 'less/combined-wired.less' // create a css file out of the given less file
				}
			}
		},

		// Autoprefixer Block
		autoprefixer: {
			build: {
				options: {
					// support all browsers 3 versions back with more than 1% global usage
					browsers: ['last 3 versions', '> 1%']
				},

				files: {
					'css/wired.css' : 'css/wired.css'
				}
			}
		},

		// CSS Minifier Block
		cssmin: {
			build: {
				src: 'css/wired.css',
				dest: 'css/wired.min.css'
			}
		},

		// Javascript Concatenation Block
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['uncompressed-js/*.js'],
				dest: 'concatenated/wired.js'
			}
		},

		// Javascript Uglification Block
		uglify: {
			my_target: {
				files: {
					'js/wired.min.js': 'concatenated/wired.js'
				}
			}
		},

		// Image Compression Block
		// We fire that one manually until the watch task is working again
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7 // compression level
				},

				files: [{
					expand: true, // Dynamic expansion of capabilities
					cwd: 'raw', // cwd = current working directory = where do we have the uncompressed images
					src: ['**/*.png'], // check for all png files in cwd
					dest: 'images', // put images into this directory after compression
					ext: '.png' // give them the extension .png
				}]
			},

			jpg: {
				options: {
					progressive: true // progressive conversion, compress that JPG
				},

				files: [{
					expand: true, // see for png
					cwd: 'raw',
					src: ['**/*.jpg'],
					dest: 'images',
					ext: '.jpg'
				}]
			}
		},

		// Watch Block
		watch: {

			options: {
        livereload: true,
    	},
			
			html: {
				files: ['*.html'], // watch index.html for changes
				tasks: ['htmlhint'] // when changes -> do task
			},

			css: {
				files: ['less/*.less'], // watch all .less files for changes
				tasks: ['lessy'] // when changes -> do all defined tasks (see grunt.registerTask 'lessy')
			},

			js: {
				files: ['uncompressed-js/*.js'], // watch all js files for changes
				tasks: ['jayessy'] // when changes -> do all defined tasks
			},

			imagemin: {
				files: ['raw/*.jpg', 'raw/*.png'],
				tasks: ['crunch']
			}
		}


	});

	grunt.registerTask('default', []);
	grunt.registerTask('lessy', ['less', 'autoprefixer', 'cssmin']);
	grunt.registerTask('jayessy', ['concat', 'uglify']);
	grunt.registerTask('crunch', ['imagemin']);
}