/*
[============================== AUTOMATIC RELEASE NOTES ==============================]
|                                                                                     |
| When starting grunt release dont update the version of the root package.json        |
| This file is used for automatic updates.                                            |
|                                                                                     |
| Edit if after releasing - only update the src/package.json and start your release   |
| process.                                                                            |
|                                                                                     |
| Grunt will open the necessary Websites for editing the root package.json and making |
| your releasetag.                                                                    |
|                                                                                     |
[=====================================================================================]
*/

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        srcpkg: grunt.file.readJSON('src/package.json'),

        shell: {
            npmInstall: {
                command: 'cd src && npm install'
            },

            devInstall: {
                command: 'mv nwjs-v0.12.0-win-x64 nw && copy cfg\\package.json nw\\package.json && cd nw & npm install'
            },

            devInstallMac64: {
                command: 'mv nwjs-v0.12.0-osx-x64 nw && cp cfg/package.json nw/package.json && cd nw && npm install'
            },

            devInstallTux32: {
                command: 'tar -xzvf cache/nwdev.tar.gz && mv nwjs-v0.12.0-linux-ia32 nw && cp cfg/package.json nw/package.json && cd nw && npm install'
            },

            devInstallTux64: {
                command: 'tar -xzvf cache/nwdev.tar.gz && mv nwjs-v0.12.0-linux-x64 nw && cp cfg/package.json nw/package.json && cd nw && npm install'
            },

            osxUnzip: {
                command: 'unzip ./cache/nwdev.zip'
            },

            gitCommit: {
                command: 'git commit -a -m "Release Version <%= srcpkg.version %>"'
            },

            purgeBuilds: {
                command: 'rm -rf build/*'
            }
        },

        open: {
            newRelease: {
                path: 'https://github.com/FreaKzero/ssgl-doom-launcher/releases/new',
            },

            editPackage: {
                path: 'https://github.com/FreaKzero/ssgl-doom-launcher/edit/master/package.json'
            }
        },

        nwjs: {
            win: { 
                options: {
                    platforms: ['win'],
                    buildDir: './build',
                    version: '0.12.0',
                    winIco: './icons/ssgl1.ico'
                },
                src: ['./build/pre/**/**']
            },

            tux: {
                options: {
                    platforms: ['linux'],
                    buildDir: './build',
                    version: '0.12.0'
                },
                src: ['./build/pre/**/**']
            },

            mac: {
                options: {
                    platforms: ['osx64'],
                    buildDir: './build',
                    version: '0.12.0',
                    macIcns: './icons/ssgl.icns'
                },
                src: ['./build/pre/**/**']
            }
        },

        curl: {

            mac64: {
                src: 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-osx-x64.zip',
                dest: './cache/nwdev.zip'
            },

            win64: {
                src: 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-win-x64.zip',
                dest: './cache/nwdev.zip'
            },

            nwdevTux32: {
                src: 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-linux-ia32.tar.gz',
                dest: './cache/nwdev.tar.gz'
            },

            nwdevTux64: {
                src: 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-linux-x64.tar.gz',
                dest: './cache/nwdev.tar.gz'
            }
        },

        unzip: {
            nwdev: {
                src: './cache/nwdev.zip',
                dest: './'
            }
        },

        compress: {
            tux32: {
                options: {
                    archive: './build/RELEASE/linux32.tar.gz',
                    mode: 'tgz'
                },
                files: [{
                    src: ['**/*'],
                    expand: true,
                    cwd: './build/SSGL/linux32/'
                }]
            },

            tux64: {
                options: {
                    archive: './build/RELEASE/linux64.tar.gz',
                    mode: 'tgz'
                },
                files: [{
                    src: ['**/*'],
                    expand: true,
                    cwd: './build/SSGL/linux64/'
                }]
            },
            mac64: {
                options: {
                    archive: './build/RELEASE/macos64.tar.gz',
                    mode: 'tgz'
                },
                files: [{
                    src: ['**/*'],
                    expand: true,
                    cwd: './build/SSGL/osx64/'
                }]
            },
            
            win32: {
                options: {
                    archive: './build/RELEASE/win32.zip'
                },
                files: [{
                    src: ['**/*'],
                    expand: true,
                    cwd: './build/SSGL/win32/'
                }]
            },

            win64: {
                options: {
                    archive: './build/RELEASE/win64.zip'
                },
                files: [{
                    src: ['**/*'],
                    expand: true,
                    cwd: './build/SSGL/win64/'
                }]
            }
        },

        concat: {
            options: {
                separator: '\n\n',
                stripBanners: true,
            },
            
            dist: {
                src: ['src/app/_mixins.js',
                      'src/app/main.js',                       
                      'src/app/templates.js',
                      'src/app/controllers/*.js',
                      'src/app/directives/*.js',
                      'src/app/services/**.js'
                ],
                dest: 'build/pre/app.js',
            }
        },

        uglify: {
            options: {
                mangle: false
            },

            build: {
                files: {
                    'build/pre/app.js': ['build/pre/app.js']
                }
            }
        },

        ngtemplates: {
            app: {
                cwd: 'src/',
                src: 'app/templates/*.html',
                dest: 'src/app/templates.js',
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    },

                    bootstrap: function(module, script) {
                        return "app.run(['$templateCache', function($templateCache) {" + "\n" + script + '}]);';
                    }
                }
            }
        },
        
        copy: {
            main: {
                src: ['index.html', 'package.json', 'node_modules/**', 'app/assets/**', 'app/font/**', 'app/lib/**'],
                cwd: 'src/',
                dest: 'build/pre',
                expand: true
            }    
        },

        yuidoc: {
            compile: {
                name: 'Super Shotgun Launcher',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: './src/app',
                    outdir: './docs',
                    exclude: 'lib'
                }
            }
        }
    });

    // Plugins

    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build-js', ['ngtemplates', 'concat', 'uglify', 'copy']);

    grunt.registerTask('build-win', ['build-js', 'nwjs:win']);
    grunt.registerTask('build-linux', ['build-js', 'nwjs:tux']);
    grunt.registerTask('build-mac', ['build-js', 'nwjs:mac']);

    grunt.registerTask('init', ['shell:npmInstall']);

    grunt.registerTask('build-devenv-win', ['curl:win64', 'unzip', 'shell:devInstall']);
    grunt.registerTask('build-devenv-mac', ['curl:mac64', 'shell:osxUnzip', 'shell:devInstallMac64']);

    grunt.registerTask('build-devenv-linux32', ['curl:nwdevTux32', 'shell:devInstallTux32']);
    grunt.registerTask('build-devenv-linux64', ['curl:nwdevTux64', 'shell:devInstallTux64']);

    grunt.registerTask('releaseMac', [
        'shell:purgeBuilds',
        'build-js',
        'nwjs:mac',
        'compress:mac64'
    ]);

    grunt.registerTask('release', [
        'shell:purgeBuilds',
        'build-js',
        'nwjs:win',
        'nwjs:tux',
        'compress:tux32',
        'compress:tux64',
        'compress:win32',
        'compress:win64',
        'gitCommit'
    ]);

};
