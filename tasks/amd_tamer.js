/*
 * grunt-amd-tamer
 * https://github.com/freezedev/grunt-amd-tamer
 *
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('amd_tamer', 'Tame your AMD modules', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: ', ',
      base: null
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var source = grunt.file.read(filepath);
        var extension = path.extname(filepath);
        var moduleName = filepath.split(extension)[0];
        if (options.base) {
          moduleName = moduleName.split(options.base)[1];
        }
        
        if (source.indexOf('define([') >= 0 || source.indexOf('define(function') >= 0 || source.indexOf('define({') >= 0) {
          source = source.replace('define(', 'define("' + moduleName + '", ');
        } else {
          source += '\n\ndefine("' + moduleName + '", function() {})';
        }
        
        return source;
      }).join(grunt.util.normalizelf(options.separator));

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
