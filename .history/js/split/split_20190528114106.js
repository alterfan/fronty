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
    get childSize() {
        return this.options.childSize;
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
        if (this.child && this.gutter) this.events()
    }
    events() {
        let gElement = this.parent.querySelectorAll(".gutter");
        for (let i = 0; i < gElement.length; i++) {
            let rect = gElement[i].getBoundingClientRect();
            gElement[i].addEventListener('mousedown', e => {
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                console.log(x, y);
            });
        }
    }
    get child() {
        var eSize = 100 / this.childsQuantity;
        for (let index = 0; index < this.childsQuantity; index++) {
            this.childs[index].style['flex-basis'] = eSize + "%";
        }
        return true
    }
    get gutter() {
        let _g, _c,
            _i = 0,
            _this = this,
            gutterQuantity = (_this.childsQuantity - 1);
        for (_i; _i < gutterQuantity; _i++) {
            _c = this.childs[_i];
            _g = create("div", {
                class: "gutter gutter-" + this.direction
            });
            _this.setStyles(_g);
            _c.append(_g);
        }
        return true
    }
    setStyles(gutter) {
        let gSize = this.gutterSize,
            eSize = this.childSize;
        switch (this.direction) {
            case V:
                for (let index = 0; index < eSize.length; index++) {
                    this.childs[index].style['flex-basis'] = eSize + "%";
                    this.childs[index].style['padding-bottom'] = gSize;
                }
                gutter.style.height = gSize;
                gutter.style.width = "100%";
            case H:
                for (let index = 0; index < eSize.length; index++) {
                    this.childs[index].style['flex-basis'] = eSize + "%";
                    this.childs[index].style['padding-bottom'] = gSize;
                }
                gutter.style.width = gSize;
                gutter.style.height = "100%";
        }
    }
}
var split = new Split({
    parent: ".split-parent",
    childs: '.split-element',
    childSize: [100 / 3],
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