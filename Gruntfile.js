'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    var environment = process.env.NODE_ENV || 'development';

    function config (environment) {
        if (environment === "bower") {
            return grunt.file.readJSON('./bower.json');
        }
        return grunt.file.readJSON('./config/' + environment + '.json');
    }

    grunt.initConfig({
        config: {
            path: require('path'),
            name: 'webApp',
            app: 'app',
            dist: 'dist',
            build: 'build',
            tmp: '.tmp',
            sasscache: '.sass-cache',
            scripts: 'scripts',
            views: 'views',
            images: 'images',
            styles: 'styles',
            downloads: 'downloads',
            components: 'bower_components',
            environment: environment
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.tmp %>',
                        '<%= config.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>'
                }
            }
        },
        watch: {
            js: {
                files: ['<%= config.app %>/<%= config.scripts %>/{,**/}*.js'],
                options: {
                    livereload: true
                }
            },
            compass: {
                files: ['<%= config.app %>/<%= config.styles %>/{,**/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,**/}*.html',
                    '<%= config.tmp %>/<%= config.styles %>/{,**/}*.css',
                    '<%= config.app %>/<%= config.images %>/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        clean: {
            server: '<%= config.tmp %>',
            dist: '<%= config.dist %>',
            sasscache: '<%= config.sasscache %>',
            distBower: '<%= config.dist %>/<%= config.components %>',
            downloads: '<%= config.downloads %>',
            constants: '<%= config.app %>/<%= config.scripts %>/config.js',
            build: '<%= config.build %>',
            distDevelopment: '<%= config.build %>/development',
            distQa: '<%= config.build %>/qa',
            distStaging: '<%= config.build %>/staging',
            distProduction: '<%= config.build %>/production'
        },
        copy: {
            styles: {
                src: '<%= config.tmp %>/<%= config.styles %>/main.css',
                dest: '<%= config.dist %>/<%= config.styles %>/main.css'
            },
            html: {
                src: '<%= config.app %>/index.html',
                dest: '<%= config.dist %>/index.html'
            },
            distComponents: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.components %>/',
                dest: '<%= config.dist %>//<%= config.components %>/',
                src: ['**']
            },
            distTemplates: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.views %>/',
                dest: '<%= config.dist %>//<%= config.views %>/',
                src: ['**']
            },
            images: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.images %>/',
                dest: '<%= config.dist %>/<%= config.images %>/',
                src: ['**']
            },
            font: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.font %>/',
                dest: '<%= config.dist %>/<%= config.font %>/',
                src: ['**']
            },
            scripts: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.scripts %>/',
                dest: '<%= config.tmp %>/<%= config.scripts %>/',
                src: ['{,**/}*.js']
            },
            "distDevelopment": {
                expand: true,
                cwd: '<%= config.dist %>',
                dest: '<%= config.build %>/development',
                src: ['**']
            },
            "distQa": {
                expand: true,
                cwd: '<%= config.dist %>',
                dest: '<%= config.build %>/qa',
                src: ['**']
            },
            "distStaging": {
                expand: true,
                cwd: '<%= config.dist %>',
                dest: '<%= config.build %>/staging',
                src: ['**']
            },
            "distProduction": {
                expand: true,
                cwd: '<%= config.dist %>',
                dest: '<%= config.build %>/production',
                src: ['**']
            }
        },
        ngconstant: {
            options: {
                space: '  ',
                name: 'config',
                dest: '<%= config.app %>/<%= config.scripts %>/config.js',
                wrap: '"use strict";\n {%= __ngModule %}'
            },
            development: {
                constants: {
                    ACTIVITY_API_URL: config("development").server.activityUrl
                }
            },
            qa: {
                constants: {
                    ACTIVITY_API_URL: config("qa").server.activityUrl
                }
            },
            staging: {
                constants: {
                    ACTIVITY_API_URL: config("staging").server.activityUrl
                }
            },
            production: {
                constants: {
                    ACTIVITY_API_URL: config("production").server.activityUrl
                }
            }
        },
        env : {
            dev: {
                NODE_ENV: 'development'
            }
        },
        concat_css: {
            options: {},
            all: {
                src: ['<%= config.tmp %>/<%= config.styles %>/*.css'],
                dest: '<%= config.tmp %>/<%= config.styles %>/main.css'
            }
        },
        compass: {
            options: {
                sassDir: '<%= config.app %>/<%= config.styles %>',
                imagesDir: '<%= config.app %>/<%= config.images %>',
                javascriptsDir: '<%= config.app %>/<%= config.scripts %>',
                importPath: '<%= config.app %>/<%= config.components %>',
                httpImagesPath: '/<%= config.images %>',
                httpGeneratedImagesPath: '/<%= config.images %>/generated',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            server: {
                options: {
                    cssDir: '<%= config.tmp %>/<%= config.styles %>',
                    generatedImagesDir: '<%= config.tmp %>/<%= config.images %>/generated'
                }
            }
        },
        //add css vendor prefixes
        autoprefixer: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.tmp %>/<%= config.styles %>/',
                        src: '{,**/}*.css',
                        dest: '<%= config.tmp %>/<%= config.styles %>/'
                    }
                ]
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/<%= config.scripts %>',
                    src: 'app.js',
                    dest: '<%= config.dist %>/<%= config.scripts %>'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    '<%= config.tmp %>/<%= config.scripts %>/config.js',
                    '<%= config.tmp %>/<%= config.scripts %>/app.js',
                    '<%= config.tmp %>/<%= config.scripts %>/controllers/login.js',
                    '<%= config.tmp %>/<%= config.scripts %>/controllers/summary.js',
                    '<%= config.tmp %>/<%= config.scripts %>/controllers/search.js',
                    '<%= config.tmp %>/<%= config.scripts %>/controllers/customer.js',
                    '<%= config.tmp %>/<%= config.scripts %>/controllers/product.js',
                    '<%= config.tmp %>/<%= config.scripts %>/controllers/customerNew.js',
                    '<%= config.tmp %>/<%= config.scripts %>/controllers/activity.js',
                    '<%= config.tmp %>/<%= config.scripts %>/rest/module.js',
                    '<%= config.tmp %>/<%= config.scripts %>/rest/activity-api.js',
                    '<%= config.tmp %>/<%= config.scripts %>/services/userService.js'
                ],
                dest: '<%= config.dist %>/<%= config.scripts %>/app.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    '<%= config.dist %>/<%= config.scripts %>/app.js': ['<%= config.dist %>/<%= config.scripts %>/app.js']
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/<%= config.styles %>/main.css': ['<%= config.dist %>/<%= config.styles %>/main.css']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= config.dist %>/index.html',
            options: {
                dest: '<%= config.dist %>'
            }
        },
        usemin: {
            html: ['<%= config.dist %>/index.html'],
            options: {
                assetsDirs: ['<%= config.dist %>']
            }
        }
    });

    grunt.registerTask('taskCleanBasic', function () {
        grunt.task.run([
            'clean:server',
            'clean:dist',
            'clean:constants'
        ]);
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'taskCleanBasic',
            'ngconstant:development',
            'compass',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('taskBuildCode', function () {
        grunt.task.run([
            'compass',
            'autoprefixer',
            'concat_css',
            'copy:styles',
            'copy:html',
            'copy:distComponents',
            'copy:distTemplates',
            'copy:images',
            'copy:font',
            'copy:scripts',
            'useminPrepare',
            'concat',
            'ngAnnotate',
            'uglify',
            'cssmin',
            'rev',
            'usemin',
            'clean:distBower'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean:build',
            'buildProduction',
            'buildStaging',
            'buildQa',
            //'buildDev',
            'clean:dist',
            'clean:server',
            'clean:sasscache'
        ]);
    });

    grunt.registerTask('buildDev', function () {
        grunt.task.run([
            'taskCleanBasic',
            'ngconstant:development',
            'taskBuildCode',
            'clean:distDevelopment',
            'copy:distDevelopment'
        ]);
    });

    grunt.registerTask('buildProduction', function () {
        grunt.task.run([
            'taskCleanBasic',
            'ngconstant:production',
            'taskBuildCode',
            'clean:distProduction',
            'copy:distProduction'
        ]);
    });

    grunt.registerTask('buildStaging', function () {
        grunt.task.run([
            'taskCleanBasic',
            'ngconstant:staging',
            'taskBuildCode',
            'clean:distStaging',
            'copy:distStaging'
        ]);
    });

    grunt.registerTask('buildQa', function () {
        grunt.task.run([
            'taskCleanBasic',
            'ngconstant:qa',
            'taskBuildCode',
            'clean:distQa',
            'copy:distQa'
        ]);
    });

    grunt.registerTask('serve_build', function () {
        grunt.task.run([
            'buildDev',
            'connect:dist:keepalive'
        ]);
    });
};