((mod) => {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("codemirror"), require("codemirror-toolbar"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["codemirror", "codemirror-toolbar"], mod);
    else // Plain browser env
        mod(CodeMirror);
})((CodeMirror) => {
    'use strict';
    var activeInstance = null;
    var panel;
    var num = 0;
    var panels = {};
    var node;
    let wrap, del, separator, format, redo, undo, search;
    panel = create("div", {
        class: "bar__group__panel"
    });
    separator = create("span", {
        class: "bar__group__panel__separator"
    });
    del = create("a", {
        class: "bar__group__panel__item material-icons",
        "data-action": "clear",
        type: "button"
    }, "delete");
    format = create("a", {
        class: "bar__group__panel__item material-icons",
        "data-action": "format",
        type: "button"
    }, "code");
    undo = create("a", {
        class: "bar__group__panel__item material-icons",
        "data-action": "undo",
        type: "button"
    }, "undo");
    redo = create("a", {
        class: "bar__group__panel__item material-icons",
        "data-action": "redo",
        type: "button"
    }, "redo");
    search = create("a", {
        class: "bar__group__panel__item material-icons",
        "data-action": "search",
        type: "button"
    }, "search");
    const actions = {
        clear: function(cm) {
            cm.setValue(" ");
            var mode = cm.getWrapperElement().getAttribute("id"),
                iframe = document.getElementById('iframe').contentDocument || document.getElementById('iframe').contentWindow.document,
                code = document.querySelectorAll(".code");
            switch (mode) {
                case "htmlmixed":
                    iframe.body.innerHTML = (code[0].value)
                case "css":
                    iframe.getElementById("text/" + mode).write(code[1].value)
                case "javascript":
                    iframe.getElementById("text/" + mode).write(code[2].value)
            }
            cm.save();
        },
        undo: function(cm) {
            console.log('undo');
            cm.getDoc().undo();
        },
        redo: function(cm) {
            console.log('redo');
            cm.getDoc().redo()
        },
        format: function(cm) {
            if (typeof cm.getOption('mode') == "object") {
                var mode = (cm.getOption('mode')).name
            } else {
                var mode = cm.getOption('mode');
            }
            let code = cm.getValue();
            if (mode == 'htmlmixed' || mode == 'html' || mode == 'xml') {
                var formatted = html_beautify(code, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
            }
            if (mode == 'javascript') {
                var formatted = js_beautify(code, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
            }
            if (mode == 'css') {
                var formatted = css_beautify(code, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
            }
            cm.setValue(formatted);
            cm.setCursor(cm.getDoc().lineCount(), 0);
            cm.save()
        }
    };
    let addBar = (cm) => {
        var id = ++numPanels;
        var toolbar, icon;
        node = document.createElement("div");
        node.id = "bar-" + id;
        node.className = "bar " + "top group-row";
        node.style.height = "32px";
        icon = create("div", {
            class: "bar__icon",
            style: "position:absolute;width:32px;height:32px;background-image:url(assests/icons/" + cm.getOption('mode') + ".png);background-size:32px 32px;"
        });
        node.appendChild(icon);
        toolbar = node.appendChild(document.createElement("div"));
        CodeMirror.on(toolbar, "mousedown", function(cm) {
            cm.focus();
            panels[node.id].clear();
        });
        panels[node.id] = cm.addPanel(node, {
            stable: false
        });
        let wrapper = cm.state.panels.wrapper;
        wrapper.style.height = "100%";
        wrapper.style.width = "100%";
        cm.getWrapperElement().style.height = "calc(100% - 32px)";
    }
    let showPanel = (cm) => {
        wrap = cm.getWrapperElement().parentNode;
        panel.appendChild(del);
        panel.appendChild(format);
        panel.appendChild(separator);
        panel.appendChild(undo);
        panel.appendChild(redo);
        panel.appendChild(separator);
        panel.appendChild(search);
        cm.getWrapperElement().parentNode.querySelector('.bar').appendChild(panel);
        let btns = wrap.querySelectorAll('[data-action]');
        for (var i = 0; i < btns.length; i++) {
            btns[i].onclick = function(event) {
                let a = this.getAttribute('data-action');
                switch (a) {
                    case "clear":
                        actions.clear(cm)
                    case "format":
                        actions.format(cm)
                    case "undo":
                        actions.undo(cm)
                    case "redo":
                        actions.redo(cm)
                }
            }
        }
    }
    let hidePanel = (cm) => {
        document.querySelector(".bar__group__panel").classList.add("hide")
        for (var i = 0; i < document.querySelectorAll(".bar__group__panel").length; i++) {
            document.querySelectorAll(".bar__group__panel")[i].remove()
        }
    }
    CodeMirror.defineOption("toolBar", false, function(cm, val, old) {
        if (old && old != CodeMirror.Init) {
            return
        }
        if (old == CodeMirror.Init) old = false;
        if (!old == !val) return;
        if (val) {
            setTimeout(addBar(cm), 2000);
            cm.on("mousedown", (cm) => {
                if (activeInstance != cm) {
                    if (node) {
                        hidePanel()
                        activeInstance = cm;
                        showPanel(cm)
                    }
                }
            });
        }
    });
    document.addEventListener('mousedown', (event) => {
        if (activeInstance !== null) {
            var e = activeInstance.state.panels.wrapper;
            if (!e.contains(event.target)) {
                activeInstance = null;
                hidePanel()
            } else {
                return
            }
        }
    });
    /**
     *
     *
     * @param {*} tag tag name
     * @param {*} attributesObject
     * @param {*} children
     * @returns
     *
     */
    function create(tag, attributes, innerText, children){
        let e = document.createElement(tag),
            cObj = children,
            aObj = attributes;
        if (typeof aObj == 'object') {
            for (var key in aObj) {
                e.setAttribute(key, aObj[key]);
                if (key.toLowerCase() == 'class') {
                    e.className = aObj[key]; // for IE compatibility
                } else if (key.toLowerCase() == 'style') {
                    e.style.cssText = aObj[key]; // for IE compatibility
                }
            }
        }
        if (cObj != undefined) {
            if (typeof cObj !== "string") e.appendChild(cObj);
        }
        e.innerHTML = innerText != undefined ? innerText : "";
        return e;
    }
});