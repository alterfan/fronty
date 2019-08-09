var numPanels = 0;
var livepreview = new LivePreview();
class Editor {
    constructor(textarea, name, mode) {
        this.autoupdate = true;
        this.cm;
        this.create(textarea, name, mode)
    }
    create(name, mode) {
        this.cm = CodeMirror.fromTextArea(document.getElementById(name), this.options);
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
            ls.setStorage(name, cm.getValue());
            setTimeout(livepreview.updatePreview, 300);
        });
        this.cm.setOption("mode", mode);
        this.cm.setOption("toolBar", true);
        this.cm.setOption("matchBrackets", true);
        this.cm.setOption("matchTags", {
            bothTags: true
        });
        this.cm.addKeyMap(bindings, false);
        this.cm.setValue(ls.getStorage(name));
        setOption("theme", this.options.theme, this.cm);
    }
    get options() {
        return ls.getStorage("codemirror.options")
    }
    set options(options) {
        ls.setStorage("codemirror.options", options);
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
function setCssOption(optionName, val, cm) {
    var val = val !== undefined ? val : defaults["workspace"][optionName];
    ls.setStorageItem("workspace", optionName, val);
    if (cm !== undefined) {
        cm.getWrapperElement().style[optionName] = val;
    } else {
        let instances = Workspace.editors
        for (const key in instances) {
            if (instances.hasOwnProperty(key)) {
                const e = instances[key].cm;
                e.getWrapperElement().style[optionName] = val;
            }
        }
        for (let i = 0; i < instances.length; i++) {}
    }
}
const setOption = (option, value, editor) => {
    var l = document.createElement("link");
    l.href = "./lib/codemirror/theme/" + value + ".css";
    l.rel = "stylesheet";
    l.theme = value;
    document.head.replaceChild(l, document.querySelectorAll("link")[1]);
    if (ls.getStorageItem("codemirror.options", option) !== value)
        ls.setStorageItem("codemirror.options", option, value);
    editor.setOption(option, value);
}