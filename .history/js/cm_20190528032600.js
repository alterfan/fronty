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
        setTimeout(function() {
            updatePreview()
            $wrapper.addClass("fadeout");
        }, _this.delay);
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
            if (self._autoupdate == true) {
                if (self.isType == true) {
                    setTimeout(function() {
                        single(updatePreview())
                    }, self.delay);
                }
            }
        })
        cmInstance.on("refresh", function(cm) {});
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
        head = "<head></head>",
        body_script = "<body>" + $("#htmlmixed").val() + "</body>" + '<script type="text/javascript">' + $("#javascript").val() + '</script>';

    preview.open();
    console.log('$("#htmlmixed").val(): ', JSON.stringify($("#htmlmixed").val()));
    //open
    frameConsole.init();
    preview.write(head + body_script);
    lib.append(preview);
    preview.querySelector("head").innerHTML += "<style>" + $("#css").val() + "</style>";
    preview.close();
    //close
}

function appendLibs(preview) {
    var externalStylesheets = JSON.parse($('#code-3').val()),
        externalScripts = JSON.parse($('#code-4').val());
    for (var key in externalStylesheets) {
        let l = externalStylesheets,
            _l = l[key];
        preview.querySelector("head").innerHTML += "<link rel='stylesheet' href='" + _l['link'] + "'>";
    }
    for (var key in externalScripts) {
        let l = externalScripts,
            _l = l[key];
        preview.querySelector("head").innerHTML += "<script type='text/javascript' src='" + _l['link'] + "'></script>";
    }
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