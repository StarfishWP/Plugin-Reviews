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
		}

	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", ["jshint", "uglify", "less"]);

};