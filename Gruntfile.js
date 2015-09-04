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
					src: [
						'**/*',
						'!build/**',
						'!.gitignore',
						'!.svn/**',
						'!node_modules/**',
						'!*.less',
						'!readme.md',
						'!Gruntfile.js',
						'!package.json',
						'!plugin-reviews-src.js',
						'!*.sublime-workspace',
						'!*.sublime-project',
						'!plugin-reviews-<%= pkg.version %>.zip'
					],
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

		replace: {
			pluginVersion: {
				src: [
					'plugin-reviews.php'
				],
				overwrite: true,
				replacements: [{
					from: /^\s\*\sVersion: .*$/m,
					to: ' * Version:           <%= pkg.version %>'
				}]
			},
			pluginConstant: {
				src: [
					'plugin-reviews.php'
				],
				overwrite: true,
				replacements: [{
					from: /define\( '(.*?)',\s*'(.*)' \);/,
					to: 'define( \'WR_VERSION\', \'<%= pkg.version %>\' );'
				}]
			},
			stableTag: {
				src: [
					'readme.txt'
				],
				overwrite: true,
				replacements: [{
					from: /^Stable tag: .*$/m,
					to: 'Stable tag: <%= pkg.version %>'
				}]
			}
		},

		/**
		Creates a clean zip archive for production
		@author https://github.com/gruntjs/grunt-contrib-compress
		 */
		compress: {
			production: {
				options: {
					archive: 'plugin-reviews-<%= pkg.version %>.zip',
					mode: 'zip'
				},
				files: [{
					src: [
						'**/*',
						'!build/**',
						'!.gitignore',
						'!.svn/**',
						'!node_modules/**',
						'!*.less',
						'!README.md',
						'!CONTRIBUTING.md',
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

	grunt.registerTask("default", ["jshint", "uglify", "less", "wp_readme_to_markdown"]);
	grunt.registerTask("build", ["default", "copy", "wp_deploy"]);

};