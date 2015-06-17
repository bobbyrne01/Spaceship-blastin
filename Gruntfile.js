module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'package.json', 'bower.json', 'js/main.js', 'js/bullets.js'],
			options: {
				moz: true,
				force: true, // don't stop when there is an error
				maxerr: 10000 // keep running no matter how many errors were found
			}
		},
		jsbeautifier: {
			files: ['<%= jshint.files %>', 'index.html'],
			options: {
				js: {
					braceStyle: "collapse",
					breakChainedMethods: false,
					e4x: false,
					evalCode: false,
					indentChar: "\t",
					indentLevel: 0,
					indentSize: 1,
					indentWithTabs: true,
					jslintHappy: true,
					keepArrayIndentation: false,
					keepFunctionIndentation: false,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					spaceBeforeConditional: true,
					spaceInParen: false,
					unescapeStrings: false,
					wrapLineLength: 0
				},
				html: {
					braceStyle: "collapse",
					indentChar: "\t",
					indentScripts: "keep",
					indentSize: 1,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					unformatted: ["a", "sub", "sup", "b", "i", "u"],
					wrapLineLength: 0
				},
				css: {
					indentChar: "\t",
					indentSize: 1
				}
			}
		},
		validation: {
			options: {
				stoponerror: false,
				reset: true
			},
			files: {
				src: ['index.html']
			}
		},
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['']
			}
		},
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 2,
				success: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	grunt.registerTask('default', ['jsbeautifier', 'jshint', 'validation', 'csslint']);
	grunt.task.run('notify_hooks');
};
