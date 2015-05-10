module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {

            main: {
                files: ['src/**'],
                tasks: ['build-dev', 'copy:static']  
            },        
        },
        
        less: {
            development: {
                files: {
                    'src/style/css/document.css': 'src/style/less/document.less',
                    'src/style/css/main.css': 'src/style/less/main.less'
                }
            }        
        },

        browserSync: {
            bsFiles: {
                src: ['src/style/css/*.css', 'src/app/**/*.js', 'src/index.html']
            },
            
            options: {
                watchTask: true,

                server: {
                    baseDir: './',
                    directory: true
                }
            }
        },


        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/app',
                    mainConfigFile: 'src/app/app.js',
                    dir: 'build/app'
                }
            }        
        },

        autoprefixer: {
            def: {
                options: {
                    map: true,
                    browsers: ['last 2 versions', 'ie 9']
                },

                src: 'build/style/css/main.css',
                dest: 'build/style/css/main.css'
            }        
        },

        cssmin: {
            def: {
                files: [{
                    expand: true,
                    cwd: 'build/style/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/style/css',
                    ext: '.min.css'
                }]
            }            
        },

        copy: {
            fonts: {
                expand: true,
                cwd: 'src/style/fonts/',
                src: ['**'],
                dest: 'build/style/fonts/'
            },

            static: {
                expand: true,
                cwd: 'src/',
                src: ['*.html', '*.js'],
                dest: 'build/'
            },

            assets: {
                expand: true,
                cwd: 'src/style/assets/',
                src: ['**'],
                dest: 'build/style/assets/'
            },

            externalconfig: {
                expand: true,
                cwd: 'src/externalconfig/',
                src: ['**'],
                dest: 'build/externalconfig/'
            }
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',

                options: {
                    outdir: 'doc/',
                    paths: 'src/',
                    exclude: 'lib'
                }
            }
        }
    });

    // Plugins  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-properties-to-json');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-beep');
    
    // LESS Tasks
    grunt.registerTask('less-development', ['watch']);    
    grunt.registerTask('dev', ['browserSync', 'watch']);
        
    grunt.registerTask('build', ['requirejs:compile', 'less-def', 'copy:fonts', 'copy:static', 'copy:assets', ]);
    grunt.registerTask('build-dev', ['less:development', 'copy:fonts', 'copy:static', 'copy:assets', ]);

};