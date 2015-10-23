module.exports = function(grunt) {
  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    compress: 'grunt-contrib-compress',
    copy: 'grunt-contrib-copy',
    cssmin: 'grunt-contrib-cssmin',
    protractor: 'grunt-protractor-runner',
    shell: 'grunt-shell',
    uglify: 'grunt-contrib-uglify'
  });

  var wiredep = require('wiredep');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    compress: {
      main: {
        options: {
          archive: '<%= uncompressedDist %>.zip'
        },
        files: [{
          src: ['<%= versionedName %>/**'],
          cwd: 'dist',
          expand: true
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['source/*png', 'LICENSE.md', 'README-dist.md'],
          dest: '<%= uncompressedDist %>'
        },
        {
          expand: true,
          cwd: 'bower_components/jquery-ui/themes/ui-lightness',
          src: ['images/*'],
          dest: '<%= uncompressedDist %>'
        }]
      }
    },


    cssmin: {
      target: {
        files: [
          {
            src: ['source/auto_completion.css'],
            dest: '<%= uncompressedDist %>/autocomplete-lhc.min.css',
          },
          {
            src: ['source/auto_completion.css',
                  'bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css'],
            dest: '<%= uncompressedDist %>/autocomplete-lhc_jQueryUI.min.css',
          }
        ]
      }
    },


    uglify: {
      options: { compress: true },
      my_target: {
        files: {
          // Minified version of just the autocomplete-lhc files
          '<%= uncompressedDist %>/autocomplete-lhc.min.js':
            wiredep({includeSelf: true, exclude: [/jquery/]}).js,
          // Minified version of the autocomplete-lhc files with the needed
          // jQuery-UI components.
          '<%= uncompressedDist %>/autocomplete-lhc_jQueryUI.min.js':
            wiredep({includeSelf: true, exclude: [/jquery(-ui)?\.js/]}).js,
          // Minified version of autocomplete-lhc and all its dependencies
          '<%= uncompressedDist %>/autocomplete-lhc_jQuery.min.js':
            wiredep({includeSelf: true, exclude: [/jquery-ui\.js/]}).js
        }
      }
    },


    shell: {
      dist_dir_link: {
        // Make a softlink to the versioned dist directory, for the tests
        command: 'ln -s <%= versionedName %> latest',
        options: {
          execOptions: {
            cwd: 'dist'
          }
        }
      },
      run_tests: {
        command: './test/run_tests.sh'
      }
    }

  });

  grunt.registerTask('readBowerVersion', function () {
    var bowerVersion = grunt.file.readJSON('./bower.json').version;
    var versionedName = 'autocomplete-lhc-'+bowerVersion;
    grunt.config.set('versionedName', versionedName);
    grunt.config.set('uncompressedDist', 'dist/'+versionedName);
  });

  grunt.registerTask('compressDist', ['readBowerVersion',
    'compress']);

  grunt.registerTask('dist', ['clean', 'readBowerVersion', 'copy:dist', 'cssmin',
        'uglify', 'compress', 'shell:dist_dir_link']);

  grunt.registerTask('test', ['dist', 'shell:run_tests']);


  // This task is just for debugging the "uglify" configuration
  grunt.registerTask('listDepJS', function() {
    console.log("\n\n" + wiredep(
      {includeSelf: true, exclude: [/jquery/]}).js.join("\n"));
    console.log("\n\n" + wiredep(
      {includeSelf: true, exclude: [/jquery(-ui)?\.js/]}).js.join("\n"));
    console.log("\n\n" + wiredep(
      {includeSelf: true, exclude: [/jquery-ui\.js/]}).js.join("\n"));
  });

};
