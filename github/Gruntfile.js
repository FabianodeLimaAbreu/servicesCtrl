/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration
    clean: {
      build: {
        src: ['dist']
      },
      github:{
        src: ['servicesCtrl/github']
      },
      temporary:{
        //Clean the temporary folder that the usemin create when is in action
        src:['.tmp']
      }
    },    
    copy:{
      //Copy all the files, except that
      build:{
        //The line bellow can be changed accordding to the project
        src:['**','!node_modules/**','!**/Gruntfile.js','!**/package.json','!servicesCtrl/**',"!docs/**"],
        dest:'dist',
        expand:true
      },
      endbuild:{
        cwd:'.tmp/concat/css',
        src:'*.css',
        dest:'dist/css',
        expand:true
      },
      github:{
        src:['**','!node_modules/**','!servicesCtrl/**','!dist/**'],
        dest:'servicesCtrl/github',
        expand:true
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //Register tasks
  grunt.registerTask(
    'default',
    'In action with grunt',
    ['github']
  );

  grunt.registerTask(
    'github',
    'Copy files to github folder',
    ['clean:github','copy:github']
  )
  grunt.registerTask(
    //Clean and call the minifier task
    'build',
    'To deploy',
    ['clean:build','copy:build','minifier']
  );
};