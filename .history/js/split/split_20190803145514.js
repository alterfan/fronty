const H = 'horizontal';
const V = 'vertical';
const TIMEOUT = 10;
// Helper function checks if its argument is a string-like type
const isString = (v) => {
    v = typeof v === 'string' || v instanceof String
    return v
}
const isArr = (v) => {
    v = typeof v === 'array' || v instanceof Array
    return v
}
requestAnimFrame = function(fn) {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(fn) {
            window.setTimeout(fn, 1000 / 60);
        }
    );
};
// Helper function allows elements and string selectors to be used
// interchangeably. In either case an element is returned. This allows us to
// do `Split([elem1, elem2])` as well as `Split(['#id1', '#id2'])`.
const defaultOptions = {
    parent: ".split-parent",
    elements: '.split-element',
    minSizes: "64",
    sizes: 100,
    direction: 'horizontal',
    gutterSize: "16",
    minSizes: "64",
    adjust: "128"
}
const M = {
    click: 'click',
    dblclick: 'dblclick',
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup'
};
const T = {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend',
    cancel: 'touchcancel'
};
const is = {
    Move: false
};
const overflow = create("div", {
    id: "split-surface",
    style: "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000000;"
});
var pair = new class {
    constructor() {
        this.g = {};
        this.direction;
        this.a = {};
        this.b = {};
        this.p = {};
    }
    set init(g) {
        this.g.node = g;
        this.parent = this.g.node.parentNode;
        this.elements = this.parent;
        this.direction = this.g.node.getAttribute("data-direction") === H;
        this.offsetSize = this.direction ? "offsetWidth" : "offsetHeight";
        this.clientAxis = this.direction ? "clientX" : "clientY";
        this.index = this.g.node.getAttribute("data-index");
        this.a.node =document.querySelector("." + this.g.node.getAttribute("data-direction") + "-" + (this.index - 1));
        this.b.node = this.g.node.parentNode.querySelector("." + this.g.node.getAttribute("data-direction") + "-" + (this.index));
        this.a.offsetPos = this.direction ? this.a.node.offsetLeft : this.a.node.offsetTop;
        this.b.offsetPos = this.direction ? this.b.node.offsetLeft : this.b.node.offsetTop;
        this.a.size = getInt(this.a.node[this.offsetSize]);
        this.b.size = getInt(this.b.node[this.offsetSize]);
        this.p.node = this.b.node.parentNode;
    }
    get sizes() {
        let size = this.direction ? "offsetWidth" : "offsetHeight";
        return {
            a: this.a.node[size],
            b: this.b.node[size]
        }
    }
    get parentSize() {
        return this.b.node[this.offsetSize]
    }
    resize(a, b) {
        this.a.node.style.flexBasis = a
        this.b.node.style.flexBasis = b
    }
}
class Split {
    constructor(options = {}) {
        this.init(options);
    }
    options(options) {
        this.parent;
        this.elements;
        this.minSizes;
        this.sizes;
        this.direction;
        this.gutterSize;
        this.minSizes;
        this.adjust;
        for (var option in defaultOptions) {
            var prop = options.hasOwnProperty(option) ? options[option] : defaultOptions[option]
            this[option] = options.hasOwnProperty(option) ? options[option] : defaultOptions[option];
            if (prop == null) 100;
        }
        this.gutterClass = "split-gutter split-gutter-" + this.direction;
    }
    init(options) {
        var that = this;
        this.options(options);
        this.styleElements();
        this.renderGutter(this.eNodes.length);
        addEventHandler(document, M.down, (e) => {
            that.start(e);
            addEventHandler(document, M.move, (e) => {
                mouseMoveHandler(that.move(e))
            });
            addEventHandler(document, M.up, (e) => {
                that.done(e)
            });
        });
        addEventHandler(document, T.start, (e) => {
            event.preventDefault();
            event.stopPropagation();
            that.start(e);
            addEventHandler(document, T.move, (e) => {
                mouseMoveHandler(that.move(e))
            });
            addEventHandler(document, T.end, (e) => {
                that.done(e)
            });
        });
    }
    get pNode() {
        return document.querySelector(this.parent);
    }
    get eNodes() {
        return this.pNode.querySelectorAll(this.parent + ">" + this.elements);
    }
    get gNodes() {
        return document.querySelectorAll("this.elements");
    }
    renderGutter(elementLength) {
        var gutter,
            max = (elementLength - 1);
        for (var i = 0; i < max; i++) {
            gutter = document.createElement("div");
            gutter.className = this.gutterClass;
            gutter.setAttribute("data-index", i + 1);
            gutter.setAttribute("data-direction", this.direction);
            gutter.setAttribute("draggble", "true");
            gutter.style["flex-basis"] = this.gutterSize + "px";
            this.pNode.insertBefore(gutter, this.eNodes[i + 1]);
        }
        return gutter;
    }
    resize(element, flexBasis) {
        // Future-proof: when feature is fully standardized
        if (window.requestAnimationFrame) requestAnimationFrame;
        // IE implementation
        else if (window.msRequestAnimationFrame) msRequestAnimationFrame;
        // Firefox implementation
        else if (window.mozRequestAnimationFrame) mozRequestAnimationFrame;
        // Chrome implementation
        else if (window.webkitRequestAnimationFrame) webkitRequestAnimationFrame;
        // Other browsers that do not yet support feature
        setTimeout(() => {
            element.style['flex-basis'] = flexBasis
        }, 1)
    }
    styleElements() {
        var max, sum = 0,
            n = this.eNodes.length;
        var parentSize = this.pNode.offsetWidth - (this.gutterSize * (n - 1));
        for (var i = 0; i < n; i++) {
            var s = this.sizes[i];
            this.eNodes[i].classList.add(this.direction + "-" + i)
            sum = sum + s;
            if (i == n - 1) s = (100 - sum + s);
            this.resize(this.eNodes[i], s + "%");
        }
    }
    start(e) {
        if (!e.target.classList.contains("split-gutter")) return
        pair.init = e.target;
        pair.a.size = pair.a.node[pair.offsetSize];
        pair.b.size = pair.b.node[pair.offsetSize];
        this.parentSize = this.pNode[pair.offsetSize];
        document.body.style.cursor = this.direction ? 'col-resize' : 'row-resize';
        console.log('this.direction: ', this.direction);
        document.body.appendChild(overflow);
        is.Move = true;
        return false;
    }
    move(e) {
        if (!is.Move) return;
        let size = e[pair.clientAxis] - pair.a.offsetPos;
        this.resize(pair.a.node, px2flex(size, this.parentSize, true));
        this.resize(pair.b.node, px2flex((pair.a.size - size) + pair.b.size, this.parentSize, true));
    }
    done() {
        let el = document.getElementById("split-surface");
        if (!is.Move) return;
        if (el !== null) el.remove();
        document.body.style.cursor = "auto";
        is.Move = false;
        removeEventHandler(document, M.move, this.move);
        removeEventHandler(document, M.up, this.done);
    }
}
function mouseMoveHandler() {
    function move_listener(evnt) {
        if (!is.Move)
            return;
        ev = evnt || window.event; //for IE8
        timeout = setTimeout(move_handler, TIMEOUT);
    }
    ev = null;
    function move_handler(callback) {
        TIMEOUT = 0;
        isMove = true;
        if (typeof callback == "function")
            callback();
    }
}
//Helper functions
//cross browser event handling
//http://www.javascripter.net/faq/addeventlistenerattachevent.htm
function addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + eventType, handler);
}
function removeEventHandler(elem, eventType, handler) {
    if (elem.removeEventListener)
        elem.removeEventListener(eventType, handler, false);
    else if (elem.detachEvent)
        elem.detachEvent('on' + eventType, handler);
}
//Getters
function getInt(value) {
    return parseFloat(value);
}
function px2flex(size, maxSize, showPrecentage) {
    var s = (getInt(size) / getInt(maxSize)) * 100
    if (s >= maxSize) return;
    if (s < 0) return;
    if (showPrecentage) s = s + "%";
    return s;
}
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