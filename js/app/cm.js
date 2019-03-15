var cmcm, cmDoc, cmEditor, _html, _css, _js;
var mixedMode = {
	name: "htmlmixed",
	scriptTypes: [{
			matches: /\/x-handlebars-template|\/x-mustache/i,
			mode: null
		},
		{
			matches: /(text|application)\/(x-)?vb(a|script)/i,
			mode: "vbscript"
		}
	]
};
class Cm extends Ui {
	constructor() {
		super();
		this._autoupdate = true;
		this.cm;
		this.fontSize;
		this.fontFamily;
		this.layout;
		this.isType = false;
		this.options = _DB.getStorage("options");
		this.configuration = _DB.getStorage("configuration");
		this.autosaved = _DB.getStorage("autosaved");
		this.delay = _DB.getStorageItem("configuration", 'delay');
		this.theme = _DB.getStorageItem("options", 'theme')
		this.fontSize = _DB.getStorageItem("configuration", 'fontSize');
		this.init()
	}
	init() {
		let _this = this;
		console.log('TCL: Cm -> init -> _this.theme', _this.theme)
		$('.code').each(function (index) {
			var mode = $(this).attr('id');
			$(this).val(_this.autosaved[index]); //get autosaved
			cmcm = CodeMirror.fromTextArea($("#" + mode).get(0), _this.options);
			mode == "htmlmixed" ? cmcm.setOption("mode", mixedMode) : cmcm.setOption("mode", mode);
			_this.eventsListner(cmcm);
		});
		this.change_theme(_this.theme);
		_this.change_fontSize(_this.fontSize);
		_this.change_fontFamily(_this.fontFamily);
		setTimeout(function () {
			updatePreview()
		}, _this.delay);
	}
	cm_refresh() {
		$(".Codemirror").each(function (index) {
			$(this).get(0).CodeMirror.refresh()
		});
	}
	change_theme(val) {
		$('head').append('<link rel="stylesheet" type="text/css" href="./codemirror/theme/' + val + '.css">');
		$('.CodeMirror').each(function (index) {
			$('.CodeMirror')[index].CodeMirror.setOption("theme", val);
		});
		if (_DB.setStorageItem("options", 'theme', val)) {
			cmcm.refresh();
		}
	}
	change_fontSize(val) {
		$('.CodeMirror').css("font-size", val);
		if (_DB.setStorageItem("configuration", 'fontSize', val)) {
			cmcm.refresh();
		}
	}
	change_delay(val) {
		this.delay = val;
		if (_DB.setStorageItem("configuration", 'delay', val)) {}
	}
	change_fontFamily(val) {
		$('.CodeMirror').css("font-family", val);
		if (_DB.setStorageItem("configuration", 'fontFamily', val)) {
			cmcm.refresh();
		}
	}
	eventsListner(cmInstance) {
		let This = this;
		cmInstance.on("gutterClick", function (cm, line, gutter) {
			if (gutter === 'CodeMirror-linenumbers') {
				return cm.setSelection(CodeMirror.Pos(line, 0), CodeMirror.Pos(line + 1, 0));
			}
		});
		cmInstance.on("focus", function (cm) {
			cm.setCursor(cmInstance.lineCount(), 0);
			cmDoc = cm.getDoc();
			cmEditor = cmDoc.getEditor();
			cm.setOption("styleActiveLine", true);
		})
		cmInstance.on("mousedown", function (cm) {
			cm.cmToolbar(editorBar);
			cm.miniMap()
		});
		cmInstance.on("blur", function (cm) {
			cm.setOption("styleActiveLine", false);
		});
		cmInstance.on("keydown", function (cm) {
			This.isType = false;
		})
		cmInstance.on("change", function (cm) {
			This.isType = true
		})
		cmInstance.on("keyup", function (cm) {
			cm.save();
			_DB.setStorage("autosaved", [$("#htmlmixed").val(), $("#css").val(), $("#javascript").val()]);
			if (This._autoupdate == true) {
				if (This.isType == true) {
					setTimeout(function () {
						single(updatePreview())
					}, This.delay);
				}
				cm.refresh();
			}
		})
		cmInstance.on("resize", function (cm) {
			cm.refresh();
		});
	}
}
class CmEditor extends Cm {
	constructor() {
		super()
	}
	format() {
		if (typeof cmEditor.getOption('mode') == "object") {
			var mode = (cmEditor.getOption('mode')).name
		} else {
			var mode = cmEditor.getOption('mode');
		}
		let code = cmEditor.getValue();
		if (mode == 'htmlmixed') {
			var formatted = html_beautify(code, {
				'indent_size': 2,
				'indent_char': '\t'
			});
		}
		if (mode == 'javascript') {
			var formatted = js_beautify(code, {
				'indent_size': 2,
				'indent_char': '\t'
			});
		}
		if (mode == 'css') {
			var formatted = css_beautify(code, {
				'indent_size': 2,
				'indent_char': '\t'
			});
		}
		cmEditor.setValue(formatted);
		cmEditor.setCursor(cmDoc.lineCount(), 0);
	}
}
function updatePreview() {
	var previewFrame = document.getElementById('iframe'),
		preview = previewFrame.contentDocument || previewFrame.contentWindow.document,
		head_style = "<head><style>" + $("#css").val() + "</style></head>",
		body_script = "<body>" + $("#htmlmixed").val() + "</body>" + '<script type="text/javascript">' + $("#javascript").val() + '</script>';
	preview.open();
	frameConsole.init();
	preview.write(head_style + body_script);
	preview.close();
}
function single(fn, context) {
	var result;
	return function () {
		if (fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}
		return result;
	};
}
/* prepare for preview */
var searchBar = $("<form>", {
	"class": "cm-edit-toolbar_form",
	append: $("<div>", {
		"class": "group_search",
		append: $("<input>", {
			"class": "group_input",
			"type": "search"
		}).add("<a>", {
			"class": "group_btn",
			"data-action": "search",
			append: $("<i>", {
				"class": "material-icons",
				"text": "search"
			})
		})
	})
});
var editorBar = $("<ul>", {
	"class": "group group-max-width",
	append: $("<li>", {
		"class": "group",
		"data-action": "search",
		append: $("<a>", {
			"class": "group_btn group_btn-max-width",
			"data-action": "search",
			append: $("<i>", {
				"class": "material-icons",
				"text": "search"
			})
		})
	}).add("<li>", {
		"class": "group",
		append: $("<a>", {
			"class": "group_btn group_btn-max-width",
			"data-action": "format",
			append: $("<i>", {
				"class": "material-icons",
				"text": "code"
			})
		})
	}).add("<li>", {
		"class": "group",
		append: $("<a>", {
			"class": "group_btn group_btn-max-width",
			"data-action": "undo",
			append: $("<i>", {
				"class": "material-icons",
				"text": "undo"
			})
		})
	}).add("<li>", {
		"class": "group",
		append: $("<a>", {
			"class": "group_btn group_btn-max-width",
			"data-action": "redo",
			append: $("<i>", {
				"class": "material-icons",
				"text": "redo"
			})
		})
	})
});
/**
 *   for (var i = 0; i < this.length; i++) {
 *  			try {
 *  				for (var key in options) {
 *  					if (CodeMirror.hasOwnProperty(key) && options[key] !== key) {
 *  						options[key] = options[key]
 *
 *  					} else {
 *  						 // toString or something else
 *  					}
 *  					db.setStorage(this[i], options);
 *  				}
 *
 *  			} catch (error) {
 *
 *
 *
 *
 *
 *
 *
 *  			}
 *  		}
 *  		for (var key in options) {
 *  	if (CodeMirror.hasOwnProperty(key) && options[key] !== key) {
 *  		options[key] = options[key]
 *
 *  	}
 *  }
 *  for (var key in config) {
 *  	if (CodeMirror.hasOwnProperty(key) && config[key] !== key) {
 *  		config[key] = config[key]
 *
 *  	}
 *  }
 **/