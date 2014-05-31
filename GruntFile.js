module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcFiles: [
            'src/partials/intro.js',
            'src/*.js',
            'src/classes/*.js',
            'src/controllers/*.js',
            'src/directives/*.js',
            'src/partials/outro.js'
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
                files: ['<%= srcFiles %>', 'src/less/*.less'],
                tasks: ['less:debug', 'concat:debug', 'jshint']
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
                stripBanners: {
                    block: true,
                    line: true
                },
                banner: '/***********************************************\n' +
                    '* nv-chart JavaScript Library\n' +
                    '* Author: Jeffrey Ko\n' +
                    '* License: MIT (http://www.opensource.org/licenses/mit-license.php)\n' +
                    '* Compiled At: <%= grunt.template.today("mm/dd/yyyy HH:MM") %>\n' +
                    '***********************************************/\n'
            },
            version: {
                src: ['<%= srcFiles %>'],
                dest: '<%= pkg.name %>-<%= pkg.version %>.debug.js'
            },
            prod: {
                src: ['<%= srcFiles %>'],
                dest: 'build/<%= pkg.name %>.js'
            },
            debug: {
                src: ['<%= srcFiles %>'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        less: {
            debug: {
                files: {
                    "build/nv-chart.css": ['src/less/global.less']
                }
            },
            prod: {
                options: {
                    cleancss: true
                },
                files: {
                    "build/nv-chart.min.css": ['src/less/global.less']
                }
            },
            version: {
                files: {
                    "nv-chart.css": ['src/less/global.less']
                }
            },
            versionmin: {
                options: {
                    cleancss: true
                },
                files: {
                    "nv-chart.min.css": ['src/less/global.less']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | ' + 
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            prod: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            },
            version: {
                src: '<%= pkg.name %>-<%= pkg.version %>.debug.js',
                dest: '<%= pkg.name %>-<%= pkg.version %>.min.js'
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
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('test', ['less:debug', 'concat:debug', 'karma:ci', 'jshint']);
    grunt.registerTask('debug', ['watch:debug']);
    grunt.registerTask('build', ['less:prod', 'concat:prod', 'karma:unit', 'jshint', 'uglify:prod']);
    grunt.registerTask('version', ['less:version', 'less:versionmin', 'concat:version', 'uglify:version']);

};