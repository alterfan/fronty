var numPanels = 0;
var livepreview = new LivePreview();
class Editor {
    constructor(textarea, id, mode) {
        this.autoupdate = true;
        this.cm;
        this.create(textarea, mode)
    }
    create(textarea, name, mode) {
        console.log('textarea: ', textarea);
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
        setCssOption("font-size", ls.getStorage("workspace")["font-size"], this.cm);
        setCssOption("font-family", ls.getStorage("workspace")["font-family"], this.cm);
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
const setCssOption = (optionName, val, cm) => {
    console.log('val: ', val);
    var val = val !== undefined ? val : defaults["workspace"][optionName];
    ls.setStorageItem("workspace", optionName, val);
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
    l.href = "./lib/codemirror/theme/" + value + ".css";
    l.rel = "stylesheet";
    l.theme = value;
    document.head.replaceChild(l, document.querySelectorAll("link")[1]);
    if (ls.getStorageItem("codemirror.options", option) !== value)
        ls.setStorageItem("codemirror.options", option, value);
    editor.setOption(option, value);
}