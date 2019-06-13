var cmcm, cmDoc, cmEditor, _html, _css, _js;
var mixedMode = {
    name: "htmlmixed",
    scriptTypes: [{
            matches: /\/x-handlebars-template|\/x-mustache/i,
            mode: null
        },
        {
            matches: /(text|application)\/(x-)?vb(a|script)/i,
            mode: "vbscript"
        }
    ]
};
class Cm extends Ui {
    constructor() {
        super();
        this._autoupdate = true;
        this.cm;
        this.fontSize;
        this.fontFamily;
        this.layout;
        this.isType = false;
        this.options = _DB.getStorage("options");
        this.configuration = _DB.getStorage("configuration");
        this.autosaved = _DB.getStorage("autosaved");
        this.delay = _DB.getStorageItem("configuration", 'delay');
        this.theme = _DB.getStorageItem("options", 'theme')
        this.fontSize = _DB.getStorageItem("configuration", 'fontSize');
        this.render;
        this.init()
    }
    init() {
        let _this = this;
        $('.externalLibs').each((index, el) => {
            var val = _this.autosaved[index + 3];
            $(el).val(val);
        });
        $('.code').each(function(index) {
            var mode = $(this).attr('id');
            $(this).val(_this.autosaved[index]); //get autosaved
            cmcm = CodeMirror.fromTextArea($("#" + mode).get(0), _this.options);
            mode == "htmlmixed" ? cmcm.setOption("mode", mixedMode) : cmcm.setOption("mode", mode);
            _this.eventsListner(cmcm);
            cmcm.setOption("toolBar", true);
            cmcm.setOption("miniMap", true);
            cmcm.refresh()
        });
        this.change_theme(_this.theme);
        _this.change_fontSize(_this.fontSize);
        _this.change_fontFamily(_this.fontFamily);
        $(document).ready(()=>{
            updatePreview();
            $wrapper.addClass("fadeout");
        })        
    }
    cm_refresh() {
        $('.CodeMirror').each(function(i, el) {
            cmcm.refresh();
        });
    }
    cm_blur() {
        $('.CodeMirror').each(function(i, el) {
            cmcm.blur();
        });
    }
    change_theme(val) {
        $('head').append('<link rel="stylesheet" type="text/css" href="./src/codemirror/theme/' + val + '.css">');
        $('.CodeMirror').each(function(index) {
            $('.CodeMirror')[index].CodeMirror.setOption("theme", val);
        });
        _DB.setStorageItem("options", 'theme', val)
    }
    change_fontSize(val) {
        $('.CodeMirror').css("font-size", val);
        _DB.setStorageItem("configuration", 'fontSize', val);
    }
    change_delay(val) {
        this.delay = val;
        if (_DB.setStorageItem("configuration", 'delay', val)) {
            this.cm_refresh();
        }
    }
    change_fontFamily(val) {
        $('.CodeMirror').css("font-family", val);
        if (_DB.setStorageItem("configuration", 'fontFamily', val)) {
            this.cm_refresh();
        }
    }
    eventsListner(cmInstance) {
        let self = this;
        cmInstance.on("gutterClick", function(cm, line, gutter) {
            if (gutter === 'CodeMirror-linenumbers') {
                return cm.setSelection(CodeMirror.Pos(line, 0), CodeMirror.Pos(line + 1, 0));
            }
        });
        cmInstance.on("focus", function(cm) {
            cm.setCursor(cmInstance.lineCount(), 0);
            cmDoc = cm.getDoc();
            cmEditor = cmDoc.getEditor();
            cm.setOption("styleActiveLine", true);
        })
        cmInstance.on("blur", function(cm) {
            cm.setOption("styleActiveLine", false);
        });
        cmInstance.on("keydown", function(cm) {})
        cmInstance.on("change", function(cm) {
            self.isType = true
        })
        cmInstance.on("keyup", function(cm) {
            cm.save();
            _DB.setStorage("autosaved", [$("#htmlmixed").val(), $("#css").val(), $("#javascript").val()]);
            self.updateDelay(self);
        })
        cmInstance.on("refresh", function(cm) {});
    }
    updateDelay(self) {
        if (self._autoupdate == true) {
            if (self.isType == true) {
                setTimeout(function() {
                    single(updatePreview());
                }, self.delay);
            }
        }
    }
}
class CmEditor extends Cm {
    constructor() {
        super()
    }
    format() {
        if (typeof cmEditor.getOption('mode') == "object") {
            var mode = (cmEditor.getOption('mode')).name
        } else {
            var mode = cmEditor.getOption('mode');
        }
        let code = cmEditor.getValue();
        if (mode == 'htmlmixed' || mode == 'html' || mode == 'xml') {
            var formatted = html_beautify(code, {
                'indent_size': 2,
                'indent_char': '\t'
            });
        }
        if (mode == 'javascript') {
            var formatted = js_beautify(code, {
                'indent_size': 2,
                'indent_char': '\t'
            });
        }
        if (mode == 'css') {
            var formatted = css_beautify(code, {
                'indent_size': 2,
                'indent_char': '\t'
            });
        }
        cmEditor.setValue(formatted);
        cmEditor.setCursor(cmDoc.lineCount(), 0);
    }
}
function updatePreview() {
    let _head, previewFrame = document.getElementById('iframe'),
        preview = previewFrame.contentDocument || previewFrame.contentWindow.document,
        headbody = "<head></head></body",
        body = "<body>" + $("#htmlmixed").val() + "</body",
        script = '<script type="text/javascript">' + $("#javascript").val() + '</script>';
    preview.open();
    frameConsole.init();
    preview.write(headbody + body);
    let libsArr = libs(preview);
    for (var i = 0; i < libsArr.length; i++) {
        preview.querySelector("head").innerHTML += libsArr[i]
    }
    preview.querySelector("head").innerHTML += "<style>" + $("#css").val() + "</style>";
    preview.querySelector("body").append(script);
    preview.close();
}
function libs(preview) {
    var externalStylesheets = JSON.parse($('#code-3').val()),
        externalScripts = JSON.parse($('#code-4').val()),
        arr = [];
    for (var key in externalStylesheets) {
        let l = externalStylesheets,
            _l = l[key];
        arr.push("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + _l['link'] + "\">");
    }
    for (var key in externalScripts) {
        let l = externalScripts,
            _l = l[key];
        arr.push("<script type=\"text/javascript\" src=\"" + _l['link'] + "\"></script>");
    }
    return arr;
}
function single(fn, context) {
    var result;
    return function() {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        setTimeout(() => {
            return result;
        }, 300);
    };
}