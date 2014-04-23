module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcFiles: [
            'src/*.js',
            'src/classes/*.js',
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
        watch: {
            debug: {
                files: ['<%= srcFiles %>', '<%= testFiles %>'],
                tasks: ['concat:debug', 'jasmine', 'jshint']
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
                    '* ng-d3 JavaScript Library\n' +
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('test', ['concat:debug', 'jasmine', 'jshint']);
    grunt.registerTask('debug', ['watch:debug']);
    grunt.registerTask('build', ['concat:prod', 'jasmine', 'jshint', 'uglify']);
};