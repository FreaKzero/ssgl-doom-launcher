module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

            nwjs: {
                options: {
                    platforms: ['win'],
                    buildDir: './build', // Where the build version of my node-webkit app is saved 
                    version: 'v0.12.0'
                },
                src: ['./src/**/**', '!./src/app/lib/package.json'] // Your node-webkit app 
            }
    });

    // Plugins  
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nw-builder');
    
    grunt.registerTask('build', ['nwjs']);
    

};