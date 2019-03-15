var splitEditors, splitPreview;
class SplitView{
	constructor() {
		this.gutterSize = 16;
		this.dragInterval = 0;
		this.minSize = ($(".fronty_wrapper_block_editor_bar .logo").width()) * 1.1;
	}
	editorSplit(layout) {
		let this_ = this;
		let elements = ['#editor-0', '#editor-1', '#editor-2'];
		splitEditors = Split(elements, {
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
						"height": 'calc(' + $("#wrapper").height() / 100 * size + 'px - ' + gutterSize + 'px)',
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
			onDragEnd: function (dimension, size, gutterSize) {
			}
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
						"flex-basis": 'calc(' + size + '% - ' + gutterSize + 'px)',
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
						"flex-basis": gutterSize + 'px',
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