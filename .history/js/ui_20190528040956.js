class Ui  {
    constructor() {
        this.delay
        this.layout
        this.direction;
        this.render();
    }
    render() {
        let _this = this;
        this.delay = _DB.getStorageItem("configuration", "delay");
        this.layout = _DB.getStorageItem("configuration", "layout");
        this.direction = _DB.getStorageItem("configuration", "direction");
        this.setLayout(_this.layout, _this.direction)
    }
    setLayout(layout, isreverse) {
        if ($wrapper.removeClass("fronty_wrapper-vertical reverse fronty_wrapper-vertical default")) {
            $wrapper.addClass("fronty_wrapper-" + layout + " " + isreverse);
            $wrapper.attr("data-reverse", isreverse);
            $wrapper.attr("data-layout", layout);
        }
        _DB.setStorageItem('configuration', "direction", isreverse);
        _DB.setStorageItem('configuration', "direction", layout);
        this.initSplit(layout)
    }
    changeLayout(el) {
        var layout = el.attr("data-layout"),
            reverse = el.attr("data-reverse")
        var _this = this;
        _this.fadeIn($wrapper);
        setTimeout(function() {
            _this.setLayout(layout, reverse);
            _this.fadeOut($wrapper);
        }, this.delay)
    }
    rotate(el, deg) {
        el.css("transform", "rotate(" + deg + "deg)")
    }
    maximize(el) {
        var _this = this;
        var editorIndex = el.attr("data-editor"),
            editorID = $("#editor-" + editorIndex),
            editorsSizesMin = [0, 0, 0],
            editorsSizesDefault = [100 / 3, 100 / 3, 100 / 3];
        if (!editorID.hasClass('maximized')) {
            editorID.addClass('maximized');
            editorsSizesMin[editorIndex] = 100;
            splitEditors.setSizes(editorsSizesMin);
            _this.rotate(el.find("i"), 180)
        } else {
            editorID.removeClass('maximized');
            splitEditors.setSizes(editorsSizesDefault);
            _this.rotate(el.find("i"), 0);
        }
    }
    fadeIn(element) {
        element.removeClass("fadeout");
        element.addClass("fadein")
    }
    fadeOut(element) {
        element.removeClass("fadein");
        element.addClass("fadeout");
    }
    updateFrameResolution() {
        $("#iframeWidth").html(Math.round($('#iframe').width()));
        $("#iframeHeight").html(Math.round($('#iframe').height()));
    }
}