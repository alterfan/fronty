var cm, cmDoc, cmEditor, _html, _css, _js;
var db = new StorageDB()
class Cm {
	constructor() {
		/**
		 *   for (var i = 0; i < localDB.length; i++) {
		 *  			try {
		 *  				for (var key in options.defaults) {
		 *  					if (CodeMirror.defaults.hasOwnProperty(key) && options.defaults[key] !== key) {
		 *  						options.defaults[key] = options.defaults[key]
		 *  						console.log(k + ' ' + CodeMirror.defaults[k]);
		 *  					} else {
		 *  						console.log(name); // toString or something else
		 *  					}
		 *  					db.setStorage(localDB[i], options.defaults);
		 *  				}
		 *  				console.log(localDB[i], "|||", ls[localDB[i]]);
		 *  			} catch (error) {
		 *  				for (var i = 0; i < localDB.length; i++) {
		 *  					if (localDB[i] == "options") {
		 *  						db.setStorage(localDB[i], options.defaults);
		 *  					}
		 *  					if (localDB[i] == "configuration") {
		 *  						db.setStorage(localDB[i], config.defaults);
		 *  					}
		 *  					if (localDB[i] == "autosaved") {
		 *  						db.setStorage(localDB[i], project.defaults);
		 *  					}
		 *  				}
		 *  				console.log(localDB[i], "|||", "set default");
		 *  			}
		 *  		}
		 *  		for (var key in options.defaults) {
		 *  	if (CodeMirror.defaults.hasOwnProperty(key) && options.defaults[key] !== key) {
		 *  		options.defaults[key] = options.defaults[key]
		 *  		console.log(key + ' ' + CodeMirror.defaults[key]);
		 *  	}
		 *  }
		 *  for (var key in config.defaults) {
		 *  	if (CodeMirror.defaults.hasOwnProperty(key) && config.defaults[key] !== key) {
		 *  		config.defaults[key] = config.defaults[key]
		 *  		console.log(key + ' ' + config.defaults[key]);
		 *  	}
		 *  }
		 **/
		this.options = db.getStorage("options");
		this.configuration = db.getStorage("configuration");
		this.fas = db.getStorage("autosaved");
		this._autoupdate = true;
		this.cm;
		this.fontSize;
		this.fontFamily;
		this.layout;
		this.theme = db.getStorageItem("options", 'theme')
		this.fontSize = db.getStorageItem("configuration", 'fontSize')
		this.fontFamily = db.getStorageItem("configuration", 'fontFamily')
	}
	init() {
		var t = this;
		$('.code').each(function (index) {
			var mode = $(this).attr('id');
			$(this).val(t.fas[index]); //get autosaved
			cm = CodeMirror.fromTextArea($("#" + mode).get(0), t.options);
			cm.setOption("mode", mode); //set mode
			t.eventsListner(cm)
		});
		t.changeTheme(t.theme);
		t.changeFontSize(t.fontSize);
		t.changeFontFamily(t.fontFamily);
		setTimeout(function () {
			updatePreview()
		}, 300);
		return true
	}
	changeTheme(val) {
		$('head').append('<link rel="stylesheet" type="text/css" href="./codemirror/theme/' + val + '.css">');
		$('.CodeMirror').each(function (index) {
			$('.CodeMirror')[index].CodeMirror.setOption("theme", val);
		});
		if (db.setStorageItem("options", 'theme', val)) {
			console.log('theme changed: ', val);
			cm.refresh();
		}
	}
	changeFontSize(val) {
		$('.CodeMirror').css("font-size", val);
		if (db.setStorageItem("configuration", 'fontSize', val)) {
			alert('fontSize: ' + val);
			cm.refresh();
		}
	}
	changeFontFamily(val) {
		$(".СodeMirror").css("font-family", val);
		if (db.setStorageItem("configuration", 'fontFamily', val)) {
			console.log('fontFamily: ', val);
			cm.refresh();
		}
	}
	eventsListner(cm) {
		let this_ = this;
		cm.on("gutterClick", function (cm, line, gutter) {
			if (gutter === 'CodeMirror-linenumbers') {
				return cm.setSelection(CodeMirror.Pos(line, 0), CodeMirror.Pos(line + 1, 0));
			}
		});
		cm.on("focus", function (cm) {
			cm.EditToolbar("top", editorBar);
			cmDoc = cm.getDoc();
			cmEditor = cmDoc.getEditor()
		});
		cm.on("click", function (cm) {
			cm.setOption("styleActiveLine", true);
		});
		cm.on("blur", function (cm) {
			cm.setOption("styleActiveLine", false);
		});
		cm.on("changes", function (cm) {
			if (this_._autoupdate == true) {
				setTimeout(function () {
					updatePreview()
				}, 300);
				cm.save();
				db.setStorage("autosaved", [$("#htmlmixed").val(), $("#css").val(), $("#javascript").val()]);
				cm.refresh();
			}
		})
		cm.on("resize", function (cm) {
			cm.refresh();
		});
	}
	format() {
		let mode = cmEditor.getOption('mode');
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
		cmEditor.execCommand("goDocEnd")
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
})