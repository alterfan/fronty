var splitEditors, splitPreview;
class SplitView {
	constructor() {
		this.gutterSize = 16;
		this.dragInterval = 0;
		this.minSize = ($(".fronty_wrapper_block_editor_bar .logo").height()) * 1.1;
	}
	editorSplit(layout) {
		let this_ = this;
		splitEditors = Split(['#editor-0', '#editor-1', '#editor-2'], {
			direction: layout,
			gutterSize: this_.gutterSize,
			minSize: this.minSize,
			dragInterval: this.dragInterval,
			gutter: function (index, direction) {
				var gutter = document.createElement('a')
				gutter.className = 'gutter gutter-' + direction
				return gutter
			},
			elementStyle: function (dimension, size, gutterSize) {
				if (layout == "vertical") {
					return {
						"height": 'calc(' + size + '% - ' + gutterSize + 'px)',
					}
				}
				if (layout == "horizontal") {
					return {
						"width": 'calc(' + size + '% - ' + gutterSize + 'px)',
					}
				}
			},
			gutterStyle: function (dimension, gutterSize) {
				if (layout == "vertical") {
					return {
						"height": gutterSize + 'px',
					}
				}
				if (layout == "horizontal") {
					return {
						"width": gutterSize + 'px',
					}
				}
			},
			onDrag: function (dimension, size, gutterSize) {
				this_.updateFrameResolution();
			},
			onDragStart: function (dimension, size, gutterSize) {},
			onDragEnd: function () {}
		});
	}
	previewSplit(layout) {
		let this_ = this;
		splitPreview = Split(["#editors", "#preview"], {
			direction: layout,
			gutterSize: this.gutterSize,
			minSize: this.minSize,
			dragInterval: this.dragInterval,
			snapOffset: 32,
			gutter: function (index, layout) {
				var gutter = document.createElement('a')
				gutter.className = 'gutter gutter-' + layout
				return gutter
			},
			elementStyle: function (dimension, size, gutterSize) {
				if (layout == "vertical") {
					return {
						"height": 'calc(' + size + '% - ' + gutterSize + 'px)',
					}
				}
				if (layout == "horizontal") {
					return {
						"width": 'calc(' + size + '% - ' + gutterSize + 'px)',
					}
				}
			},
			gutterStyle: function (dimension, gutterSize) {
				if (layout == "vertical") {
					return {
						"height": gutterSize + 'px',
					}
				}
				if (layout == "horizontal") {
					return {
						"width": gutterSize + 'px',
					}
				}
			},
			onDrag: function (dimension, size, gutterSize) {
				this_.updateFrameResolution();
			},
			onDragStart: function (dimension) {
				console.log('dimension', dimension);
			},
			onDragEnd: function (dimension) {
				console.log('dimension', dimension);
			}
		});
	}
	initSplit(layout) {
		if (splitEditors || splitPreview) {
			splitEditors.destroy();
			splitPreview.destroy();
		}
		if (layout == "vertical") {
			this.previewSplit("horizontal")
			this.editorSplit("vertical");
		} else {
			this.previewSplit("vertical");
			this.editorSplit("horizontal")
		}
		this.updateFrameResolution();
	}
}
class UI extends SplitView {
	constructor() {
		super();
		this.delay;
		this.direction;
		this.layout;
	}
	init() {
		if (!this.delay || !this.direction || !this.layout) {
			this.delay = config.defaults.delay;
			this.layout = db.getStorageItem("configuration","layout");
			this.direction = config.defaults.direction;
		}
		this.setLayout(this.layout, this.direction)
		this.fadeOut($wrapper)
	}
	setLayout(layout, isreverse) {
		if ($wrapper.removeClass("fronty_wrapper-vertical reverse fronty_wrapper-vertical default")) {
			$wrapper.addClass("fronty_wrapper-" + layout + " " + isreverse);
			$wrapper.attr("data-reverse", isreverse);
			$wrapper.attr("data-layout", layout);
			this.direction = isreverse;
			this.layout = layout;
		}
		db.setStorageItem("configuration", "direction", this.direction);
		db.setStorageItem("configuration", "layout", this.layout);
		this.initSplit(layout)
	}
	changeLayout(layout, reverse) {
		var _this = this;
		_this.fadeIn($wrapper);
		setTimeout(function () {
			_this.setLayout(layout, reverse);
			_this.fadeOut($wrapper);
		}, this.delay)
	}
	/* modal */
	openModal(el) {
		var view = el.attr('data-view');
		$overlay.fadeIn(150);
		setTimeout(function () {
			$modal.removeClass('closed').fadeIn(300).find('.fronty_modal_content').load('views/' + view + '.html ');
		}, 300);
	}
	closeModal() {
		$modal.fadeOut(150);
		setTimeout(function () {
			$overlay.fadeOut(150);
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
	fadeIn(element) {
		element.removeClass("fadeout");
		element.addClass("fadein")
	}
	fadeOut(element) {
		element.removeClass("fadein");
		element.addClass("fadeout");
	}
	updateFrameResolution() {
		$("#iframeWidth").html($('#iframe').width());
		$("#iframeHeight").html($('#iframe').height());
	}
}