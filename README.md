walk.js
=======

this is library for processing one char at a time in javascript

simply
`var Walk = require('walk').Walk;
var w = new Walk('abcde');
w.ch // => 'a'
w.next() // => 'b'
w.ch // => 'b'
`

and useful
`var w = new Walk('abcde');
w.each(function(c){
  return c + '@';
}); // => 'a@b@c@d@e@'
`
