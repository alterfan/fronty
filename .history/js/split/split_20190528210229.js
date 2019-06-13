const doc = document;
const H = 'horizontal';
const V = 'vertical';
const MOUSE = {
    CLICK: 'click' || 'mousedown' || 'touchstart',
    START: 'mousedown' || 'touchstart',
    MOVE: 'mousemove' || 'touchmove',
    END: 'mouseup' || 'touchend'
}
const isString = (v) => {
    typeof v === 'string' || v instanceof String;
}
class Options {
    get parent() {
        return doc.querySelector(this.options.parent);
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
        this.isMoving = false;
        this.init()
    }
    init() {
        if (this.child && this.gutter) this.events()
    }
    events() {
        let gElement = this.parent.querySelectorAll(".gutter");
        for (let i = 0; i < gElement.length; i++) {
            let _gutter = gElement[i],
                rect = _gutter.getBoundingClientRect();
            _gutter.addEventListener(MOUSE.START, (e) => {
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                this.isMoving = true;
                doc.addEventListener(MOUSE.MOVE, (e) => {
                    var basis = (e.clientX / this.childs[i].offsetWidth);
                    if (this.isMoving) {
                        this.childs[i].style["flex-basis"] = parseFloat(this.childs[i].style["flex-basis"]) * basis + "%";
                    }
                });
                doc.addEventListener(MOUSE.END, (e) => {
                    this.isMoving = false;
                    return
                });
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
                class: "gutter gutter-" + this.direction,
                "data-id": _i
            });
            _this.setStyles(_g);
            _c.append(_g);
        }
        return true
    }
    setStyles(gutter) {
        let _this = this,
            g = _this.childsQuantity - 1,
            gSize = this.gutterSize,
            eSize = this.childSize;
        console.log('g: ', g);
        switch (_this.direction) {
            case V:
                for (let index = 0; index < g; index++) {

                    _this.childs[index].style['flex-basis'] = eSize + "%";
                    _this.childs[index].style['padding-bottom'] = gSize;
                }
                gutter.style.height = gSize;
                gutter.style.width = "100%";
            case H:
                for (let index = 0; index < g; index++) {
                    _this.childs[index].style['flex-basis'] = eSize + "%";
                    _this.childs[index].style['padding-right'] = gSize;
                }
                gutter.style.width = gSize;
                gutter.style.height = "100%";
        }
    }
}
class SplitEvents {
    onDrag() {

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
    let el = doc.createElement(tag);
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
