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
        src:['**','!**/Gruntfile.js','!**/package.json','!servicesCtrl/**',"!docs/**",'!node_modules/**'],
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
    watch: {
      jsdoc:{
        files: ['controllers/*.js','routes/*.js'],
        tasks: ['jsdoc']
      }
    },
    jsdoc : {
        dist : {
            src: ['controllers/*.js','routes/*.js'],
            options: {
                destination: 'docs',
                //It's use a template configuration in it's folder
                template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                /*
                  https://github.com/krampstudio/grunt-jsdoc
                  http://terryweiss.github.io/docstrap/themes/cosmo/index.html
                  http://usejsdoc.org/about-getting-started.html#generating-a-website
                */
            }
       }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-watch');


  //Register tasks
  grunt.registerTask(
    'default',
    'In action with grunt',
    ['dev']
  );

  grunt.registerTask(
    'dev',
    'Developing',
    ['watch','jsdoc']
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
    ['clean:build','copy:build']
  );
};