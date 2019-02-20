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
		if (splitEditors) {
			splitEditors.destroy();
		}
		splitEditors = Split(['#editor-0', '#editor-1', '#editor-2'], {
			direction: direction,
			gutterSize: 1,
			minSize: s,
			gutter: function (index, direction) {
				var gutter = document.createElement('a')
				gutter.className = 'gutter gutter-' + direction
				gutter.style.height = '100%'
				return gutter
			},
			elementStyle: function (dimension, size, gutterSize) {
				if (direction == "vertical") {
					return {
						"height": 'calc(' + size + '% - ' + gutterSize + 'em)',
					}
				}
				if (direction == "horizontal") {
					return {
						"width": 'calc(' + size + '% - ' + gutterSize + 'em)',
					}
				}
			},
			gutterStyle: function (dimension, gutterSize) {
				if (direction == "vertical") {
					return {
						"height": gutterSize + 'em',
					}
				}
				if (direction == "horizontal") {
					return {
						"width": gutterSize + 'em',
					}
				}
			},
			onDragStart: function (dimension, size, gutterSize) {
				console.log('splitEditors.getSizes(): ', splitEditors.getSizes());
			},
			onDragEnd: function () {
				console.log('splitEditors.getSizes(): ', splitEditors.getSizes());
			}
		});
	}
	previewSplit(direction, s) {
		if (splitPreview) {
			splitPreview.destroy();
		}
		splitPreview = Split(['#editors', '#preview'], {
			direction: direction,
			minSize: s,
			gutter: function (index, direction) {
				var gutter = document.createElement('a')
				gutter.className = 'gutter gutter-' + direction
				gutter.style.height = '100%'
				return gutter
			},
			gutterSize: 1,
			elementStyle: function (dimension, size, gutterSize) {
				if (direction == "vertical") {
					return {
						"height": 'calc(' + size + '% - ' + gutterSize + 'em)',
					}
				}
				if (direction == "horizontal") {
					return {
						"width": 'calc(' + size + '% - ' + gutterSize + 'em)',
					}
				}
			},
			gutterStyle: function (dimension, gutterSize) {
				if (direction == "vertical") {
					return {
						"height": gutterSize + 'em',
					}
				}
				if (direction == "horizontal") {
					return {
						"width": gutterSize + 'em',
					}
				}
			},
		});
	}
}
class UI extends SplitView {
	constructor() {
		super();
		this._direction;
	}
	/* modal */
	openModal(el) {
		var view = el.attr('data-view');
		$overlay.fadeIn(150);
		$wrapper.addClass("wrapper-blur");
		setTimeout(function () {
			$modal.removeClass('closed').fadeIn(300).find('.fronty_modal_content').load('views/' + view + '.html ');
		}, 300);
	}
	closeModal() {
		$modal.fadeOut(150);
		setTimeout(function () {
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
	changeLayout(layout) {
		var layoutOLD;
		if (layout == "vertical") {
			layoutOLD = "horizontal";
		} else if (layout == "horizontal") {
			layoutOLD = "vertical";
		}
		this.init(layout);
		$wrapper.removeClass("fronty_wrapper-" + layoutOLD);
		$wrapper.attr("data-layout", layout);
		$wrapper.addClass("fronty_wrapper-" + layout);
		return true
	}
	fadeIn(elements) {
		/* elements - is array */
		$(elements).each(function (index, element) {
			$(element).removeClass("fadeOut");
			$(element).addClass("fadeIn");
		});
	}
	fadeOut(elements) {
		/* elements - is array */
		$(elements).each(function (index, element) {
			$(element).removeClass("fadeIn");
			$(element).addClass("fadeOut");
		});
	}
	toggleHidden(elements) {
		/* elements - is array */
		$(elements).each(function (index, element) {
			if (!$(element).hasClass("hidden")) {
				$(element).addClass("hidden");
			} else {
				$(element).removeClass("hidden");
			}
		});
	}
}