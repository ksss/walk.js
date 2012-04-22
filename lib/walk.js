(function () {
	var Walk = function (src) {
		return this.init(src);
	};

	Walk.prototype.init = function (src) {
		this.src = src;
		this.ch = this.src.charAt(0);
		this.at = 0;
		return this;
	};

	Walk.prototype.next = function (c) {
		if (c && c !== this.ch) {
			this.error("Expected '" + c + "' instead of '" + this.ch + "' src='" + this.src + "'");
		}
		this.at += 1;
		this.ch = this.src.charAt(this.at);
		return this.ch;
	};

	Walk.prototype.back = function (c) {
		if (c && c !== this.ch) {
			this.error("Expected '" + c + "' instead of '" + this.ch + "' src='" + this.src + "'");
		}
		this.at -= 1;
		this.ch = this.src.charAt(this.at);
		return this.ch;
	};

	Walk.prototype.to = function (c) {
		while (this.ch && this.ch !== c) {
			this.next();
		}
		return this.at;
	};

	Walk.prototype.white = function () {
		while (this.ch && this.ch <= ' ') {
			this.next();
		}
	};

	Walk.prototype.each = function (to, callback) {
		var ret = '';
		if (arguments.length === 1) {
			callback = to;
			to = '';
		}
		while (this.ch && this.ch !== to) {
			ret += callback(this.ch) || '';
			this.next();
		}
		return ret;
	};

	Walk.prototype.error = function (m) {
		throw {
			message: m,
			src: this.src,
			ch: this.ch,
			at: this.at,
		};
	};

	/**
	 * Walk.run(function (w) {
	 *     w.next();
	 *     ...
	 * });
	 */
	Walk.run = function (src, callback) {
		var w, ret;
		w = new Walk(src);
		ret = callback(w);
		return ret;
	};

	/**
	 * var ret = Walk.each(text, function (c) {
	 *   return c + '\n';
	 * });
	 */
	Walk.each = function (src, callback) {
		var w = new Walk(src);
		var ret = '';
		while (w.ch) {
			ret += callback(w.ch);
			w.next();
		}
		return ret;
	};

	this.Walk = Walk;
}).call(this);
