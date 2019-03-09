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
						"text": message
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
				self.renderConsoleMsg("log", 'chevron_right', toString(msg))
			},
			error: function (msg) {
				self.renderConsoleMsg("error", 'error_outline', toString(msg))
			},
			warn: function (msg) {
				self.renderConsoleMsg("warn", 'warning', toString(msg))
			},
			clear: function (msg) {
				self.console_output.html()
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
}
var frameConsole = new FrameConsole();
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