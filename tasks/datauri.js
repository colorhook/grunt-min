/*
 * grunt-min
 * http://github.com/colorhook/grunt-min
 *
 * Copyright (c) 2014 colorhook@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var minifier = require('node-minifier');
 
  grunt.registerMultiTask('datauri', 'CSS DataURI Conversation.', function() {
    var options = this.options();
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (src.length === 0) {
        grunt.log.warn('Destination (' + f.dest + ') not written because src files were empty.');
        return;
      }
      options.input = src = src[0];

      // Write out the css file has been datauri.
      grunt.file.write(f.dest,  minifier.datauri(grunt.file.read(src), options));
      grunt.log.writeln('File "' + f.dest + '" has been datauri.');
      
    
    });
  });

 
};
