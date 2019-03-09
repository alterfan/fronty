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
	addModeClass: true,
	matchBrackets: true,
	cursorHeight: 1,
	styleActiveLine: false,
	autoCloseBrackets: true,
	lineNumbers: true,
	lineWrapping: true,
	autoCloseTags: true,
	matchBrackets: true,
	matchTags: true,
	foldGutter: true,
	showInvisibles: true,
	maxInvisibles: 8, // optional
	showTrailingSpace: true
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
};	console.time("Execution time took");
$(document).ready(function () {
	var ui = new UI();
	var cm = new Cm();
	// Some code to execute
	if (cm.init() && ui.init()) {
		$wrapper.addClass("fadeout");
	}
	$(window).on('resize', function () {
		ui.updateFrameResolution();
	});
	$(document).on('click', '[data-target="modal"]', function () {
		ui.modalToggle($(this));
	});
	$(document).on('click', '[data-target="layout"]', function () {
		ui.changeLayout($(this).attr("data-layout"), $(this).attr("data-reverse"))
	});
	$(document).on('click', '[data-target="editor"]', function (e) {
		ui.maximize($(this));
	});
	$(document).on('click', '[data-action="close"]', function (e) {
		$('.' + $(this).attr('data-target')).removeClass('fadeout').addClass("fadein").remove()
	});
	$(document).on('click', '[data-action="toggle"]', function (e) {
		$('.' + $(this).attr('data-target')).toggleClass('closed')
	});
	/*=============================================
	=            editor settings            =
	=============================================*/
	$(document).on('click', '[data-action="changeFontSize"]', function (e) {
		cm.changeFontSize($(this).val())
	});
	$(document).on('click', '[data-action="changeFontFamily"]', function (e) {
		cm.changeFontFamily($(this).val())
	});
	$(document).on('click', '[data-action="changeTheme"]', function (e) {
		cm.changeTheme($(this).val())
	});
	/*=============================================
	=            editor action            =
	=============================================*/
	$(document).on('click', '[data-action="format"]', function (e) {
		cm.format();
	});
	$(document).on('click', '[data-action="undo"]', function (e) {
		cmDoc.undo()
	});
	$(document).on('click', '[data-action="redo"]', function (e) {
		cmDoc.redo()
	});
});
console.timeEnd("Execution time took");