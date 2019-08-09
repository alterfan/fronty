((mod) => {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("codemirror"), require("codemirror-toolbar"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["codemirror", "codemirror-toolbar"], mod);
    else // Plain browser env
        mod(CodeMirror);
})((CodeMirror) => {
    'use strict';
    var Focused = null,
        bar, panel, panel_item, num = 0;
    const actions = {
        clear: function(cm) {
            cm.setValue('\n');
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
            cm.save()
            cm.refresh()
        },
        undo: function(cm) {
            cm.undo()
            cm.refresh()
        },
        redo: function(cm) {
            cm.redo();
            cm.refresh();
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
    var panels = {};
    var node;
    let addBar = (cm) => {
        var id = ++numPanels;
        var toolbar, icon;
        node = document.createElement("div");
        node.id = "panel-" + id;
        node.className = "panel " + "top group-row";
        node.style.height = "32px";
        icon = node.appendChild(dom.new("div", {
            class: "bar__group",
            src: './assests/icons/' + cm.getOption("mode") + '.png'
        }, dom.new("img", {
            class: "bar__group__item__icon",
            src: './assests/icons/' + cm.getOption("mode") + '.png'
        })));
        toolbar = node.appendChild(document.createElement("div"));
        CodeMirror.on(toolbar, "mousedown", function(cm) {
            cm.focus();
            panels[node.id].clear();
        });
        panels[node.id] = cm.addPanel(node, {
            stable: true
        });
        let wrapper = cm.state.panels.wrapper;
        wrapper.style.position = "relative";
        wrapper.style.height = "100%";
        cm.getWrapperElement().style.height = "calc(100% - 32px)";
        cm.refresh()
    }
    let addBarPanel = (cm, panel) => {
        let wrap, del, separator, format, redo, undo, search;
        wrap = cm.getWrapperElement().parentNode;
        panel = dom.new("div", {
            class: "bar__group__panel"
        });
        separator = dom.new("span", {
            class: "bar__group__panel__separator"
        });
        del = dom.new("input", {
            class: "bar__group__panel__item material-icons",
            value: "delete",
            "data-action": "clear",
            type: "button"
        });
        format = dom.new("input", {
            class: "bar__group__panel__item material-icons",
            value: "code",
            "data-action": "format",
            type: "button"
        });
        undo = dom.new("input", {
            class: "bar__group__panel__item material-icons",
            value: "undo",
            "data-action": "undo",
            type: "button"
        });
        redo = dom.new("input", {
            class: "bar__group__panel__item material-icons",
            value: "redo",
            "data-action": "redo",
            type: "button"
        });
        search = dom.new("input", {
            class: "bar__group__panel__item material-icons",
            value: "search",
            "data-action": "search",
            type: "button"
        });
        panel.appendChild(del);
        panel.appendChild(format);
        panel.appendChild(dom.new("span", {
            class: "bar__group__panel__separator"
        }));
        panel.appendChild(undo);
        panel.appendChild(redo);
        panel.appendChild(dom.new("span", {
            class: "bar__group__panel__separator"
        }));
        panel.appendChild(search);
        cm.getWrapperElement().parentNode.querySelector('.panel').appendChild(panel);
        let btns = wrap.querySelectorAll('[data-action]');
        for (var i = 0; i < btns.length; i++) {
            btns[i].onclick = function(event) {
                event.preventDefault();
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
    let close = (cm) => {
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
            setTimeout(addBar(cm), 2000);;
            CodeMirror.on(cm, "mousedown", (cm) => {
                if (_cm != cm) {
                    if (node) {
                        close(cm)
                        _cm = cm;
                        addBarPanel(cm, panel)
                    }
                }
                cm.refresh();
            });
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
    var dom = {
        new: (tag, attributes, children) => {
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
                if (Array.isArray(cObj)) {
                    for (var i = 0; i < cObj.length; i++) {
                        let obj = cObj[i];
                        let _c = document.createElement(obj["tag"]);
                        for (var key in obj) {
                            if (key != "tag") {
                                _c.setAttribute(key, obj[key]);
                                if (key.toLowerCase() == 'class') {
                                    _c.className = obj[key]; // for IE compatibility
                                } else if (key.toLowerCase() == 'style') {
                                    _c.style.cssText = obj[key]; // for IE compatibility
                                }
                            }
                        }
                        e.appendChild(_c);
                    }
                } else {
                    e.appendChild(cObj);
                }
            }
            return e;
        }
    };
});