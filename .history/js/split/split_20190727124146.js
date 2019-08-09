'use strict';
const horizontal = 'horizontal';
const vertical = 'vertical';
const TIMEOUT = 10;
var requestAnimFrame = function(fn) {
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
        this.direction = this.g.node.getAttribute("data-direction") === horizontal;
        this.offsetSize = this.direction ? "offsetWidth" : "offsetHeight";
        this.clientAxis = this.direction ? "clientX" : "clientY";
        this.index = this.g.node.getAttribute("data-index");
        this.a.node = document.querySelector("." + this.g.node.getAttribute("data-direction") + "-" + (this.index - 1));
        this.b.node = this.g.node.parentNode.querySelector("." + this.g.node.getAttribute("data-direction") + "-" + (this.index));
        this.a.offsetPos = this.direction ? this.a.node.offsetLeft : this.a.node.offsetTop;
        this.b.offsetPos = this.direction ? this.b.node.offsetLeft : this.b.node.offsetTop;
        this.a.size = getInt(this.a.node[this.offsetSize]);
        this.b.size = getInt(this.b.node[this.offsetSize]);
        this.p.node = this.b.node.parentNode;
        this.p.offsetPos = this.direction ? this.p.node.offsetLeft : this.p.node.offsetTop;
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
        this.parent;
        this.elements;
        this.minSizes;
        this.sizes;
        this.direction;
        this.gutterSize;
        this.minSizes;
        this.adjust;
        this.options = options;
        for (var option in defaultOptions) {
            this[option] = this.options.hasOwnProperty(option) ? this.options[option] : defaultOptions[option];
        }
        this.init();
    }
    // get parentNode() {
    //     return document.querySelector(this.parent);
    // }
    // get splitedNodes() {
    //     return this.parentNode.querySelectorAll(this.elements);
    // }
    init() {
        this.axis = this.direction === horizontal;
        this.offsetSize = this.direction === horizontal ? "offsetWidth" : "offsetHeight";
        this.cursor = this.axis ? 'col-resize' : 'row-resize';
        this.surface = create("div", {
            id: "split-surface",
            style: "display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000000;"
        });
        this.parentNode = document.querySelector(this.parent);
        this.splitedNodes = document.querySelectorAll(this.parent + " > " + this.elements) || document.querySelectorAll(this.parent + ">div>" + this.elements);
        this.gutterClass = "split-gutter split-gutter-" + this.direction;
        this.parentSize = this.parentNode[this.offsetSize];
        if (this.splitedNodes !== null) {
            if (!document.getElementById("split-surface")) document.body.appendChild(this.surface);
            this.styleElements();
            this.renderGutter();
        }
    }
    _getSizes() {
        let sizes = [];
        for (let i = 0; i < this.splitedNodes.length; i++) {
            let element = this.splitedNodes[i],
                size = element[this.offsetSize] / this.parentNode[this.offsetSize] * 100;
            console.log(element.className, element[this.offsetSize], this.parentNode[this.offsetSize]);
            sizes.push(size);
        }
        return sizes
    }
    renderGutter() {
        var gutter,
            max = (this.splitedNodes.length - 1),
            _surface = document.getElementById("split-surface");
        for (var i = 0; i < max; i++) {
            gutter = document.createElement("div");
            gutter.className = this.gutterClass;
            gutter.setAttribute("data-index", i + 1);
            gutter.setAttribute("data-direction", this.direction);
            gutter.setAttribute("draggble", "true");
            gutter.style["flex-basis"] = this.gutterSize + "px";
            this.parentNode.insertBefore(gutter, this.splitedNodes[i + 1]);
            addEventHandler(gutter, M.down, (e) => {
                this.start(e);
                addEventHandler(_surface, M.move, (e) => {
                    mouseMoveHandler(this.move(e))
                });
                addEventHandler(_surface, M.up, (e) => {
                    this.done(e)
                });
            });
        }
        return gutter;
    }
    resize(element, flexBasis) {
        if (window.requestAnimationFrame) requestAnimationFrame;
        else if (window.msRequestAnimationFrame) msRequestAnimationFrame;
        else if (window.mozRequestAnimationFrame) mozRequestAnimationFrame;
        else if (window.webkitRequestAnimationFrame) webkitRequestAnimationFrame;
        setTimeout(() => {
            element.style['flex-basis'] = flexBasis
        }, 1)
    }
    styleElements() {
        var sizes, arr, flexBasis, sum, n;
        sum = 0;
        arr = [];
        n = this.splitedNodes.length;
        sizes = getLocal("CodeMirror.split." + this.direction);
        for (var i = 0; i < n; i++) {
            var el = this.splitedNodes[i];
            el.classList.add(this.direction + "-" + i);
            flexBasis = this.sizes[i] || (100 / n);
            sum = sum + flexBasis;
            if (i == n - 1) flexBasis = (100 - sum + flexBasis);
            flexBasis = sizes[i];
            if (!sizes) flexBasis = (this.parentSize - (this.gutterSize * (n - 1))) / n / this.parentSize * 100
            console.log('flexBasis: ', flexBasis);
            if (flexBasis !== null) arr.push(flexBasis)
            this.resize(el, flexBasis + "%");
        }
        setLocal("CodeMirror.split." + this.options.direction, arr);
    }
    start(e) {
        if (!e.target.classList.contains("split-gutter-" + this.direction)) return
        pair.init = e.target;
        pair.a.size = pair.a.node[pair.offsetSize];
        pair.b.size = pair.b.node[pair.offsetSize];
        this.parentSize = this.parentNode[pair.offsetSize];
        document.getElementById("split-surface").style.cursor = this.cursor;
        document.getElementById("split-surface").style.display = "block";
        is.Move = true;
        return false;
    }
    move(e) {
        if (!is.Move) return;
        let size = e[pair.clientAxis] - pair.a.offsetPos - pair.p.offsetPos - (this.gutterSize / this.splitedNodes.length);
        this.resize(pair.a.node, px2flex(size, this.parentSize, true));
        this.resize(pair.b.node, px2flex((pair.a.size - size) + pair.b.size, this.parentSize, true));
    }
    done() {
        let el = document.getElementById("split-surface");
        let sizes = [];
        if (!is.Move) return;
        el.style.display = "none";
        for (let i = 0; i < this.splitedNodes.length; i++) {
            let element = this.splitedNodes[i];
            let size = element[this.offsetSize] / this.parentNode[this.offsetSize] * 100;
            sizes.push(size);
        }
        setLocal("CodeMirror.split." + this.direction, sizes);
        removeEventHandler(document, M.move, this.move);
        removeEventHandler(document, M.up, this.done);
    }
}
function mouseMoveHandler() {
    var ev;
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
function setLocal(name, val) {
    if (typeof val !== "string" || typeof val !== String) val = JSON.stringify(val)
    localStorage.setItem(name, val)
}
function getLocal(name) {
    let data = localStorage.getItem(name);
    if (data === null) return false;
    return JSON.parse(data);
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
function getPos(elementNode) {
    return elementNode.getBoundingClientRect()
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