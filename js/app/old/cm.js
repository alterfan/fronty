var $fronty = $(".fronty"),
	$modal = $("#modal"),
	$header = $("#header"),
	$wrapper = $("#wrapper"),
	$footer = $("#footer"),
	$hidden = $("#hidden"),
	$codeMirror = $(".CodeMirror"),
	$overlay = $('#overlay'),
	$editors = $('#editors'),
	$editor_controls = $(".editor_controls");
var options = {};
options.defaults = {
	theme: 'fronty',
	inputStyle: "contenteditable",
	addModeClass: true,
	matchBrackets: true,
	cursorHeight: 1,
	styleActiveLine: false,
	autoCloseBrackets: true,
	lineNumbers: true,
	lineWrapping: true,
	lineSeparator: 90,
	autoCloseTags: true,
	matchBrackets: true,
	showCursorWhenSelecting: true,
	scrollbarStyle: 'simple',
	matchTags: true,
	foldGutter: true,
	gutters: ['CodeMirror-foldgutter', 'CodeMirror-linenumbers'],
	matchTags: {
		bothTags: true
	},
	extraKeys: {
		'Ctrl-Q': 'toMatchingTag',
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
	},
};
var config = {};
config.defaults = {
	delay: '500',
	fontSize: '16px',
	fontFamily: 'Consolas',
	layout: 'horizontal',
	direction: "default"
};
var project = {};
project.data = {
	id: '',
	html: '',
	css: '',
	js: '',
	csslibs: '',
	jslibs: '',
	name: '',
	lastupdate: '',
};
project.defaults = {
	id: '1',
	html: '<h1>test 1</h1>',
	css: 'h1{color:blue}',
	js: 'console.log("test 1")',
	csslibs: '',
	jslibs: '',
	name: 'test 1',
	lastupdate: '1.1.2019',
};
var _cm = {},
	cm,
	cm_ = [],
	delay, htmlmixed, css, javascript_;
var db = new StorageDB()
class Cm {
	constructor() {
		for (var key in options.defaults) {
			try {
				options.user = db.getStorageItem("FrontyAutoSave", key)
			} catch (error) {
				error = error, ">>>This option was changed - ", key, options.defaults[key]
				throw error;
			}
			if (!options.user && options.user == null && options.user == undefined) {
				db.setStorage("FrontyUserOptions", options.defaults);
				console.log("This option was changed - ", options.defaults)
			}
			if (!options.user && options.user == null && options.user == undefined) {
				db.setStorage("FrontyUserOptions", options.defaults);
				console.log("This option was changed - ", options.defaults)
			}
		}
		this.fuo = db.getStorage("FrontyUserOptions");
		this.fuс = db.getStorage("FrontyUserConfig");
		this.fas = db.getStorage("FrontyAutoSave");
		this._autoupdate = true;
		this.cm = cm = $('.CodeMirror-focused');
		this.fontSize;
		this.fontFamily;
		this.layout;
	}
	init() {
		var t = this;
		$('.code').each(function (index) {
			if (index == 0) {
				$(this).attr('id', "htmlmixed");
				$(this).val(t.fas.html); //get autosaved
				cm_ = CodeMirror.fromTextArea($("#htmlmixed").get(0), t.fuo);
				/* 				push(_html) */
				cm_.setOption("mode", "htmlmixed"); //set mode
			}
			if (index == 1) {
				$(this).attr('id', "css");
				$(this).val(t.fas.css); //get autosaved
				cm_ = CodeMirror.fromTextArea($('#css').get(0), t.fuo);
				/* 			push(_css) */
				cm_.setOption("mode", "css"); //set mode
			}
			if (index == 2) {
				$(this).attr('id', "javascript");
				$(this).val(t.fas.js); //get autosaved
				cm_ = CodeMirror.fromTextArea($('#javascript').get(0), t.fuo);
				cm_.setOption("mode", "javascript"); //set mode
			}
			/* 		$.each(_cm, function (indexInArray, valueOfElement) {
						_cm[indexInArray].setBreakpoint = function (line) {
							_cm[indexInArray].setMarker(line, marker);
						};
						_cm[indexInArray].unsetBreakpoint = function (line) {
							_cm[indexInArray].clearMarker(line);
						};
					}); */
		});
		t._focus()
		t._change()
		t.eventsListner()
		this.changeTheme("fronty");
		this.changeFontSize(this.fuс.fontSize);
		this.changeFontFamily(this.fuс.fontFamily);
		return true
	}
	changeTheme(val) {
		/* добавить сохранение в локал */
		/*         $('#' + storage.getKey("local", editorOptions, 'theme')).remove();
		 */
		$('head').append('<link rel="stylesheet" type="text/css" href="./codemirror/theme/' + val + '.css">');
		/* добавить сохранение в локал */
		cm.each(function (index, el) {
			this.cm[index].CodeMirror.setOption("theme", val);
		});
	}
	changeFontSize(val) {
		this.cm.css("font-size", val);
		this.fuс["fontSize"] = val;
		localStorage.setItem("FrontyUserConfig", JSON.stringify(this.fuс))
	}
	changeFontFamily(val) {
		this.cm.css("font-family", val);
		this.fuс["fontFamily"] = val;
		localStorage.setItem("FrontyUserConfig", JSON.stringify(this.fuс))
	}
	_focus() {
		cm_.on("focus", function (cm) {
			cm.setOption("styleActiveLine", true)
		});
		cm_.on("blur", function (cm) {
			cm.setOption("styleActiveLine", false)
		});
		cm_.refresh()
	}
	_change() {
		$("#projectName").on("change", function (el) {
			alert($(this).val())
		})
	}
	format(el) {
		var data_type = el.attr('data-type');
		if (data_type == 'html') {
			let _style_html = html_beautify($("#htmlmixed").getDoc().getValue());
			$("#htmlmixed").getDoc().setValue(_style_html);
		}
		if (data_type == 'javascript') {
			let _js_beautify = js_beautify(_cssEditor.getDoc().getValue());
			_cssEditor.getDoc().setValue(_js_beautify);
		}
		if (data_type == 'css') {
			let _css_beautify = css_beautify($("#javascript").getDoc().getValue());
			$("#javascript").getDoc().setValue(_css_beautify);
		}
	}
	redo(el) {
		var editor = el.attr('data-editor');
		$('.CodeMirror')[editor].CodeMirror.redo()
	}
	undo(el) {
		var editor = el.attr('data-editor');
		$('.CodeMirror')[editor].CodeMirror.undo()
	}
	eventsListner() {
		cm_.on("gutterClick", function (cm, line, gutter) {
			if (gutter === 'CodeMirror-linenumbers') {
				return cm.setSelection(CodeMirror.Pos(line, 0), CodeMirror.Pos(line + 1, 0));
			}
		});
		cm_.on("focus", function (cm) {
			cm.EditToolbar("top", bar);
		});
		cm_.on("changes", function (cm) {
			cm.getValue()
			console.log('cm.getValue(): ', cm.getValue());
		});
	}
}
function updatePreview() {
	let b = "<body>" + $("#htmlmixed").val() + "</body><script>" + $("#javascript").val() + "</script>";
	var preview = document.getElementById('iframe'),
		_preview = preview.contentDocument || preview.contentWindow.document;
	_preview.srcdoc = b;
	db.setStorage("FrontyAutoSave", $("#htmlmixed").val() + '<script>' + $("#javascript").val() + '</script>')
}
class Toolbar extends UI {
	constructor() {
		// init plugin (with callback)
		$('.clearable').clearSearch({
			callback: function () {
				console.log("cleared");
			}
		});
		// change width
		$('.clearable').width('100%');
	}
}
function bodyCode(htmlCode, jsCode) {
	return "<body>" + htmlCode + "</body><script>" + jsCode + "</script>";
};
/* prepare for preview */
function stylesheetsLibrary(cssLibs, cssStyle) {
	let cssLibsArr = cssLibs.split(',');
	let cssLibsArrCode = [];
	$.each(cssLibsArr, function (indexInArray, valueOfElement) {
		cssLibsArrCode.push('<link rel="stylesheet" type="text/css" href="' + valueOfElement + '">');
	})
	return cssLibsArrCode.join('') + "<style>" + cssStyle + "</style>";
};
function scriptsLibrary(jsLibs) {
	let jsLibsArr = jsLibs.split(',');
	let jsLibsArrCode = [];
	$.each(jsLibsArr, function (indexInArray, valueOfElement) {
		jsLibsArrCode.push('<script type="text/javascript" src="' + valueOfElement + '"></script>');
	});
	return jsLibsArrCode.join('');
};
var bar = $("<form>", {
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
/*
var sel_top = document.getElementById("buffers_top");
CodeMirror.on(sel_top, "change", function() {
  selectBuffer(ed_top, sel_top.options[sel_top.selectedIndex].value);
});
var sel_bot = document.getElementById("buffers_bot");
CodeMirror.on(sel_bot, "change", function() {
  selectBuffer(ed_bot, sel_bot.options[sel_bot.selectedIndex].value);
});
var buffers = {};
function openBuffer(name, text, mode) {
  buffers[name] = CodeMirror.Doc(text, mode);
  var opt = document.createElement("option");
  opt.appendChild(document.createTextNode(name));
  sel_top.appendChild(opt);
  sel_bot.appendChild(opt.cloneNode(true));
}
function newBuf(where) {
  var name = prompt("Name for the buffer", "*scratch*");
  if (name == null) return;
  if (buffers.hasOwnProperty(name)) {
    alert("There's already a buffer by that name.");
    return;
  }
  openBuffer(name, "", "javascript");
  selectBuffer(where == "top" ? ed_top : ed_bot, name);
  var sel = where == "top" ? sel_top : sel_bot;
  sel.value = name;
}
function selectBuffer(editor, name) {
  var buf = buffers[name];
  if (buf.getEditor()) buf = buf.linkedDoc({sharedHist: true});
  var old = editor.swapDoc(buf);
  var linked = old.iterLinkedDocs(function(doc) {linked = doc;});
  if (linked) {
    // Make sure the document in buffers is the one the other view is looking at
    for (var name in buffers) if (buffers[name] == old) buffers[name] = linked;
    old.unlinkDoc(linked);
  }
  editor.focus();
}
*/
/* openBuffer("js", nodeContent("script"), "javascript");
openBuffer("css", nodeContent("style"), "css");
var ed_top = CodeMirror(document.getElementById("code_top"), {lineNumbers: true});
selectBuffer(ed_top, "js");
var ed_bot = CodeMirror(document.getElementById("code_bot"), {lineNumbers: true});
selectBuffer(ed_bot, "js"); */