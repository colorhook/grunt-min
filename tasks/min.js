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

  grunt.registerMultiTask('min', 'Minify CSS, JS, Image Files.', function() {
    var options = this.options({
      banner: '',
      footer: '',
      type: null
    });

    // Process banner.
    var banner = grunt.template.process(options.banner);
    var footer = grunt.template.process(options.footer);
    var done = this.async();
    var asyncCount = 0;
    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (src.length === 0) {
        grunt.log.warn('Destination (' + f.dest + ') not written because src files were empty.');
        return;
      }


      // Minify files, warn and fail on error.
      var result;
      var type = options.type;
      var types = ['js', 'css', 'html', 'image', 'json'];
      var methods = ['minifyJS', 'minifyCSS', 'minifyHTML', 'minifyImage', 'minifyJSON'];
      var typeRegExps = [/^\.js$/i, /^\.css$/i, /^\.(htm|html|xhtml)$/i, /^\.(jpg|jpeg|png|gif)$/i, /^\.json$/i];
      if(!type){
        var extname = require('path').extname(src[0]);
        typeRegExps.some(function(re, index){
          if(re.test(extname)){
            type = types[index];
            return true;
          }
          return false;
        });
        if(!type){
          type = 'js';
        }
      }
      var method = methods[types.indexOf(type)];
      if(!method){
        grunt.log.warn('Cannot minify this type file: ' + src);
        return;
      }
      
      var input = src;
      
      if(method === 'minifyImage'){
        asyncCount++;
        minifier[method](src[0], f.dest, function(e){
          asyncCount--;
          if(e){
            var err = new Error('minify failed.');
            err.message += '\n' + e.message + '. \n';
            err.origError = e;
            grunt.log.warn('Minify source "' + src + '" failed.');
            grunt.fail.warn(err);
          }
          if(asyncCount <= 0){
            done();
          }
        }, options);
      }else{
        var codes = [];
        src.forEach(function(item){
            codes.push(grunt.file.read(item));
        });
        var minContent;
        try {
          minContent = minifier[method](codes.join(require('os').EOL), options);
        } catch (e) {
          var err = new Error('minfy failed.');
          if (e.message) {
            err.message += '\n' + e.message + '. \n';
            if (e.line) {
              err.message += 'Line ' + e.line + ' in ' + src + '\n';
            }
          }
          err.origError = e;
          grunt.log.warn('Minify source "' + src + '" failed.');
          grunt.fail.warn(err);
        }
        grunt.file.write(f.dest, minContent);
        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });

     if(asyncCount === 0){
        done();
     }

  });

};
