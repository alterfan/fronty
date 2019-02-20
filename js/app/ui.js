class UI {
    constructor() {
            this._direction;
        }
        /* modal */
    openModal(el) {
        var view = el.attr('data-view');
        $overlay.fadeIn(150);
        $wrapper.addClass("wrapper-blur");
        setTimeout(function() {
            $modal.removeClass('closed').fadeIn(300).find('.fronty_modal_content').load('views/' + view + '.html ');
        }, 300);
    }
    closeModal() {
        $modal.fadeOut(150);
        setTimeout(function() {
            $overlay.fadeOut(150);
            $wrapper.removeClass("wrapper-blur");
            $modal.addClass('closed').find('.fronty_modal_content').html("");
        }, 300)
    }
    modalToggle(el) {
        if ($modal.hasClass('closed')) {
            this.openModal(el);
        }
        if (!$modal.hasClass('closed')) {
            this.closeModal(el);
        }
    }
    rotate(el, deg) {
        el.css("transform", "rotate(" + deg + "deg)")
    }
    maximize(el) {
        var _this = this;
        var editorIndex = el.attr("data-editor"),
            editorID = $("#editor-" + editorIndex),
            editorsSizesMin = [0, 0, 0],
            editorsSizesDefault = [100 / 3, 100 / 3, 100 / 3];
        if (!editorID.hasClass('maximized')) {
            editorID.addClass('maximized');
            editorsSizesMin[editorIndex] = 100;
            splitEditors.setSizes(editorsSizesMin);
            _this.rotate(el.find("i"), 180)
        } else {
            editorID.removeClass('maximized');
            splitEditors.setSizes(editorsSizesDefault);
            _this.rotate(el.find("i"), 0);
        }
    }
}
var splitEditors, splitPreview;
class SplitView {
    constructor() {}
    init(direction) {
        if (direction == "vertical") {
            this.editorSplit(direction, 24)
            this.previewSplit("horizontal", $(".CodeMirror-gutters").width())
        } else if (direction == "horizontal") {
            this.previewSplit("vertical", 24);
            this.editorSplit(direction, $(".CodeMirror-gutters").width())
        }
    }
    editorSplit(direction, s) {
		if(splitEditors){
			splitEditors.destroy();
		}
        splitEditors = Split(['#editor-0', '#editor-1', '#editor-2'], {
            direction: direction,
            gutterSize: 16,
            minSize: s,
            gutter: function(index, direction) {
                var gutter = document.createElement('a')
                gutter.className = 'gutter gutter-' + direction
                gutter.style.height = '100%'
                return gutter
            },
            elementStyle: function(dimension, size, gutterSize) {
                if (direction == "vertical") {
                    return {
                        "height": 'calc(' + size + '% - ' + gutterSize + 'px)',
                    }
                }
                if (direction == "horizontal") {
                    return {
                        "width": 'calc(' + size + '% - ' + gutterSize + 'px)',
                    }
                }
            },
            gutterStyle: function(dimension, gutterSize) {
                if (direction == "vertical") {
                    return {
                        "height": gutterSize + 'px',
                    }
                }
                if (direction == "horizontal") {
                    return {
                        "width": gutterSize + 'px',
                    }
                }
            },
            onDragStart: function(dimension, size, gutterSize) {
                console.log('splitEditors.getSizes(): ', splitEditors.getSizes());
            },
            onDragEnd: function() {
                console.log('splitEditors.getSizes(): ', splitEditors.getSizes());
            }
        });
    }
    previewSplit(direction, s) {
		if(splitPreview){
			splitPreview.destroy();
		}
        splitPreview = Split(['#editors', '#preview'], {
            direction: direction,
            minSize: s,
            gutter: function(index, direction) {
                var gutter = document.createElement('a')
                gutter.className = 'gutter gutter-' + direction
                gutter.style.height = '100%'
                return gutter
            },
            gutterSize: 16,
            elementStyle: function(dimension, size, gutterSize) {
                if (direction == "vertical") {
                    return {
                        "height": 'calc(' + size + '% - ' + gutterSize + 'px)',
                    }
                }
                if (direction == "horizontal") {
                    return {
                        "width": 'calc(' + size + '% - ' + gutterSize + 'px)',
                    }
                }
            },
            gutterStyle: function(dimension, gutterSize) {
                if (direction == "vertical") {
                    return {
                        "height": gutterSize + 'px',
                    }
                }
                if (direction == "horizontal") {
                    return {
                        "width": gutterSize + 'px',
                    }
                }
            },
        });
    }
}
var split = new SplitView();
/* var splitVertical = {
    sizes: [32, 32, 32],
    gutterSize: 2,
    direction: 'vetical',
    elementStyle: function(dimension, size, gutterSize) {
        return {
            'flex-basis': 'calc(' + size + '% - ' + gutterSize + '%)',
        }
    },
    gutterStyle: function(dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + '%',
        }
    },
};
var splitHorizontal = {
    gutterSize: 0.5,
    direction: 'horizontal',
    elementStyle: function(dimension, size, gutterSize) {
        return {
            'width': 'calc(' + size + '% - ' + gutterSize + 'em)',
        }
    },
    gutterStyle: function(dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'em',
        }
    },
};
// Split and Layout
var split;
function setLayout(el) {
    var layout = el.attr("layout-direction");
    if (toggle) {
        if (layout == 'horizontal') {
            layout = 'vertical';
        } else {
            layout = 'horizontal';
        }
    }
    if (split) {
        split.destroy();
        split = null;
    }
    split = Split(["#editor", "#preview"], {
        minSize: 200,
        direction: layout,
        onDrag: function() {},
        onDragEnd: function(cm) {
            cm.refresh();
        }
    });
    if (layout == 'horizontal') {
        document.getElementById("panel").classList.remove("vertical");
        document.getElementById("panel").classList.add("horizontal");
        localStorage.setItem("layout", "horizontal");
    } else {
        document.getElementById("panel").classList.remove("horizontal");
        document.getElementById("panel").classList.add("vertical");
        localStorage.setItem("layout", "vertical");
    }
    config.layout = !config.layout;
    window.editor.setSize();
} */
/* Изменение Макета  */
function changeLayout(layout) {
    var layoutOLD;
    if (layout == "vertical") {
        layoutOLD = "horizontal";
    } else if (layout  == "horizontal") {
        layoutOLD = "vertical";
	}
	split.init(layout);
    $wrapper.removeClass("fronty_wrapper-" + layoutOLD);
    $wrapper.attr("data-layout", layout);
    $wrapper.addClass("fronty_wrapper-" + layout);
}