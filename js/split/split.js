const $D = document;
const $W = window;
const H = 'horizontal';
const V = 'vertical';
const E = {
    CLICK: 'click' || 'mousedown' || 'touchstart',
    DOUBLE_CLICK: 'dblclick',
    START: 'mousedown' || 'touchstart',
    MOVE: 'mousemove' || 'touchmove',
    END: 'mouseup' || 'touchend'
};
const isString = (v) => {
    typeof v === 'string' || v instanceof String;
};
class Options {
    constructor(options) {
        this.POS = {};
        this.G = {};
        this.POS.X = {};
        this.POS.X.START;
        this.POS.X.END;
        this.POS.Y = {};
        this.POS.Y.START;
        this.POS.Y.END;
        this.element = {};
        this.element.maxWidth;
        this.element.maxHeight;
        this.moveing = false;
        this.options = options != undefined ? options : this.defaults;
    }
    get parent() {
        return $D.querySelector(this.options.parent);
    }
    get split_elements() {
        return this.parent.querySelectorAll(this.options.childs);
    }
    get split_elements_sizes() {
        return this.options.childSize;
    }
    get split_elements_length() {
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
            gutterSize: "16",
            minSize: "64"
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
class Gutter extends Options {
    constructor(options) {
        super(options);
        this.isH = this.direction == H;
        this.G = {};
        this.clientAxis = "flex-basis"
    }
    initGutters() {
        let GUTTER, G_length, E_length,
            G = [],
            E = this.split_elements,
            cursor = this.direction === H ? 'col-resize' : 'row-resize';
        E_length = this.split_elements_length;
        G_length = (E_length - 1) >= 1 ? (E_length - 1) : 1;
        this.G = {};
        this.G.flexBasis = this.gutterSize / this.screen * 100;
        for (var i = 0; i < G_length; i++) {
            GUTTER = create("div", {
                "class": "split-gutter split-gutter-" + this.direction,
                "data-index": i + 1,
                "data-direction": this.direction
            });
            GUTTER.style["cursor"] = cursor;
            GUTTER.style["flex-basis"] = this.G.flexBasis + "%";
            E[i].parentNode.insertBefore(GUTTER, E[i + 1]);
            G.push(G[i]);
        }
        this.events()
    }
    events() {
        let _this = this;
        document.querySelectorAll(".split-gutter-" + this.direction).forEach(function(element) {
            element.addEventListener(E.START, (e) => {
                _this.start(e);
                document.addEventListener(E.MOVE, (e) => {
                    _this.move(e);
                });
                document.addEventListener(E.END, (e) => {
                    _this.end(e);
                });
            });
            element.addEventListener(E.DOUBLE_CLICK, (e) => {
                _this.doubleClick()
            });
        });
    }
    pairs(e) {
        this.A = {};
        this.B = {};
        this.G.node = e.target;
        this.G.start = Math.round(this.direction == H ? getPos(this.G.node).left : getPos(this.G.node).top);
        this.A.node = this.G.node.previousElementSibling;
        this.A.offset = Math.round(this.direction == H ? this.A.node.getBoundingClientRect().left : this.A.node.getBoundingClientRect().top);
        this.A.oldSize = getInt(this.A.node.style[this.clientAxis]);
        this.B.node = this.G.node.nextElementSibling;
        this.B.offset = Math.round(this.direction == H ? this.B.node.getBoundingClientRect().left : this.B.node.getBoundingClientRect().top);
        this.B.oldSize = getInt(this.B.node.style[this.clientAxis]);
        return true
    }
    doubleClick(e) {
        if (this.pairs(e)) console.log(1);
    }
    start(e) {
        document.querySelector("body").appendChild(create("div", {
            id: "split-surface",
            style: "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000000;"
        }));
        document.body.style.cursor = this.direction === H ? 'col-resize' : 'row-resize';
        if (this.pairs(e)) this.moveing = true;
    }
    move(e) {
        if (!this.moveing) return
        var axis = this.isH ? e.clientX : e.clientY;
        if (this.options.minSize <= axis) {
            this.reSize(axis);
        }
        if (this.options.adjust >= (axis - this.A.offset)) {
            this.minSize();
        }
    }
    end(e) {
        let el = document.getElementById("split-surface");
        if (el !== null) el.remove();
        this.A.node = "";
        this.B.node = "";
        this.G.node = "";
        this.moveing = false;
    }
    minSize() {
        this.A.node.style[this.clientAxis] = 0 + "%";
        this.B.node.style[this.clientAxis] = (this.A.oldSize + this.B.oldSize) + "%";
    }
    reSize(pos) {
        var size = this.isH ? (pos - this.A.offset) : pos;
        this.A.node.style[this.clientAxis] = ((size > 0 ? size : 0) / this.screen) * 100 + "%";
        this.B.node.style[this.clientAxis] = (this.A.oldSize - getInt(this.A.node.style[this.clientAxis]) + this.B.oldSize) + "%";
    }
}
class Split extends Gutter {
    constructor(options) {
        super(options);
        this.init();
        this.G = {};
    }
    get screen() {
        return this.direction == H ? window.innerWidth : window.innerHeight;
    }
    init() {
        this.InitSplit();
        this.initGutters();
    }
    InitSplit() {
        let _this = this;
        for (let index = 1; index < this.split_elements_length; index++) {
            let s = 100 / _this.split_elements_length - (getInt(_this.gutterSize) / _this.screen * 100),
                O = {
                    "data-index": index + 1,
                    "data-direction": _this.direction,
                    "style": this.clientAxis + ": " + s + "%"
                }
            for (var key in O) {
                this.split_elements[index].setAttribute(key, O[key])
            }
        }
    }
}
var horizontal = new Split({
    parent: ".fronty_wrapper_block",
    childs: ".fronty_wrapper_block_editor",
    direction: "horizontal",
    gutterSize: "16",
    minSize: "0",
    adjust: "128"
});
var vertical = new Split({
    parent: ".fronty_wrapper",
    childs: ".fronty_wrapper_block",
    direction: "vertical",
    gutterSize: "16",
    minSize: "0",
    adjust: "128"
});
function getInt(value) {
    return parseFloat(value);
}
function getAttr(elementNode, attributeName) {
    return elementNode.getAttribute(attributeName)
}
function getPos(elementNode) {
    return elementNode.getBoundingClientRect()
}
function getSize(elementNode) {
    return elementNode.style[this.clientAxis]
}
function create(tag, attributes, children) {
    let el = $D.createElement(tag);
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
/* switch (_this.direction) {
            case V:
                for (let index = 0; index < gutterLength; index++) {
                    // _this.childs[index].style['padding-bottom'] = _this.gutterSize;
                };
            case H:
                for (let index = 0; index < gutterLength; index++) {
                    //  _this.childs[index].style['padding-right'] = _this.gutterSize;
                };
        } */