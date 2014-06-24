module.exports = function(grunt) {
    "use strict";

    /* ==========================================================================
        Project configuration.
    ========================================================================== */

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({

        /*  Metadata.
            ========================================================================== */
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                ' * <%= pkg.name %> <%= pkg.version %> by @pixeo\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * <%= pkg.licenses.type %>, <%= pkg.licenses.url %>\n' +
                ' */\n',
        src: 'src/',
        dest: 'dist/',



        /*  Minify main.js & the concated plugins.js to UI folder.
            ========================================================================== */
        uglify: {
            options: {
                banner: '<%= banner %>',
                report: 'min'
            },
            uglifyJSDirectory: {
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: '<%= src %>js/', // Src matches are relative to this path.
                    src: ['*.js', '!*.min.js', '!sidebarEffects.js'], // Actual pattern(s) to match.
                    dest: '<%= dest %>js/', // Destination path prefix.
                    ext: '.min.js', // Dest filepaths will have this extension.
                }]
            }
        },



        /*  Create a custom Modernizr
            ========================================================================== */
        modernizr: {

            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile": "remote",

                // [REQUIRED] Path to save out the built file.
                "outputFile": "<%= src %>js/modernizr.min.js",

                "extra": {
                    "shiv": true,
                    "printshiv": false,
                    "load": true,
                    "mq": false,
                    "cssclasses": true
                },

                "extensibility": {
                    "addtest": false,
                    "prefixed": false,
                    "teststyles": false,
                    "testprops": false,
                    "testallprops": false,
                    "hasevents": false,
                    "prefixes": false,
                    "domprefixes": false
                },

                // By default, this task will crawl your project for references to Modernizr tests.
                // Set to false to disable.
                "parseFiles": true,

                // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
                // You can override this by defining a "files" array below.
                "files": {
                    "src": [
                        "<%= src %>sass/**/*.scss",
                        "<%= src %>js/*.js"
                    ]
                },
            }

        },



        /*  Check all self-written Javascript.
            ========================================================================== */
        jshint: {
            gruntfile: {
                src: [
                    'Gruntfile.js'
                ]
            },

            dev : {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    '<%= src %>js/*.js',
                    '!<%= src %>js/**/*.min.js',
                    '!<%= src %>js/sidebarEffects.js'
                ]
            }
        },



        /*  Compile Sass
            ========================================================================== */
        sass: {
            options:{
                sourceMap: false
            },
            dist: {
                files: {
                    '<%= src %>css/<%= pkg.name %>.css': '<%= src %>sass/<%= pkg.name %>.scss'
                }
            }
        },


        /*  Compile Sass
            ========================================================================== */
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            core: {
                options: {
                    map: false
                },
                src: '<%= src %>css/<%= pkg.name %>.css'
            }
        },



        /*  Minify CSS
            ========================================================================== */
        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: '<%= banner %>',
            },
            minify: {
                expand: true,
                cwd: '<%= src %>css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= dest %>css/',
                ext: '.min.css'
            }
        },



        /*  Automate tasks
            ========================================================================== */
        watch: {

            gruntfile: {
                files: ['<%= jshint.gruntfile.src %>'],
                tasks: ['jshint:gruntfile']
            },

            js: {
                files: ['<%= jshint.dev.src %>'],
                tasks: ['jshint:dev']
            },

            sass: {
                files: ["<%= src %>sass/**/*.scss"],
                tasks: ['sass', 'autoprefixer']
            },

        }
    });



    /*  Define used plugins
        ========================================================================== */
    require('time-grunt')(grunt); //Show Grunt build times
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'}); //Load grunt tasks



    /*  Global tasks
            ========================================================================== */

    // Default task.
    grunt.registerTask('default', ['watch']);

    //Building is used to compile files to _Development and then copy to root (production)
    grunt.registerTask('build', ['buildStyles', 'buildScripts', 'optimizeImages']);
    grunt.registerTask('buildStyles', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('buildScripts', ['uglify']);

};
