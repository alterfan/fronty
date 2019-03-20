((mod) => {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("codemirror"), require("codemirror-toolbar"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["codemirror", "codemirror-toolbar"], mod);
    else // Plain browser env
        mod(CodeMirror);
})((CodeMirror) => {
    'use strict';
    let active = null,
        panel, wrap;
    let searchBar = $("<form>", {
        "class": "cm-edit-toolbar_form",
        append: $("<div>", {
            "class": "group_search",
            append: $("<input>", {
                "class": "group_input",
                "type": "search"
            }).add("<a>", {
                "class": "group_btn",
                "data-action": "search",
                append: $("<i>", {
                    "class": "material-icons",
                    "text": "search"
                })
            })
        })
    });
    let editorBar = $("<ul>", {
        "class": "group group-max-width",
        append: $("<li>", {
            "class": "group",
            "data-action": "search",
            append: $("<a>", {
                "class": "group_btn group_btn-max-width",
                "data-action": "search",
                append: $("<i>", {
                    "class": "material-icons",
                    "text": "search"
                })
            })
        }).add("<li>", {
            "class": "group",
            append: $("<a>", {
                "class": "group_btn group_btn-max-width",
                "data-action": "format",
                append: $("<i>", {
                    "class": "material-icons",
                    "text": "code"
                })
            })
        }).add("<li>", {
            "class": "group",
            append: $("<a>", {
                "class": "group_btn group_btn-max-width",
                "data-action": "undo",
                append: $("<i>", {
                    "class": "material-icons",
                    "text": "undo"
                })
            })
        }).add("<li>", {
            "class": "group",
            append: $("<a>", {
                "class": "group_btn group_btn-max-width",
                "data-action": "redo",
                append: $("<i>", {
                    "class": "material-icons",
                    "text": "redo"
                })
            })
        })
    });
    var create = (cm, toolbar) => {
        wrap = cm.getWrapperElement();
        panel = $('<div>', {
            "id": "cm-edit-toolbar",
            "class": "cm-edit-toolbar",
            "style": "top:-50%;opacity: 0",
            "html": toolbar
        });
        panel.insertBefore(wrap).animate({
            opacity: 1,
            top: "0%"
        }, 250)
        cm.refresh()
    }
    let close = (cm) => {
        panel.animate({
            opacity: 0,
            top: "-50%"
        }, 200)
        panel.remove()
        cm.focus();
    }
    CodeMirror.defineExtension('openToolbar', function(toolbar) {
        var cm = this
        if (active != cm) {
            active = cm
            if (panel) {
                close(cm)
            }
            setTimeout(create(cm, toolbar), 200)
        }
    })
    function optionHandler(cm, val, old) {
        if (old && old != CodeMirror.Init) {
            CodeMirror.off(cm.getWrapperElement(), "mouseover",
                cm.state.showToolbar.onFocus);
            delete cm.state.showToolbar;
        }
        if (val) {
            var state = cm.state.showToolbar = new TextHoverState(cm, parseOptions(cm,
                val));
            CodeMirror.on(cm.getWrapperElement(), "focus", alert(cm));
        }
    }
    CodeMirror.defineOption("showToolBar", false, function(cm, val, old) {
        if (old && old != CodeMirror.Init) {
            return
        }
        if (old == CodeMirror.Init) old = false;
        if (!old == !val) return;
        if (val) {
            CodeMirror.on(cm, "focus", (cm) => {
                if (active != cm) {
                    if (panel) {
                        close(cm)
                    }
					active = cm
					return create(cm, editorBar)
                }
            });
        }
    });
})