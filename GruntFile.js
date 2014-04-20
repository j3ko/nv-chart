module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcFiles: [
            'src/*.js',
            'src/classes/*.js',
            'src/directives/*.js'
        ],
        watch: {
            debug: {
                files: ['<%= srcFiles %>'],
                tasks: ['debug']
            }
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
            customTemplate: {
                src: 'src/<%= pkg.name %>.js',
                options: {
                    specs: 'spec/_specs.js',
                    helpers: 'spec/_helpers.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    
    grunt.registerTask('debug', ['concat:debug', 'watch:debug']);
    grunt.registerTask('build', ['concat:prod', 'uglify']);
};