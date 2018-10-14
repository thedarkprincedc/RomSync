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
            },
            dev: {
                files: [
                    { expand: true, flatten: true, src: [
                        'node_modules/angular/angular.js',
                        'node_modules/zurb-foundation-5/js/foundation/foundation.js',
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/angular-ui-router/release/angular-ui-router.js',
                        'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js',
                        "node_modules/angular-local-storage/dist/angular-local-storage.js",
                        "node_modules/angular-mocks/angular-mocks.js"
                    ], dest: 'webapp/libs/npm/'}
                ]
            },
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
        },
        concat: {
            libs: {
                src: [
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/lodash/lodash.js",
                    "node_modules/npm-modernizr/modernizr.js",
                    "node_modules/zurb-foundation-5/js/foundation/foundation.js",
                    "node_modules/zurb-foundation-5/js/foundation/foundation.magellan.js",
                    "node_modules/angular/angular.js",
                    "node_modules/angular-sanitize/angular-sanitize.js",
                    "node_modules/angular-animate/angular-animate.js",
                    "node_modules/angular-mocks/angular-mocks.js",
                    "node_modules/angular-local-storage/dist/angular-local-storage.js",
                    "node_modules/angular-ui-router/release/angular-ui-router.js",
                    "node_modules/checklist-model/checklist-model.js",
                    "node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js",
                    "node_modules/angular-ui-scroll/dist/ui-scroll.js",
                    "libs/vendor/mm-foundation-tpls-0.8.0.js",
                    "node_modules/ag-grid/dist/ag-grid.js"
                ],
                dest: 'libs/library.js'
            }
        },
        protractor: {
            options: {
              configFile: "./protractor.conf.js", // Default config file
              noColor: false, // If true, protractor will not use colors in its output.
              args: {
                // Arguments passed to the command
              }
            },
            e2e: {
                options: {
                  // Stops Grunt process if a test fails
                  keepAlive: false
                }
              },
            continuous: {
                options: {
                  keepAlive: true
                }
            }
        },
        karma: {
            unit: {
              configFile: 'karma.conf.js',
              singleRun: true,
            }
        },
        connect: {
            options: {
              port: 9000,
              hostname: 'localhost'
            },
            test: {
              options: {
                // set the location of the application files
                base: ['./']
              }
            }
          }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-html-build');
    grunt.loadNpmTasks('grunt-replace');
    
    grunt.registerTask("e2e", ['protractor:e2e']);
    grunt.registerTask("unit", ['karma:unit']); 

    grunt.registerTask("alltest", ['connect:test','protractor:e2e', 'karma:unit']);
    grunt.registerTask("cc", ['concat:libs']);
    grunt.registerTask("cleanStage", ['clean:cleanStage']);
    grunt.registerTask('default', ['clean:build','copy:build', 'ngtemplates:app.module', 'htmlbuild:build', 'replace:dist']);
}