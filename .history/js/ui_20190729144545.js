var $wrapper = $("#wrapper"),
    $footer = $("#footer");
class UI {
    constructor() {
        this.layout;
        this.render();
    }
    render() {
        let _this = this;
        var _stor = ls.getStorage("app.ui");
        this.delay = _stor.delay;
        this.layout = _stor.layout;
        this.direction = _stor.direction;
        this.setLayout(_this.layout, _stor.direction)
    }
    setLayout(layout, isreverse) {
        if ($wrapper.removeClass("frontland_wrapper-vertical reverse frontland_wrapper-vertical default")) {
            $wrapper.addClass("frontland_wrapper-" + layout + " " + isreverse);
            $wrapper.attr("data-reverse", isreverse);
            $wrapper.attr("data-layout", layout);
        }
        ls.setStorageItem('app.ui', "direction", isreverse);
        ls.setStorageItem('app.ui', "direction", layout);
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