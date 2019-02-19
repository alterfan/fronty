var $fronty = $(".fronty"),
    $modal = $("#modal"),
    $header = $("#header"),
    $wrapper = $("#wrapper"),
    $footer = $("#footer"),
    $hidden = $("#hidden"),
    $codeMirror = $(".CodeMirror"),
    $overlay = $('#overlay'),
    $editor_controls = $(".editor_controls");
class SplitView {
    constructor() {}
    init(editorsDirection, previewDirection) {
        Split(['#editor-0', '#editor-1', '#editor-2'], {
            direction: editorsDirection,
            gutterSize: 16,
            elementStyle: function(dimension, size, gutterSize) {
                return {
                    'width': 'calc(' + size + '% - ' + gutterSize + 'px)',
                }
            },
            gutterStyle: function(dimension, gutterSize) {
                return {
                    'width': gutterSize + 'px',
                }
            },
            onDragStart: function(dimension, size, gutterSize) { $(".fronty_wrapper_block_editor max").width("100%").removeClass("max") }
        });
        Split(['#editors', '#preview'], {
            direction: previewDirection,
            gutterSize: 16,
            elementStyle: function(dimension, size, gutterSize) {
                return {
                    'height': 'calc(' + size + '% - ' + gutterSize + 'px)',
                }
            },
            gutterStyle: function(dimension, gutterSize) {
                return {
                    'height': gutterSize + 'px',
                }
            },
        });
    }
}
var split = new SplitView();
$(document).ready(function() {
    var ui = new UI();
    if (cm.init() && ui) {
        $(".logo").width($(".CodeMirror-gutters").width());
        split.init("horizontal", "vertical");
        ui.renderElem(".editor_controls");
        setTimeout(function() {
            $header.removeClass("hidden");
            $footer.removeClass("hidden");
            setTimeout(function() {
                $wrapper.removeClass("hidden");
            }, 500)
        }, 500)
	}
	/* события кнопок */
	$(document).on('click', '[data-target="modal"]', function() {
		ui.modalToggle($(this))
	});
	$(document).on('click', '[data-target="wrapper"]', function() {
		setLayout($(this))
	});
});