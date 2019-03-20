(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("codemirror"))
	else if (typeof define == "function" && define.amd) // AMD
		define(["codemirror"], mod)
	else // Plain browser env
		mod(CodeMirror)
})((CodeMirror) => {
	"use strict";
	/*======  Global  ======*/
	let active = null,
		miniMap, miniMapBar, map;
	/*=====  End of Global  ======*/
	class MiniMap {
		constructor(cm, options) {
			this.map;
			this.ratio;
			this.scrollBar = cm.getScrollerElement();
			this.options = {}
		}
		_displayMiniMap(cm) {
			miniMap = document.createElement("div");
			miniMap.className = "miniMap"
			miniMapBar = document.createElement("div");
			miniMapBar.className = "miniMapBar";
			var scrollBarParent = this.scrollBar.parentNode;
			var scrollBarSibling = this.scrollBar.nextSibling;
			scrollBarParent.insertBefore(miniMap, scrollBarSibling);
			scrollBarParent.insertBefore(miniMapBar, scrollBarSibling);
			map = CodeMirror(miniMap, {
				inputStyle: "contenteditable",
				value: cm.getValue(),
				mode: cm.getOption('mode'),
				theme: cm.getOption('theme'),
				readOnly: true,
				scrollbarStyle: null
			})
			if (map) setTimeout(this.styles(cm), 1)
		}
		styles(cm) {
			miniMap.style.maxHeight = cm.getScrollInfo().clientHeight;
			map.refresh();
			setTimeout(() => {
				miniMapBar.style.height = map.getScrollInfo().height * parseInt(window.getComputedStyle(miniMap).maxHeight) / cm.getScrollInfo().height;
				console.log(parseInt(window.getComputedStyle(miniMap).maxHeight), map.getScrollInfo().height)
			}, 500)
			map.refresh()
		}
		_destroyMiniMap(cm) {
			if (miniMap != undefined) {
				miniMap.remove()
				miniMapBar.remove()
			}
			cm.focus()
		}
		_events(cm) {
			var _this = this;
			cm.on("scroll", function (cm) {
				_this._scrolling(miniMapBar, miniMap, _this.scrollBar, cm)
			});
		}
		_scrolling(miniMapBar, miniMap, scrollbar, cm) {
			var ratio = map.getScrollInfo().height - parseInt(window.getComputedStyle(miniMap).maxHeight);
			let scrolling = scrollbar.scrollTop;
			var max = parseInt(miniMapBar.style.top) + parseInt(miniMapBar.style.height) + 1;
			if (map.getScrollInfo().height > cm.getScrollInfo().clientHeight) {
				miniMapBar.style.top = scrolling * cm.getScrollInfo().clientHeight / cm.getScrollInfo().height;
			} else {
				miniMapBar.style.top = scrolling * parseInt(window.getComputedStyle(miniMap).height) / cm.getScrollInfo().height;
			}
			miniMap.scrollTop = scrolling * (ratio / (cm.getScrollInfo().height - cm.getScrollInfo().clientHeight));
		};
	};
	function removeStyle(elem, style) {
		if (elem.children.length > 0) {
			for (var i = 0; i < elem.children.length; i++)
				removeStyle(elem.children[i], style);
		}
		elem.style.removeProperty(style);
	}
	CodeMirror.defineExtension('miniMap', function (options) {
		var cm = this;
		var minimap = new MiniMap(cm, options)
		cm.on("change", function (cm) {
			map.setValue(cm.getValue())
		})
		if (active != cm) {
			active = cm
			minimap._destroyMiniMap(cm);
		}
		minimap._displayMiniMap(cm);
		minimap._events(cm);
	})
})