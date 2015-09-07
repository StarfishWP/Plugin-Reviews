/* globals module, require */

module.exports = function (grunt) {

	"use strict";

	var copy_files = [
		'**',
		'!.git/**',
		'!.gitignore',
		'!.gitmodules',
		'!build/**',
		'!.svn/**',
		'!node_modules/**',
		'!*.less',
		'!*.md',
		'!LICENSE',
		'!Gruntfile.js',
		'!package.json',
		'!plugin-reviews-src.js',
		'!*.sublime-workspace',
		'!*.sublime-project'
	];

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

		wp_readme_to_markdown: {
			production: {
				files: {
					'readme.md': 'readme.txt'
				},
			},
		},

		copy: {
			production: {
				files: [{
					expand: true,
					cwd: '.',
					src: copy_files,
					dest: 'build'
				}]
			}
		},

		wp_deploy: {
			production: {
				options: {
					plugin_slug: 'plugin-reviews',
					svn_user: 'plugin-reviews',
					build_dir: 'build',
					assets_dir: '.svn/assets'
				}
			}
		},

		version: {
			pluginVersion: {
				options: {
					prefix: 'Version:\\s+'
				},
				src: [
					'plugin-reviews.php'
				]
			},
			pluginConstant: {
				options: {
					prefix: 'define\\(\\s*\'WR_VERSION\',\\s*\''
				},
				src: [
					'plugin-reviews.php'
				]
			},
			stableTag: {
				options: {
					prefix: 'Stable tag:\\s+'
				},
				src: [
					'readme.txt'
				]
			}
		},

		/**
		Creates a clean zip archive for production
		@author https://github.com/gruntjs/grunt-contrib-compress
		 */
		compress: {
			production: {
				options: {
					archive: '<%= pkg.name %>-<%= pkg.version %>.zip',
					mode: 'zip'
				},
				files: [{
					src: copy_files
				}]
			}
		}

	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", ["jshint", "uglify", "less", "wp_readme_to_markdown"]);
	grunt.registerTask("build", ["default", "copy", "wp_deploy"]);
	grunt.registerTask("release", ["default", "wp_readme_to_markdown", "compress"]);

};