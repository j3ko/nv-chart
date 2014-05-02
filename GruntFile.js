module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcFiles: [
            'src/*.js',
            'src/classes/*.js',
            'src/controllers/*.js',
            'src/directives/*.js'
        ],
        testFiles: [
            'test/*.js'
        ],
        buildFiles: [
            'build/<%= pkg.name %>.js'
        ],
        vendorFiles: [
            'lib/jquery-1.11.0.js',
            'lib/angular.js',
            'lib/angular-mocks.js',
            'lib/d3.js',
            'lib/nv.d3.js'
        ],
        karma: {
            unit: {
                options: {
                    configFile: 'test/karma.conf.js',
                    autoWatch: false,
                    singleRun: true,
                    browsers: ['Chrome']
                }
            },
            ci: {
                options: {
                    configFile: 'test/karma.conf.js',
                    autoWatch: false,
                    singleRun: true,
                    browsers: ['PhantomJS']
                }
            }
        },
        watch: {
            debug: {
                files: ['<%= srcFiles %>'],
                tasks: ['concat:debug', 'jshint']
            }
        },
        jshint: {
            options: {
                newcap: false
            },
            all: ['build/<%= pkg.name %>.js']
        },
        concat: {
            options: {
                banner: '/***********************************************\n' +
                    '* nv-chart JavaScript Library\n' +
                    '* Author: Jeffrey Ko\n' +
                    '* License: MIT (http://www.opensource.org/licenses/mit-license.php)\n' +
                    '* Compiled At: <%= grunt.template.today("mm/dd/yyyy HH:MM") %>\n' +
                    '***********************************************/\n' +
                    '(function(window, $) {\n' +
                    '\'use strict\';\n',
                footer: '\n}(window, jQuery));'
            },
            prod: {
                options: {
                    stripBanners: {
                        block: true,
                        line: true
                    }
                },
                src: ['<%= srcFiles %>'],
                dest: 'build/<%= pkg.name %>.js'
            },
            debug: {
                src: ['<%= srcFiles %>'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },      
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | ' + 
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            all: {
                src: ['<%= buildFiles %>'],
                options: {
                    vendor: ['<%= vendorFiles %>'],
                    specs: 'test/*Spec.js',
                    helpers: 'test/*Helpers.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('test', ['concat:debug', 'karma:ci', 'jshint']);
    grunt.registerTask('debug', ['watch:debug']);
    grunt.registerTask('build', ['concat:prod', 'karma:unit', 'jshint', 'uglify']);
};