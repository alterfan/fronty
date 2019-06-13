const DOC = document;
const H = 'horizontal';
const V = 'vertical';
const addEventListener = 'addEventListener'
const removeEventListener = 'removeEventListener'
const getBoundingClientRect = 'getBoundingClientRect'
const MOUSE_EVENT = {
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
        return DOC.querySelector(this.options.parent);
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
class SplitNodes extends Options {
    constructor(options) {
        super();
        this.options = options == null ? this.defaults : options;
        this.isMoving = false;
        this.init()
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
class Split extends SplitNodes {
    init() {
        if (this.child && this.gutter) this.events()
    }
    events() {
        let gutters = this.parent.querySelectorAll(".gutter");
        this.dragStart(gutters);
        for (let i = 0; i < gutters.length; i++) {
            let gutter = gutters[i];
            DOC.addEventListener(MOUSE_EVENT.MOVE, (e) => {
                if (this.isMoving) {
                    var basis = (e.clientX / this.childs[i].offsetWidth);
                    this.childs[i].style["flex-basis"] = parseFloat(this.childs[i].style["flex-basis"]) * basis + "%";
                    this.childs[i + 1].style["flex-basis"] = this.splitWidthSum - (parseFloat(this.childs[i].style["flex-basis"]) * basis) + "%";
                    console.log(this.childs[i], this.childs[i + 1]);
                }
            });
            DOC.addEventListener(MOUSE_EVENT.END, (e) => {
                this.isMoving = false;
                return
            });
        }
    }
    dragStart(gutters) {
        console.log('gutters: ', gutters);
        gutters.forEach(function(element) {
            element.addEventListener(MOUSE_EVENT.START, (e) => {
                var rect = gutter.getBoundingClientRect();
                this.splitWidthSum = parseFloat(this.childs[i].style["flex-basis"]) + parseFloat(this.childs[i + 1].style["flex-basis"]);
                this.startX = e.clientX - rect.left;
                this.startY = e.clientY - rect.top;
                this.isMoving = true;
            });
         });
    }
}
var split = new Split({
    parent: ".split-parent",
    childs: '.split-element',
    sizes: [100 / document.querySelectorAll(this.childs).length],
    direction: 'horizontal',
    gutterSize: "16px",
});
console.log('document.querySelectorAll(this.childs).length: ', document.querySelectorAll(split.childs).length);

document.addEventListener('touchstart', function(event) {
    event.preventDefault();
    event.stopPropagation();
    /* Здесь ваш код обработки события*/
}, false);
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    event.stopPropagation();
    /* Здесь ваш код обработки события*/
}, false);
document.addEventListener('touchend', function(event) {
    event.preventDefault();
    event.stopPropagation();
    /* Здесь ваш код обработки события*/
}, false);

function create(tag, attributes, children) {
    let el = DOC.createElement(tag);
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
