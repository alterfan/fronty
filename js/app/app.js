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
var _DB = new LocalDB()
$(document).ready(function () {
	var modal=new Modal()
	if (_DB.isReady) {
		var cm = new CmEditor()
		if (cm.render) {
			$wrapper.addClass("fadeout");
		}
		$(window).on('resize', function () {
			cm.updateFrameResolution();
			cm.cm_refresh();
		});
		var target = {
			cm: cm,
			modal: modal,
			db: _DB,
			ui: cm,
			frameConsole: frameConsole
		}
		/*----------  el click  ----------*/
		$(document).on('click', '[action="click"]', function (el) {
			var action = new Function("target", "action", "val", "target[action](val)"),
				t = $(this).attr('data-target'),
				a = $(this).attr('data-action');
			console.log(t, $(this).attr('data-target'))
			action(target[t], a, $(this))
		});
		$(document).on('change', '[action="change"]', function (e) {
			var action = new Function("target", "action", "val", "target[action](val)")
			action(target[$(this).attr('data-target')], $(this).attr('action') + "_" + $(this).attr('data-action'), $(this).val())
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
	}
})