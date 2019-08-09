'use strict';
const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';
const TIMEOUT = 10;
const defaultOptions = {
    parent: ".split-parent",
    elements: '.split-element',
    minSizes: "64",
    sizes: [100],
    direction: 'horizontal',
    gutterSize: "16",
    adjust: "128"
}
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
        this.direction = this.g.node.getAttribute("data-direction") === HORIZONTAL;
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
        this.sizes;
        this.direction;
        this.gutterSize;
        this.minSizes;
        this.adjust;
        this.options = options;
        for (var option in defaultOptions) {
            this[option] = this.options.hasOwnProperty(option) ? this.options[option] : defaultOptions[option];
        }
        this.overlay = create("div", {
            id: "resizing-overlay",
            style: "display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000000;"
        });
        this.init();
    }
    init() {
        if (!document.getElementById("resizing-overlay")) document.body.appendChild(this.overlay);
        this.sizeAxis = this.direction === HORIZONTAL ? "width" : "height";
        this.axis = this.direction === HORIZONTAL ? "X" : "Y";
        this.offsetSize = this.direction === HORIZONTAL ? "offsetWidth" : "offsetHeight";
        this.offsetPos = this.direction === HORIZONTAL ? "offsetLeft" : "offsetTop";
        this.cursor = this.direction === HORIZONTAL ? 'col-resize' : 'row-resize';
        this.parentNode = document.querySelector(this.parent);
        this.splitedNodes = document.querySelectorAll(this.parent + " > " + this.elements);
        this.gutterClass = "split-gutter-" + this.direction;
        this.parentSize = this.parentNode[this.offsetSize];
        if (this.splitedNodes !== null) {
            var size, sum = 0;
            var n = this.splitedNodes.length;
            var сache = getLocal(this.direction) === null ? [] : getLocal(this.direction);
            for (var i = 0; i < n; i++) {
                var el = this.splitedNodes[i];
                el.classList.add(this.direction + "-" + i);
                size = this.parentSize / n;
                сache[i] = сache[i] === undefined ? size / this.parentSize * 100 : сache[i];
                resize(el, this.sizeAxis, сache[i] + "%");
                if (i < n - 1) {
                    sum += сache[i];
                    this.renderGutter((this.parentSize / 100 * sum), i);
                }
            }
            setLocal(this.options.direction, сache);
        }
    }
    renderGutter(pos, index) {
        var gutter, gutterInner,
            overlay = document.getElementById("resizing-overlay");
        gutter = document.createElement("div");
        gutterInner = document.createElement("div");
        gutter.setAttribute("data-index", index + 1);
        gutter.setAttribute("data-direction", this.direction);
        gutter.style[this.sizeAxis] = this.gutterSize + "px";
        this.parentNode.insertBefore(gutter, this.splitedNodes[index + 1]);
        gutter.className = this.gutterClass;
        gutter.parentNode.style.position = "relative";
        gutter.append(gutterInner)
        moveGhost(gutter, this.gutterSize, this.axis, pos);
        addEventHandler(gutter.firstChild, "mousedown", (e) => {
            console.log('e.target: ', e.target.parentNode.className);
            this.start(e);
            addEventHandler(overlay, "mousemove", (e) => {
                mouseMoveHandler(this.move(e))
            });
            addEventHandler(document, "mouseup", (e) => {
                this.done(e)
            });
        });
        addEventHandler(gutter, "dblclick", (e) => {});
    }
    start(e) {
        let targt;
        if (e.target.classList.contains("split-gutter-" + this.direction)) {
            pair.init = targt = e.target;
        } else if (e.target.parentNode.classList.contains("split-gutter-" + this.direction)) {
            pair.init = targt = e.target.parentNode;
        } else {
            return
        }
        this.direction = targt.getAttribute("data-direction");
        console.log('this.direction: ', this.direction);
        pair.a.size = pair.a.node[pair.offsetSize];
        pair.b.size = pair.b.node[pair.offsetSize];
        this.parentSize = this.parentNode[pair.offsetSize];
        document.getElementById("resizing-overlay").style.cursor = this.cursor;
        document.getElementById("resizing-overlay").style.display = "block";
        is.Move = true;
        return false;
    }
    move(e) {
        let newSizeA, newSizeB, calcA;
        if (!is.Move) return;
        calcA = e[pair.clientAxis] - pair.a.offsetPos - pair.p.offsetPos;
        newSizeA = px2flex(calcA, this.parentSize, true);
        newSizeB = px2flex((pair.a.size - calcA) + pair.b.size, this.parentSize, true);
        if (calcA < 0 || calcA < this.minSizes) return;
        resize(pair.a.node, this.direction == HORIZONTAL ? "width" : "height", newSizeA);
        resize(pair.b.node, this.direction == HORIZONTAL ? "width" : "height", newSizeB);
        moveGhost(pair.g.node, this.gutterSize, this.axis, e[pair.clientAxis] - pair.p.offsetPos);
        this.oldSizeB = pair.b.node[this.offsetSize];
        this.oldSizeA = calcA;
    }
    done() {
        let el = document.getElementById("resizing-overlay");
        let sizes = [];
        if (!is.Move) return;
        el.style.display = "none";
        for (let i = 0; i < this.splitedNodes.length; i++) {
            let element = this.splitedNodes[i];
            let size = element[this.offsetSize] / this.parentNode[this.offsetSize] * 100;
            sizes.push(size);
        }
        this.sizeAxis = null;
        setLocal(this.direction, sizes);
        removeEventHandler(document, "mousemove", this.move);
        removeEventHandler(document, "mouseup", this.done);
    }
};
const resize = (element, sizeAxis, size) => {
    if (window.requestAnimationFrame) requestAnimationFrame;
    else if (window.msRequestAnimationFrame) msRequestAnimationFrame;
    else if (window.oRequestAnimationFrame) oRequestAnimationFrame;
    else if (window.mozRequestAnimationFrame) mozRequestAnimationFrame;
    else if (window.webkitRequestAnimationFrame) webkitRequestAnimationFrame;
    setTimeout(() => {
        element.style[sizeAxis] = size;
    }, TIMEOUT)
}
const moveGhost = (ghost, size, axis, pos) => {
    if (window.requestAnimationFrame) requestAnimationFrame;
    else if (window.msRequestAnimationFrame) msRequestAnimationFrame;
    else if (window.oRequestAnimationFrame) oRequestAnimationFrame;
    else if (window.mozRequestAnimationFrame) mozRequestAnimationFrame;
    else if (window.webkitRequestAnimationFrame) webkitRequestAnimationFrame;
    setTimeout(() => {
        ghost.style['transform'] = translate(axis, pos - (size / 2));
    }, TIMEOUT)
}
const translate = (axis, pos) => {
    return "translate" + axis + "(" + pos + "px)";
}
const mouseMoveHandler = () => {
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
const setLocal = (name, val) => {
    if (typeof val !== "string" || typeof val !== String) val = JSON.stringify(val)
    localStorage.setItem(name, val)
}
const getLocal = (name) => {
    let data = localStorage.getItem(name);
    if (data === null) return null;
    return JSON.parse(data);
}
const getInt = (value) => parseFloat(value)
const px2flex = (size, maxSize, showPrecentage) => {
    var s = (getInt(size) / getInt(maxSize)) * 100
    if (s >= maxSize) return;
    if (s < 0) return;
    if (showPrecentage) s = s + "%";
    return s;
}
const create = (tag, attributes, children) => {
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