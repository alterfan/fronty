var _cm, delay, _htmlEditor, _cssEditor, _jsEditor;
var options = {};
options.defaults = {
	theme: "monokai",
	styleActiveLine: false,
	autoCloseBrackets: true,
	lineNumbers: true,
	lineWrapping: true,
	autoCloseTags: true,
	matchBrackets: true,
	showCursorWhenSelecting: true,
	scrollbarStyle: "simple",
	matchTags: true,
	foldGutter: true,
	gutters: ["CodeMirror-foldgutter", "CodeMirror-linenumbers"],
	matchTags: {
		bothTags: true
	},
	extraKeys: {
		"Ctrl-Q": "toMatchingTag",
		'Ctrl-K': function (cm, event) {
			cm.state.colorpicker.popup_color_picker();
		}
	},
	beautify: {
		initialBeautify: true,
		autoBeautify: false
	},
	colorpicker: {
		mode: 'edit',
	}
};
var config = {};
config.defaults = {
	delay: "500",
	fontSize: "12px",
	fontFamily: "Consolas",
	layout: "horizontal",
};
class Cm {
	constructor() {
		if (localStorage) {
			if (!localStorage.getItem("FrontyUserConfig")) {
				var _config = JSON.stringify(config.defaults);
				localStorage.setItem("FrontyUserConfig", _config);
			}
			if (!localStorage.getItem("FrontyUserOptions")) {
				var _options = JSON.stringify(options.defaults);
				localStorage.setItem("FrontyUserOptions", _options);
			}
			if (!localStorage.getItem("FrontyAutoSave")) {
				var arr = ["<h1>Test</h1>", "h1{color:red}", "console.log('Test')", "", "", "Test Project"];
				localStorage.setItem("FrontyAutoSave", arr);
			}
		} else {
			alert("Sorry but your browser does not support localStorage");
		}
		this.fuo = JSON.parse(localStorage.getItem("FrontyUserOptions"));
		this.fuс = JSON.parse(localStorage.getItem("FrontyUserConfig"));
		this.fas = [localStorage.getItem("FrontyAutoSave").split(',')];
		this._autoupdate = true;
		this.delay;
		this.fontSize;
		this.fontFamily;
		this.layout;
	}
	init() {
		var _this = this;
		$('.code').each(function (index) {
			if (index == 0) {
				$(this).attr('id', "htmlmixed");
				$(this).val(_this.fas[0]); //get autosaved
				_htmlEditor = _cm = CodeMirror.fromTextArea($("#htmlmixed").get(0), _this.fuo);
				_cm.setOption("mode", "htmlmixed"); //set mode
			}
			if (index == 1) {
				$(this).attr('id', "css");
				$(this).val(_this.fas[1]); //get autosaved
				_cssEditor = _cm = CodeMirror.fromTextArea($('#css').get(0), _this.fuo);
				_cm.setOption("mode", "css"); //set mode
			}
			if (index == 2) {
				$(this).attr('id', "javascript");
				$(this).val(_this.fas[2]); //get autosaved
				_jsEditor = _cm = CodeMirror.fromTextArea($('#javascript').get(0), _this.fuo);
				_cm.setOption("mode", "javascript"); //set mode
			}
			_this._focus()
			_this._change()
			_this._selectLine()
			updatePreview($("#htmlmixed").val(), $("#css").val(), $("#javascript").val())
		});
		clearTimeout(delay);
		this.changeTheme("monokai");
		this.changeFontSize(this.fuс["fontSize"]);
		this.changeFontFamily(this.fuс["fontFamily"]);
		return true;
	}
	changeTheme(val) {
		/* добавить сохранение в локал */
		/*         $('#' + storage.getKey("local", editorOptions, 'theme')).remove();
		 */
		$('head').append('<link rel="stylesheet" type="text/css" href="./codemirror/theme/' + val + '.css">');
		/* добавить сохранение в локал */
		$('.CodeMirror').each(function (index, el) {
			$('.CodeMirror')[index].CodeMirror.setOption("theme", val);
		});
	}
	changeFontSize(val) {
		$('.CodeMirror').css("font-size", val);
		this.fuс["fontSize"] = val;
		localStorage.setItem("FrontyUserConfig", JSON.stringify(this.fuс))
	}
	changeFontFamily(val) {
		$('.CodeMirror').css("font-family", val);
		this.fuс["fontFamily"] = val;
		localStorage.setItem("FrontyUserConfig", JSON.stringify(this.fuс))
	}
	_focus() {
		_cm.on("focus", function (cm) {
			cm.setOption("styleActiveLine", true)
		});
		_cm.on("blur", function (cm) {
			cm.setOption("styleActiveLine", false)
		});
	}
	_change() {
		_cm.on("changes", function (cm) {
			cm.save();
			clearTimeout(delay);
			delay = setTimeout(updatePreview($("#htmlmixed").val(), $("#css").val(), $("#javascript").val()));
			cm.refresh();
		});
	}
	_selectLine() {
		_cm.on('gutterClick', function (cm, line, gutter) {
			if (gutter === 'CodeMirror-linenumbers') {
				cm.focus();
				return cm.setSelection(CodeMirror.Pos(line, 0), CodeMirror.Pos(line + 1, 0));
			}
		});
	}
}
function updatePreview(htmlVal, cssVal, javascriptVal, cssLibs, jsLibs, name) {
	var template_body = '<body>' + htmlVal + '</body><script>' + javascriptVal + '</script>';
	var template_head = '<head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Preview - Bootstrap Themes</title><style>' + cssVal + '</style></head>';
	/* обновление iframe */
	$("#preview iframe").attr("srcdoc", '<!DOCTYPE html><html lang="ru-RU">' + template_head + template_body + '</html>');
	localStorage.setItem("FrontyAutoSave", ['"' + htmlVal + '"', cssVal, javascriptVal, cssLibs, jsLibs, name])
	/* $('.code').each(function(index) {
		storage.setKey("session", autosave, index, $('#code-' + index).val());
	});
	$('.externalLibs').each(function(index) {
		storage.setKey("session", autosave, (index + 3), $('#code-' + (index + 3)).val());
	});
	initConsole(); */
}