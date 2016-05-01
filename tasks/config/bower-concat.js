module.exports = function(grunt) {

  grunt.config.set('bower_concat', {
    dev: {
      dest: 'assets/js/bower.js',
      cssDest: 'assets/styles/bower.css',
      dependencies: {
        'bootstrap': 'jquery'
      },
      mainFiles: {
        'jquery': ['dist/jquery.min.js'],
        'bootstrap': ['dist/js/bootstrap.min.js', 'dist/css/bootstrap.min.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
};
