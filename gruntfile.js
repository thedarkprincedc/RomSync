module.exports = function(grunt) {
    grunt.config('environment', (function(){
        var env = grunt.option('env') || 'local',
            apiDomain;
        if (grunt.option('env') === 'prod') {
            apiDomain = 'http://www.example.com/';
        } else if (grunt.option('env') === 'dev') {
            apiDomain = 'https://192.168.2.27/dev/romsync-server/public';
        } else {
            apiDomain = 'http://localhost:8080';
        }
        return apiDomain;
    })());

    grunt.initConfig({
        clean: {
            build: {
              src: ['./build']
            },
            cleanStage:{
                src: ['/var/webdev/romsync', '/var/webdev/romsync-server']
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
        },
        replace: {
            dist: {
              options: {
                patterns: [
                  {
                    match: 'apiUrl',
                    replacement:  grunt.config('environment')
                  }
                ]
              },
              files: [
                {expand: true, flatten: true, src: ['build/index.html'], dest: 'build/'}
              ]
            }
          }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-html-build');
    grunt.loadNpmTasks('grunt-replace');
    grunt.registerTask("cleanStage", ['clean:cleanStage']);
    grunt.registerTask('default', ['clean:build','copy:build', 'ngtemplates:app.module', 'htmlbuild:build', 'replace:dist']);
}