/* globals module, require */

module.exports = function (grunt) {

	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		jshint: {
			all: ['Gruntfile.js', 'plugin-reviews-src.js']
		},

		uglify: {
			global: {
				files: {
					"plugin-reviews.js": ["plugin-reviews-src.js"]
				}
			}
		},

		less: {
			production: {
				options: {
					cleancss: true
				},
				files: {
					"plugin-reviews.css": "plugin-reviews.less"
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
					archive: 'plugin-reviews-<%= pkg.version %>.zip',
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
						'!plugin-reviews-src.js',
						'!*.sublime-workspace',
						'!*.sublime-project',
						'!plugin-reviews-<%= pkg.version %>.zip'
					]
				}]
			}
		}

	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", ["jshint", "uglify", "less"]);

};