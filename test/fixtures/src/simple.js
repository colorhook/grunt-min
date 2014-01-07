/*! a comment using *! protocol */
// a comment

var env = 'grunt';

var  name = 'grunt-min';

function min(src, output) {
  return env + '.' + name + '(' + src+ ', ' + output + ');';
}

var result = min('a.js', 'a.min.js');



