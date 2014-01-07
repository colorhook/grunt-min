/*
 * grunt-min
 * http://github.com/colorhook/grunt-min
 *
 * Copyright (c) 2014 colorhook@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // remove tmp directory
    clean: {
      tests: ['tmp']
    },

    // min tasks
    min: {
      compress_js: {
        files: {
          'tmp/simple.js': ['test/fixtures/src/simple.js']
        }
      },
      compress_js_banner: {
        files: {
          'tmp/simple_banner.js': ['test/fixtures/src/simple.js']
        },
        options : {
          banner : '// banner'
        }
      },
      compress_js_footer: {
        files: {
          'tmp/simple_footer.js': ['test/fixtures/src/simple.js']
        },
        options : {
          footer : '// footer'
        }
      },
      compress_js_banner_footer: {
        files: {
          'tmp/simple_banner_footer.js': ['test/fixtures/src/simple.js']
        },
        options : {
          banner : '// banner',
          footer : '// footer'
        }
      },
      compress_js_remove_copyright: {
        files: {
          'tmp/simple_remove_copyright.js': ['test/fixtures/src/simple.js']
        },
        options: {
          copyright: false
        }
      },
      multifile: {
        files: {
          'tmp/multifile.js': ['test/fixtures/src/simple.js','test/fixtures/src/comments.js']
        }
      },
      compress_css: {
        files: {
          'tmp/simple.css': 'test/fixtures/src/simple.css'
        }
      },
      compress_html: {
        files: {
          'tmp/simple.html': 'test/fixtures/src/simple.html'
        }
      },
      compress_jpg: {
        files: {
          'tmp/simple.jpg': 'test/fixtures/src/simple.jpg'
        }
      },
      compress_gif: {
        files: {
          'tmp/simple.gif': 'test/fixtures/src/simple.gif'
        }
      },
      compress_png: {
        files: {
          'tmp/simple.png': 'test/fixtures/src/simple.png'
        }
      }
      
    },

    //datauri
    datauri: {
       common:{
          files: {
             'tmp/datauri.css': 'test/fixtures/src/datauri.css'
          }
       }
    },

    //unit test
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });



  //load this plugin's task(s).
  grunt.loadTasks('tasks');

  //dependencies
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  //grunt test
  grunt.registerTask('test', [
    'clean',
    'min:compress_js',
    'min:compress_js_banner',
    'min:compress_js_footer',
    'min:compress_js_banner_footer',
    'min:compress_js_remove_copyright',
    'min:compress_css',
    'min:compress_html',
    'min:compress_jpg',
    'min:compress_gif',
    'min:compress_png',
    'min:multifile',
    'datauri:common',
    'nodeunit'
  ]);

  //default
  grunt.registerTask('default', ['jshint', 'test']);

};
