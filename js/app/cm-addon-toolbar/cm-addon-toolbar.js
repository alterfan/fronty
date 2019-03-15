var activeInstance = null,
    isActive = false;
(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("codemirror"))
    else if (typeof define == "function" && define.amd) // AMD
        define(["codemirror"], mod)
    else // Plain browser env
        mod(CodeMirror)
})((CodeMirror) => {
    function createPanel(cm, toolbar) {
        el = $('<div>', {
            "id": "cm-edit-toolbar",
            "class": "cm-edit-toolbar",
            "html": toolbar
        })
        if (activeInstance != cm.getWrapperElement()) {
			closePanel(cm);
			el.insertBefore(cm.getWrapperElement()).animate({
                top: 0
            }, 200);
        }
        isActive = true;
        cm.refresh()
    }
    let closePanel = (cm) => {
        $(".cm-edit-toolbar").animate({
            top: "-100%"
        }, 200)
    }
    CodeMirror.defineExtension('cmToolbar', function(toolbar) {
        var cm = this
        this.on("focus", function() {
            activeInstance = cm.getWrapperElement()
		})
		if (activeInstance != cm.getWrapperElement()) {
			createPanel(this, toolbar)
		}
    })
})