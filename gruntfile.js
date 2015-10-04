module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            npmInstall: {
                command: 'cd src & npm install'
            },
            devInstall: {
                command: 'rename nwjs-v0.12.0-win-x64 nw && copy cfg\\package.json nw\\package.json && cd nw & npm install'
            }
        },

        nwjs: {
            win: {
                options: {
                    platforms: ['win'],
                    buildDir: './build',
                    version: 'v0.12.0',
                    winIco: './icons/ssgl1.ico'
                },
                src: ['./src/**/**', '!./src/app/lib/package.json', '!./src/config.*']
            },

            tux: {
                options: {
                    platforms: ['linux'],
                    buildDir: './build',
                    version: 'v0.12.0'
                },
                src: ['./src/**/**', '!./src/app/lib/package.json', '!./src/config.*']
            }
        },

        curl: {

            win64: {
                src: 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-win-x64.zip',
                dest: './cache/nwdev.zip'
            },

            nwdevTux32: {
              src: 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-linux-ia32.tar.gz',
                dest: './cache/nwdev.zip'
            },

            nwdevTux64: {
              src: 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-linux-x64.tar.gz',
                dest: './cache/nwdev.zip'
            }
        },

        unzip: {
            nwdev: {
                src: './cache/nwdev.zip',
                dest: './'
            }
        }
    });

    // Plugins

    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('build', ['nwjs:win']);
    grunt.registerTask('build-linux', ['nwjs:tux']);

    grunt.registerTask('init', ['shell:npmInstall']);

    grunt.registerTask('build-devenv', ['curl:win64', 'unzip', 'shell:devInstall']);
    grunt.registerTask('build-devenv-linux32', ['curl:nwdevTux32', 'unzip', 'shell:devInstall']);
    grunt.registerTask('build-devenv-linux64', ['curl:nwdevTux64', 'unzip', 'shell:devInstall']);

};