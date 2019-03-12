var $fronty = $(".fronty"),
	$modal = $("#modal"),
	$header = $("#header"),
	$wrapper = $("#wrapper"),
	$footer = $("#footer"),
	$hidden = $("#hidden"),
	$cm = $(".CodeMirror"),
	$overlay = $('#overlay'),
	$editors = $('#editors'),
	$editor_controls = $(".editor_controls");
var options = {};
$.Event;
$.event.fix;
options.defaults = {
	theme: 'fronty',
	extraKeys: {
		"Ctrl-J": "toMatchingTag"
	},
	addModeClass: true,
	cursorHeight: 1,
	styleActiveLine: false,
	autoCloseBrackets: true,
	lineNumbers: true,
	lineWrapping: true,
	autoCloseTags: true,
	foldGutter: true,
	selectionsMayTouch: true,
	showCursorWhenSelecting: true
};
var config = {};
config.defaults = {
	delay: '500',
	fontSize: '14px',
	fontFamily: 'Consolas',
	layout: 'horizontal',
	direction: "default"
};
config.user = {};
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
project.autosaveData = [
	'<h1>test 1</h1>', 'h1{color:blue}', 'console.log("test 1")',
];
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
$(document).ready(function () {
	//	database.deleteDB();
	var target = {
		cm: cm,
		ui: ui,
		modal: modal,
		db: localStorageDB,
		frameConsole: frameConsole
	}
	// Some code to execute
	if (localStorageDB && localDB) {
		if (cm.init() && ui.init()) {
			$wrapper.addClass("fadeout");
		}
	}
	$(window).on('resize', function () {
		ui.updateFrameResolution();
		cm.cm_refresh();
	});
	/* 	$(document).on('click touchstart', '[data-target="modal"]', function () {
			ui.modalToggle($(this));
		});
	$(document).on('click', '[data-target="layout"]', function (e) {
		ui.changeLayout($(this))
	});*/
	$(document).on('click', '[data-target="editor"]', function (e) {
		ui.maximize($(this));
	});
	$(document).on('click', '[action="click"]', function (e) {
		var action = new Function("target", "action", "val", "target[action](val)"),
			t = $(this).attr('data-target'),
			a = $(this).attr('data-action')
		action(target[t], a, $(this))
	});
	$(document).on('change', '[action="change"]', function (e) {
		var action = new Function("target", "action", "val", "target[action](val)")
		action(target[$(this).attr('data-target')], $(this).attr('action')+"_"+$(this).attr('data-action'), $(this).val())
	});
	/*=============================================
	=            editor action            =
	=============================================*/
	$(document).on('click', '[data-action="format"]', function (e) {
		cm.format();
		cmEditor.focus()
	});
	$(document).on('click', '[data-action="undo"]', function (e) {
		cmDoc.undo()
	});
	$(document).on('click', '[data-action="redo"]', function (e) {
		cmDoc.redo()
	});
});