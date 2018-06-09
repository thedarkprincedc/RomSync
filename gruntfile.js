module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            build: {
              src: ['./build']
            }
        },
        ngtemplates:  {
            "app.module": {
                options: {
                    prefix: '../'
                },
              src:      'components/**/*.html',
              dest:     'build/components/app.templates.js'
            }
        },
        copy: {
            build: {
                files: [
                    { expand: true, src: [
                        './**',
                        '!./components/**/*.html',
                        '!./test/**',
                        '!./node_modules/**',
                        '!./gruntfile.js',
                        '!./karma.conf.js',
                        '!./package-lock.json',
                        '!./package.json',
                        '!./components/app-config.js',
                        '!**/*.spec.js'
                    ], dest: 'build/'}
                ]
            }
        },
        htmlbuild: {
            build: {
                src: 'build/index.html',
                dest: 'build/',
                options: {
                    beautify: true,
                    prefix: './',
                    relative: true,
                    basePath: false,
                    scripts: {
                        bundle: [
                            'build/libs/library.js',
                            'build/components/**/*.js',
                            'build/components/app.templates.js',
                            '!build/**/*.spec.js',
                            '!build/components/app.constants.js'
                        ],
                        main: "app.start.js",
                        constant: "build/components/app.constants.js"
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-html-build');
    grunt.registerTask('default', ['clean:build','copy:build', 'ngtemplates:app.module', 'htmlbuild:build']);
}