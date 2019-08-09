var numPanels = 0;
class Editor {
    constructor(parent, index, mode, code) {
        this.autoupdate = true;
        this.parent = document.getElementById(parent);
        this.cm;
        this.create(index, mode, code)
    }
    create(index, mode, code) {
        let textarea = document.createElement("textarea");
        let wrapper = document.createElement("div");
        wrapper.className = "CodeMirror-wrapper";
        textarea.setAttribute("data-index", index);
        textarea.setAttribute("id", mode + "_" + index);
        wrapper.appendChild(textarea)
        this.parent.appendChild(wrapper);
        this.cm = CodeMirror.fromTextArea(textarea, this.options);
        this.cm.on("focus", function(cm) {
            cm.setOption("styleActiveLine", true);
        });
        this.cm.on("blur", function(cm) {
            cm.setOption("styleActiveLine", false);
        });
        this.cm.on("gutterClick", lineSelection)
        this.cm.on("change", function(cm) {
            let mode = cm.getOption("mode");
            cm.save();
            local.setStorage("project." + mode, cm.getValue())
            setTimeout(updatePreview, 300);
        });
        this.cm.on("beforeChange", function(cm) {
            preview.open();
            preview.write();
            preview.close();
        });
        this.cm.setOption("mode", mode);
        this.cm.setOption("toolBar", true);
        this.cm.setOption("matchBrackets", true);
        this.cm.setOption("matchTags", {
            bothTags: true
        });
        this.cm.addKeyMap(bindings, false);
        setCssOption("font-size", local.getStorage("app.config")["font-size"], this.cm);
        setOption("theme", this.options.theme, this.cm)
        if (code) this.cm.setValue(code);
    }
    get options() {
        return local.getStorage("editor.options")
    }
    set options(options) {
        local.setStorage("editor.options", options);
    }
};
const lineSelection = (cm, line, gutter, e) => {
    var selections = e.ctrlKey ? cm.listSelections() : [];
    var from = line,
        to = line + 1;
    var update = () => {
        var selection = {
            anchor: CodeMirror.Pos(from, to > from ? 0 : null),
            head: CodeMirror.Pos(to, 0)
        };
        cm.setSelections(selections.concat([selection]));
    };
    var move = function(e) {
        var curLine = cm.lineAtHeight(e.clientY, "client");
        if (curLine != to) {
            to = curLine + 1;
            update();
        }
    };
    var up = function(e) {
        removeEventListener("mouseup", up);
        removeEventListener("mousemove", move)
    };
    addEventListener("mousemove", move);
    addEventListener("mouseup", up);
};
const setCssOption = (optionName, val, cm) => {
    var val = val !== undefined ? val : defaults["app.config"][optionName];
    local.setStorageItem("app.config", optionName, val);
    if (cm !== undefined) {
        cm.getWrapperElement().style[optionName] = val;
    } else {
        for (let i = 0; i < instances.length; i++) {
            const e = instances[i];
            e.getWrapperElement().style[optionName] = val;
        }
    }
}
const setOption = (option, value, editor) => {
    var l = document.createElement("link");
    l.href = "./src/codemirror/theme/" + value + ".css";
    l.rel = "stylesheet";
    l.theme = value;
    document.head.replaceChild(l, document.querySelectorAll("link")[1]);
    if (local.getStorageItem("editor.options", option) !== value)
        local.setStorageItem("editor.options", option, value);
    editor.setOption(option, value);
}