frame = iframe.contentWindow || document.getElementById("iframe").contentWindow.document;
class FrameConsole {
	constructor() {
		this.console_output = $("#console .console_output")
	}
	init() {
		this.frameConsole()
		this.frame()
	}
	frameConsoleClear() {
		frame.console.clear()
	}
	renderConsoleMsg(type, icon, message, info) {
		var event = new Date();
		this.console_output.append($("<li>", {
			"class": "console_message",
			append: $("<span>", {
				"text": event.toLocaleTimeString('en-GB')
			}).add("<span>", {
				"class": "console_message_" + type,
				append: $("<span>", {
					append: $("<i>", {
						"class": "material-icons",
						"text": icon
					})
				}).add("<span>", {
					append: $("<span>", {
						class: "message",
						append: print(message)
					})
				}).add("<span>", {
					append: $("<span>", {
						"text": info
					})
				})
			})
		}));
		return
	}
	frameConsole() {
		var self = this;
		return frame.console = {
			log: function (msg) {
				self.renderConsoleMsg("log", 'chevron_right', msg)
			},
			error: function (msg) {
				self.renderConsoleMsg("error", 'error_outline', msg)
			},
			warn: function (msg) {
				alert(JSON.stringify(msg, null, 2))
				self.renderConsoleMsg("warn", 'warning', msg)
			},
			clear: function (msg) {
				self.console_output.empty()
				return self.renderConsoleMsg("clear", 'check_circle_outline', 'console clear');
			}
		};
	}
	frame() {
		var self = this;
		return frame.onerror = window.onerror = function (error, source, lineno, colno) {
			self.renderConsoleMsg("error", 'error_outline', error, source + ' :: ' + lineno)
		}
	}
	toggle() {
		$(".console").toggleClass("closed");
	}
}
var frameConsole = new FrameConsole()
function toString(x) {
	return typeof x === 'string' ? x : JSON.stringify(x);
}
function argsToStr(args) {
	var out = "";
	for (var i = 0; i < args.length; i++) {
		out += args[i] + " ";
	}
	return out;
}
var t = "";
var print = function (o) {
	var str = '';
	function printCounter() {
		var currentCount = 0;
		return function () { // (**)
			return currentCount++;
		};
	}
	var counter = printCounter(); // (*)
	if (typeof o == 'object') {
		for (var p in o) {
			c = counter()
			if (typeof o[p] == 'string' || typeof o[p] == 'number') {
				q = t + "&nbsp;&nbsp;&nbsp;&nbsp"
				str += q + p + ': ' + o[p] + ', </br>';
			} else {
				t += "&nbsp;&nbsp;&nbsp;&nbsp"
				str += t + p + ': { </br>' + print(o[p]) + t + '}';
			}
		}
	} else {
		str += o;
	}
	return str;
}
function tabsCount(params) {
	for (key of object) {
		if (condition) {}
	}
}