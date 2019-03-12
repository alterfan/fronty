var cmFocused, isActive = false;
(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("codemirror"))
	else if (typeof define == "function" && define.amd) // AMD
		define(["codemirror"], mod)
	else // Plain browser env
		mod(CodeMirror)
})((CodeMirror) => {
	function open(cm, toolbar) {
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
		bar.attr('data-target', workspaceID).insertBefore(workspace)
		isActive = true;
	}
	function init(cm, position, toolbar) {
		if (cm.getInputField().id != cmFocused) {
			if (isActive == false) {
				open(cm, toolbar)
				$('.cm-edit-toolbar').animate({
					opacity: 1,
					top: "0%"
				}, 300);
			} else {
				close();
			}
		}
		cm.refresh();
	}
	function close() {
		$("#cm-edit-toolbar").animate({
			opacity: 0,
			top: "-100%"
		}, 300)
		isActive = false
		$("#cm-edit-toolbar").remove()
	}
	CodeMirror.defineExtension('EditToolbar', function (position, toolbar) {
		var cm = this
		close();
		init(cm, position, toolbar)
	})
})