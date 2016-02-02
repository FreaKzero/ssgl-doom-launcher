module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            npmInstall: {
                command: 'cd src && npm install'
            },
            
            devInstall: {
                command: 'rename nwjs-v0.12.0-win-x64 nw && copy cfg\\package.json nw\\package.json && cd nw & npm install'
            },
            
			devInstallTux32: {			
                command: 'tar -xzvf cache/nwdev.tar.gz && mv nwjs-v0.12.0-linux-ia32 nw && cp cfg/package.json nw/package.json && cd nw && npm install'
            },
            
			devInstallTux64: {
                command: 'tar -xzvf cache/nwdev.tar.gz && mv nwjs-v0.12.0-linux-x64 nw && cp cfg/package.json nw/package.json && cd nw && npm install'
            },

            askPackage: {
                command: 'echo "Did you update your package.json and are on the Master Branch ?" && pause'
            },

            gitCommit: {
                command: 'git commit -a -m "Release Version <%= pkg.version %>"'
            },

            gitTag: {
                command: 'git tag v<%= pkg.version %>'
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
    
    grunt.registerTask('build-win', ['nwjs:win']);
    grunt.registerTask('build-linux', ['nwjs:tux']);
    grunt.registerTask('init', ['shell:npmInstall']);

    grunt.registerTask('build-devenv-win', ['curl:win64', 'unzip', 'shell:devInstall']);
    grunt.registerTask('build-devenv-linux32', ['curl:nwdevTux32', 'shell:devInstallTux32']);
    grunt.registerTask('build-devenv-linux64', ['curl:nwdevTux64', 'shell:devInstallTux64']);
    
    grunt.registerTask('release', [
        'shell:askPackage', 
        'nwjs:win', 
        'nwjs:tux', 
        'shell:gitCommit', 
        'shell:gitTag'
    ]);    

};