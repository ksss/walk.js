#! /usr/bin/env node

var test = require('./test.js');
var Walk = require('../lib/walk.js').Walk;

test.run("walk test", function () {
	var w = new Walk("abcdefghijklmn");
	ok("start", w.ch, 'a');
	ok("next", w.next(), 'b');
	ok("ch", w.ch, 'b');
	ok("next", w.next(), 'c');
	ok("next", w.next(), 'd');
	ok("back", w.back(), 'c');
	ok("back", w.back(), 'b');
	ok("back", w.back(), 'a');
	ok("to", w.to('g'), 6);
	ok("ch", w.ch, 'g');
	ok("each", w.each(function(c){return c + '#';}), "g#h#i#j#k#l#m#n#");

	w = new Walk("a    foo");
	w.next();
	w.white();
	ok("ignore white space", w.ch, 'f');

	var ret = Walk.each("hijklmn", function (c) {
		return c + '0';
	});
	ok("Walk.each", ret, "h0i0j0k0l0m0n0");
});
