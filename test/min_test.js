'use strict';

var grunt = require('grunt');

var tmp = 'tmp/',
    src = 'test/fixtures/src/',
    fixtures = 'test/fixtures/expected/';

exports.min = {
  
    compress_js: function(test){
      var file = 'simple.js';
      var actual = grunt.file.read(tmp + file);
      var expected = grunt.file.read(fixtures + file);
      test.equal(actual, expected, 'task output should equal ' + file);
      test.done();
    },
    
    compress_js_banner: function(test){
      var file = 'simple_banner.js';
      var original = 'simple.js';
      var content = grunt.file.read(tmp + file);
      var oContent = grunt.file.read(fixtures + original);
      var banner = content.replace(oContent, "").match(/^\/\/\s*banner/);
      test.ok(banner, 'banner should exist');
      test.done();
    },

    compress_js_footer: function(test){
      var file = 'simple_footer.js';
      var original = 'simple.js';
      var content = grunt.file.read(tmp + file);
      var oContent = grunt.file.read(fixtures + original);
      var footer = content.replace(oContent, "").match(/\/\/\s*footer\s*$/);
      test.ok(footer, 'footer should exist');
      test.done();
    },

    compress_js_banner_footer: function(test){
      var file = 'simple_banner_footer.js';
      var original = 'simple.js';
      var content = grunt.file.read(tmp + file);
      var oContent = grunt.file.read(fixtures + original);
      var banner = content.replace(oContent, "").match(/^\/\/\s*banner/);
      var footer = content.replace(oContent, "").match(/\/\/\s*footer\s*$/);
      test.ok((banner && footer), 'banner & footer should exist');
      test.done();
    },

    compress_js_remove_copyright: function(test){
      var file = 'simple_remove_copyright.js';
      var actual = grunt.file.read(tmp + file);
      var expected = grunt.file.read(fixtures + file);
      test.equal(actual, expected, 'task output should equal ' + file);
      test.done();
    },

    compress_js_multifile: function(test){
      var file = 'multifile.js';
      var actual = grunt.file.read(tmp + file);
      var expected = grunt.file.read(fixtures + file);
      test.equal(actual, expected, 'task output should equal ' + file);
      test.done();
    },
    
    compress_css: function(test){
      var file = 'simple.css';
      var actual = grunt.file.read(tmp + file);
      var expected = grunt.file.read(fixtures + file);
      test.equal(actual, expected, 'task output should equal ' + file);
      test.done();
    },
        
    compress_html: function(test){
      var file = 'simple.html';
      var actual = grunt.file.read(tmp + file);
      var expected = grunt.file.read(fixtures + file);
      test.equal(actual, expected, 'task output should equal ' + file);
      test.done();
    },

    compress_jpg: function(test){
      var file = 'simple.jpg';
      var actual = require('fs').statSync(tmp + file).size;
      var original = require('fs').statSync(src + file).size;
      var minified = original > actual;
      test.ok(minified, 'jpg should has been minified.');
      test.done();
    },
    compress_gif: function(test){
      var file = 'simple.gif';
      var actual = require('fs').statSync(tmp + file).size;
      var original = require('fs').statSync(src + file).size;
      var minified = original > actual;
      test.ok(minified, 'png should has been minified.');
      test.done();
    },
    compress_png: function(test){
      var file = 'simple.png';
      var actual = require('fs').statSync(tmp + file).size;
      var original = require('fs').statSync(src + file).size;
      var minified = original > actual;
      test.ok(minified, 'png should has been minified.');
      test.done();
    }

  
};
