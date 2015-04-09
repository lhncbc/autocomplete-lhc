module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist: {
        files: [ {src: 'indexPreMin.html', dest: 'index.html'},
                 {src: ['autocomplete-lhc/*.css',
                        'autocomplete-lhc/*.png',
                        'jquery-ui/themes/ui-lightness/**'],
                  dest: 'dist/', expand: true, cwd: 'bower_components'} ]
      }
    },

    'useminPrepare': {
      options: {
        dest: '.'
      },
      html: 'indexPreMin.html'
    },

    usemin: {
      html: ['index.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', ['useminPrepare', 'copy', 'concat', 'uglify', 'usemin']);
};