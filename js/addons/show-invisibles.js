'use strict';
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	return typeof obj;
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
/* global CodeMirror */
/* global define */
(function (mod) {
	'use strict';
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') // CommonJS
		return mod(require('codemirror/lib/codemirror'));
	if (typeof define === 'function' && define.amd) // AMD
		return define(['codemirror/lib/codemirror'], mod);
	mod(CodeMirror);
})(function (CodeMirror) {
	'use strict';
	CodeMirror.defineOption('showInvisibles', false, function (cm, val, prev) {
		var Count = 0;
		var Maximum = cm.getOption('maxInvisibles') || 16;
		if (prev === CodeMirror.Init) prev = false;
		if (prev && !val) {
			cm.removeOverlay('invisibles');
			return rm();
		}
		if (!prev && val) {
			add(Maximum);
			cm.addOverlay({
				name: 'invisibles',
				token: function nextToken(stream) {
					var spaces = 0;
					var peek = stream.peek() === ' ';
					if (peek) {
						while (peek && spaces < Maximum) {
							++spaces;
							stream.next();
							peek = stream.peek() === ' ';
						}
						var ret = 'whitespace whitespace-' + spaces;
						/*
						 * styles should be different
						 * could not be two same styles
						 * beside because of this check in runmode
						 * function in `codemirror.js`:
						 *
						 * 6624: if (!flattenSpans || curStyle != style) {}
						 */
						if (spaces === Maximum) ret += ' whitespace-rand-' + Count++;
						return ret;
					}
					while (!stream.eol() && !peek) {
						stream.next();
						peek = stream.peek() === ' ';
					}
					return 'cm-eol';
				}
			});
		}
	});
	function add(max) {
		var classBase = '.CodeMirror .cm-whitespace-';
		var spaceChar = '·';
		var style = document.createElement('style');
		style.setAttribute('data-name', 'js-show-invisibles');
		var rules = '';
		var spaceChars = '';
		for (var i = 1; i <= max; ++i) {
			spaceChars += spaceChar;
			var rule = classBase + i + '::before { content: "' + spaceChars + '";}\n';
			rules += rule;
		}
			style.textContent = getStyle() + '\n' + getEOL() + '\n' + rules;
		document.head.appendChild(style);
	}
	function rm() {
		var style = document.querySelector('[data-name="js-show-invisibles"]');
		document.head.removeChild(style);
	}
	function getStyle() {
		var style = ['.cm-whitespace::before {', 'position: absolute;', 'pointer-events: none;', 'color: #404F7D;', '}'].join('');
		return style;
	}
	function getEOL() {
		var style = ['.CodeMirror-code > div > pre > span::after, .CodeMirror-line > span::after {', 'pointer-events: none;', 'color: #404F7D;', '}'].join('');
		return style;
	}
});