'use strict';

var grunt = require('grunt');

var tmp = 'tmp/',
    src = 'test/fixtures/src/',
    fixtures = 'test/fixtures/expected/';

exports.min = {
  
    datauri: function(test){
      var file = 'datauri.css';
      var actual = grunt.file.read(tmp + file);
      var expected = grunt.file.read(fixtures + file);
      test.equal(actual, expected, 'task output should equal ' + file);
      test.done();
    }

  
};
