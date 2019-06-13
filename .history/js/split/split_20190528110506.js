const H = 'horizontal';
const V = 'vertical';
const isString = (v) => {
    typeof v === 'string' || v instanceof String;
}
class Options {
    get parent() {
        return document.querySelector(this.options.parent);
    }
    get childs() {
        return this.parent.querySelectorAll(this.options.childs);
    }
    get childsQuantity() {
        return this.parent.querySelectorAll(this.options.childs).length;
    }
    get direction() {
        return this.options.direction
    }
    get gutterSize() {
        return this.options.gutterSize
    }
    get minSize() {
        return this.options.minSize
    }
    get defaults() {
        return {
            parent: ".split-parent",
            childs: '.split-element',
            direction: 'horizontal',
            gutterSize: "16px",
            minSize: "128px"
        }
    }
    getOption(propName) {
        const value = this[propName]
        if (value !== undefined) {
            return value
        }
        return this.defaults
    }
}
class Split extends Options {
    constructor(options) {
        super();
        this.options = options == null ? this.defaults : options;
        this.init()
    }
    init() {
        if (this.child) this.gutter;
    }
    get child() {
        var eSize = 100 / this.childsQuantity;
        for (let index = 0; index < this.childsQuantity; index++) {
            this.childs[index].style['flex-basis'] = eSize + "%";
        }
        return true
    }
    get gutter() {
        let _gutter, _child,
            _i = 0,
            _this = this,
            gutterQuantity = (_this.childsQuantity - 1);
        for (_i; _i < gutterQuantity; _i++) {
            _child = this.childs[_i];
            _gutter = create("div", {
                class: "gutter gutter-" + this.split_direction,
                style: "position:absolute;right:0"
            });
            _this.setStyles(_gutter);
            _child.append(_gutter);
        }
        return true
    }
    setStyles(gutter) {
        switch (this.direction) {
            case V:
                gutter.style.height = this.gutterSize;
                gutter.style.width = "100%";
            case H:
                gutter.style.width = this.gutterSize;
                gutter.style.height = "100%";
        }
    }
}
var split = new Split({
    parent: ".split-parent",
    childs: '.split-element',
    direction: 'horizontal',
    gutterSize: "16px",
});

function create(tag, attributes, children) {
    let el = document.createElement(tag);
    if (typeof attributes == 'object') {
        for (var key in attributes) {
            el.setAttribute(key, attributes[key]);
            if (key.toLowerCase() == 'class') {
                el.className = attributes[key]; // for IE compatibility
            } else if (key.toLowerCase() == 'style') {
                el.style.cssText = attributes[key]; // for IE compatibility
            }
        }
    }
    if (children != undefined) {
        el.appendChild(children);
    }
    return el;
}