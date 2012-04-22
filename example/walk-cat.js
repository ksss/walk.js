#! /usr/bin/env node

var fs = require('fs');
var Walk = require('../lib/walk.js').Walk;

var file = process.argv && process.argv[2] || './walk-cat.js';

console.time('read');
var fcat = function (name, eachfn, endfn) {
	fs.open(name, 'r', function (e, fd) {
		if (e) throw e;
		var rw = function (offset) {
			var size = 1024;
			buffer = new Buffer(size);
			fs.read(fd, buffer, 0, buffer.length, null, function (e, bytesRead, buffer) {
				if (e) throw e;
				var text = buffer.toString('utf8', 0, bytesRead);
				console.log(Walk.each(text, eachfn));
				if(bytesRead < size) {
					return endfn();
				}
				rw(offset + bytesRead);
			});
		};
		rw(0);
	});
};

fcat(file, function (c) {
	return c + '@';
}, function() {
	console.timeEnd('read');
});
