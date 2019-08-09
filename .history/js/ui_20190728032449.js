var $wrapper = $("#wrapper"),
    $footer = $("#footer");
class UI {
    constructor() {
        this.layout;
        this.render();
    }
    render() {
        let _this = this;
        var _stor = local.getStorage("app.ui");
        this.delay = _stor.delay;
        this.layout = _stor.layout;
        this.direction = _stor.direction;
        this.setLayout(_this.layout, _stor.direction)
    }
    setLayout(layout, isreverse) {
        if ($wrapper.removeClass("fronty_wrapper-vertical reverse fronty_wrapper-vertical default")) {
            $wrapper.addClass("fronty_wrapper-" + layout + " " + isreverse);
            $wrapper.attr("data-reverse", isreverse);
            $wrapper.attr("data-layout", layout);
        }
        local.setStorageItem('app.ui', "direction", isreverse);
        local.setStorageItem('app.ui', "direction", layout);
        $(".split-element").css("flex-basis", "33.33%")
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
}