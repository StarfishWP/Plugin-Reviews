/* globals module, require */

module.exports = function (grunt) {

	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		jshint: {
			all: ['Gruntfile.js', 'wordpress-reviews-src.js']
		},

		uglify: {
			global: {
				files: {
					"wordpress-reviews.js": ["wordpress-reviews-src.js"]
				}
			}
		},

		less: {
			production: {
				options: {
					cleancss: true
				},
				files: {
					"wordpress-reviews.css": "wordpress-reviews.less"
				}
			}
		},

		/**
		Creates a clean zip archive for production
		@author https://github.com/gruntjs/grunt-contrib-compress
		 */
		compress: {
			main: {
				options: {
					archive: 'wordpress-reviews-<%= pkg.version %>.zip',
					mode: 'zip'
				},
				files: [{
					src: [
						'*',
						'**',
						'!.gitignore',
						'!.svn/**',
						'!node_modules/**',
						'!*.less',
						'!README.md',
						'!Gruntfile.js',
						'!package.json',
						'!wordpress-reviews-src.js',
						'!*.sublime-workspace',
						'!*.sublime-project',
						'!wordpress-reviews-<%= pkg.version %>.zip'
					]
				}]
			}
		}

	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", ["jshint", "uglify", "less"]);

};