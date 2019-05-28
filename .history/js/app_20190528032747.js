var $fronty = $(".fronty"),
    $modal = $("#modal"),
    $header = $("#header"),
    $wrapper = $("#wrapper"),
    $footer = $("#footer"),
    $hidden = $("#hidden"),
    $cm = $(".CodeMirror"),
    $overlay = $('#overlay'),
    $editors = $('#editors'),
    $editor_controls = $(".editor_controls");
var defaults = {
    "options": {
        "theme": "fronty",
        "extraKeys": {
            "Ctrl-J": "toMatchingTag"
        },
        "inputStyle": "contenteditable",
        "addModeClass": true,
        "styleActiveLine": false,
        "autoCloseBrackets": true,
        "autoCloseTags": true,
        "lineNumbers": true,
        "lineWrapping": false,
        "foldGutter": true,
        "selectionsMayTouch": true,
        "showCursorWhenSelecting": true,
        "scrollbarStyle": "simple",
        "matchTags": true,
        "matchBrackets": true,
        "smartIndent": true,
        "autoRefresh": true
    },
    "configuration": {
        "delay": 500,
        "fontSize": "12px",
        "fontFamily": "Consolas",
        "layout": "vertical",
        "direction": "default"
    },
    "autosaved": [
        "<div class=\"container\">\n  <div class=\"bg\">\n<div class=\"img\">11111</div>\n    <div class=\"overlay\">\n      <h2>Check This <span>Out!</span></h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n  <div class=\"bg\">\n    <img src=\"\" alt=\"\">\n    <div class=\"overlay\">\n      <h2>Check This <span>Out!</span></h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n  <div class=\"bg\">\n    <img src=\"https://unsplash.it/400/200\" alt=\"\">\n    <div class=\"overlay\">\n      <h2>Check This Out!</h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n</div>",
        "*,\n*:before,\n*:after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.container {\n  width: 85vw;\n  margin: 1rem auto;\n}\n\n.bg,\n.overlay {\n  text-align: center;\n}\n\nimg,\n.overlay {\n  transition: .3s all;\n  border-radius: 3px;\n}\n\n.bg {\n  float: left;\n  max-width: 31%;\n  position: relative;\n  margin: .5%;\n}\n.bg .img {\n\n  width: 100%;\n  margin-bottom: -4px; -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n.bg .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.2);\n  color: #fff;\n  opacity: 0;\n}\n.bg .overlay h2 {\n  padding-top: 20%;\n  font-family: 'Droid Serif', serif;\n}\n.bg .overlay p {\n  font-family: 'Julius Sans One', sans-serif;\n}\n.bg:hover .overlay {\n  opacity: 1;\n}\n.bg:hover .img {\n  -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n\n@media screen and (max-width: 1148px) {\n  .bg {\n    max-width: 48%;\n    margin: 1%;\n  }\n}\n@media screen and (max-width: 768px) {\n  .bg {\n    float: none;\n    max-width: 80%;\n    margin: 1% auto;\n  }\n}\n",
        "console.log(\"test 1\")",
        '{"1":{"link":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.css","name":"Bootstrap","ver":"4.2.1"},"2":{"link":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css","name":"Animate","ver":"3.7.0"}}',
        '{"1":{"link":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js","name":"jQuery","ver":"3.3.1"},"2":{"link":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/bootstrap.min.js","name":"Bootstrap","ver":"4.2.1"}}'
    ]
};

var _DB = new LocalStorageDB(defaults);
$(document).ready(function() {
    var modal = new Modal();
    if (_DB.ready == true) {
        var cm = new CmEditor()
        $(window).on('resize', function() {
            cm.updateFrameResolution();
            cm.cm_refresh();
        });
        var target = {
            cm: cm,
            modal: modal,
            db: _DB,
            ui: cm,
            frameConsole: frameConsole
        }
        $(document).on('click', '[action="click"]', function(el) {
            var action = new Function("target", "action", "val", "target[action](val)"),
                t = $(this).attr('data-target'),
                a = $(this).attr('data-action');
            action(target[t], a, $(this))
        });
        $(document).on('change', '[action="change"]', function(e) {
            var action = new Function("target", "action", "val", "target[action](val)")
            action(target[$(this).attr('data-target')], $(this).attr('action') + "_" + $(this).attr('data-action'), $(this).val())
        });
    }
})