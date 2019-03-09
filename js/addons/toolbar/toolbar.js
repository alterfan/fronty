(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("codemirror"))
	else if (typeof define == "function" && define.amd) // AMD
		define(["codemirror"], mod)
	else // Plain browser env
		mod(CodeMirror)
})((CodeMirror) => {
	function cmBarOpen(cm, position, toolbar) {
		if (typeof toolbar == 'string') {
			bar = $('<div>', {
				"id": "cm-edit-toolbar",
				"class": "cm-edit-toolbar",
				"append": toolbar
			})
		} else {
			bar = $('<div>', {
				"id": "cm-edit-toolbar",
				"class": "cm-edit-toolbar",
				"append": toolbar
			})
		}
		var workspace = cm.getWrapperElement(),
			workspaceID = cm.getOption("mode");
		if (cm.hasFocus() && $("#cm-edit-toolbar") !== undefined) {
			if (position == "top") {
				bar.attr('data-target', workspaceID).insertBefore(workspace)
				$('.cm-edit-toolbar').animate({
					opacity: 1,
					top: "0%"
				}, 300);
				cm.refresh();
				cm.focus()
			} else{
				cmBarClose($("#cm-edit-toolbar"))
				cm.blur()
			}
		}
	}
	function cmBarClose() {
		$(".cm-edit-toolbar").animate({
			opacity: 0,
			top: "-100%"
		}, 300);
		cm.refresh()
	}
	CodeMirror.defineExtension('EditToolbar', function (position, toolbar) {
		var cm = this
		cmBarOpen(cm, position, toolbar)
	})
})