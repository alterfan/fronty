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
$(document).ready(function () {
	var ui = new UI();
	var cm = new Cm();
	if (cm.init() && ui) {
			if (ui.changeLayout(JSON.parse(localStorage.getItem("FrontyUserConfig"))["layout"])===true) {
				ui.toggleHidden([$header, $wrapper, $footer])
			}
	}
	$(document).on('click', '[data-target="modal"]', function () {
		ui.modalToggle($(this));
	});
	$(document).on('click', '[data-target="layout"]', function () {
		ui.fadeOut($wrapper);
		ui.changeLayout($(this).attr("data-layout"));
		ui.fadeIn($wrapper)
	});
	$(document).on('click', '[data-target="editor"]', function (e) {
		ui.maximize($(this));
	});
	$(window).on("resize", function () {
		ui.init($wrapper.attr("layout"));
	});
});