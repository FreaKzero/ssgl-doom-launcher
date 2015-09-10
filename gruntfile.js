module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {      
      npmInstall: {
        command: 'cd src & npm install'
      }
    },

    nwjs: {
      options: {
        platforms: ['win'],
        buildDir: './build', // Where the build version of my node-webkit app is saved 
        version: 'v0.12.0',
        winIco: './icons/ssgl1.ico'
      },
      src: ['./src/**/**', '!./src/app/lib/package.json', '!./src/config.*'] // Your node-webkit app 
    }
  });

  // Plugins  

  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('build', ['nwjs']);
  grunt.registerTask('init', ['shell:npmInstall']);


};