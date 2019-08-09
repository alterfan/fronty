'use strict';
const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';
const TIMEOUT = 20;
const OVERLAY = create("div", {
    id: "resizing-overlay",
    style: "display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000000;"
});
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
class Pair {
    constructor() {
        this.Direction;
        this.sizes;
        this.g = {};
        this.a = {};
        this.b = {};
        this.p = {};
    }
    get direction() {
        return this.Direction
    }
    set direction(direction) {
        this.Direction = direction
    }
    init(g) {
        this.g.node = g;
        this.parent = this.g.node.parentNode;
        this.elements = this.parent;
        this.direction = this.g.node.getAttribute("data-direction")
        this.isHorizontal = this.direction === HORIZONTAL;
        this.sizeAxis = this.isHorizontal ? "flex-basis" : "flex-basis";
        this.axis = this.isHorizontal ? "X" : "Y";
        this.offsetSize = this.isHorizontal ? "offsetWidth" : "offsetHeight";
        this.clientAxis = this.isHorizontal ? "clientX" : "clientY";
        this.index = this.g.node.getAttribute("data-index");
        this.a.node = document.querySelector("." + this.g.node.getAttribute("data-direction") + "-" + (this.index - 1));
        this.b.node = this.g.node.parentNode.querySelector("." + this.g.node.getAttribute("data-direction") + "-" + (this.index));
        this.a.offsetPos = this.isHorizontal ? this.a.node.offsetLeft : this.a.node.offsetTop;
        this.b.offsetPos = this.isHorizontal ? this.b.node.offsetLeft : this.b.node.offsetTop;
        this.a.size = getInt(this.a.node[this.offsetSize]);
        this.b.size = getInt(this.b.node[this.offsetSize]);
        this.p.node = this.g.node.parentNode;
        this.p.offsetPos = this.isHorizontal ? this.p.node.offsetLeft : this.p.node.offsetTop;
        this.p.offsetSize = this.isHorizontal ? this.p.node.offsetWidth : this.p.node.offsetHeight;
        this.sizes = ls.getStorage(this.Direction);
        this.g.offsetPos = this.a.size + this.a.offsetPos + this.p.offsetPos;
    }
    get parentSize() {
        return this.p.node[this.offsetSize]
    }
    destroy() {
        this.Direction = "";
        this.sizes = [];
        this.g = {};
        this.a = {};
        this.b = {};
        this.p = {};
        return
    }
}
var pair = new Pair();
class Split {
    constructor(options = {}) {
        this.Options;
        this.init(options)
    }
    set options(newOptions) {
        this.Options = newOptions
    }
    get options() {
        return this.Options
    }
    set direction(newDirection) {
        this.Options.direction = newDirection
    }
    get direction() {
        return this.Options.direction
    }
    set parent(parent) {
        this.parentNode = parent;
    }
    get parent() {
        return this.parentNode
    }
    set gutterSize(gutterSize) {
        this.Options.gutterSize = gutterSize
    }
    get gutterSize() {
        return this.Options.gutterSize
    }
    get splitedNodes() {
        return document.querySelectorAll(this.Options.parent + " > " + this.Options.elements);
    }
    init(options) {
        this.options = options;
        this.direction = this.options.direction;
        this.offsetSize = this.options.direction === HORIZONTAL ? "offsetWidth" : "offsetHeight";
        this.offsetPos = this.options.direction === HORIZONTAL ? "offsetLeft" : "offsetTop";
        this.cursor = this.options.direction === HORIZONTAL ? 'col-resize' : 'row-resize';
        this.parent = document.querySelector(this.options.parent);
        this.options.parentSize = this.parentNode[this.offsetSize];
        if (!document.getElementById("resizing-overlay")) document.body.appendChild(OVERLAY);
        if (this.splitedNodes !== null) {
            var sum = 0;
            var n = this.splitedNodes.length;
            var сache = getLocal(this.Options.direction) === null ? [] : getLocal(this.Options.direction);
            var ss = сache.length != 0 ? сache.reduce((first, last) => {
                return first + last
            }) : ss;
            for (var i = 0; i < n; i++) {
                var el = this.splitedNodes[i];
                el.classList.add(this.Options.direction + "-" + i);
                el.style.minHeight = 0;
                el.style.minWidth = 0;
                if (ss > 101 || ss < 99) сache[i] = this.options.parentSize / n / this.options.parentSize * 100;
                сache[i] = !сache[i] ? this.options.parentSize / n / this.options.parentSize * 100 : сache[i];
                resize(el, сache[i], "flex-basis");
                if (i < n - 1) {
                    sum += сache[i]
                    this.renderGutter(this.Options.parentSize / 100 * sum, i, sum);
                }
            }
            setLocal(this.Options.direction, сache);
        }
        return false
    }
    renderGutter(ghostPos, i, sum) {
        var axis = this.Options.direction === HORIZONTAL ? "X" : "Y",
            overlay = document.getElementById("resizing-overlay"),
            gutter = document.createElement("div");
        gutter.append(document.createElement("div"))
        gutter.className = "split-gutter " + this.Options.direction;
        gutter.setAttribute("data-direction", this.Options.direction);
        gutter.setAttribute("data-index", i + 1);
        gutter.setAttribute("draggble", "true");
        gutter.style[this.Options.direction === HORIZONTAL ? "width" : "height"] = this.options.gutterSize + "px";
        this.parent.insertBefore(gutter, this.splitedNodes[i + 1]);
        moveGutter(gutter, this.options.gutterSize, axis, ghostPos);
        addEventHandler(gutter.firstChild, "mousedown", (e) => {
            this.start(e);
            addEventHandler(overlay, "mousemove", (e) => {
                mouseMoveHandler(this.move(e))
            });
            addEventHandler(document, "mouseup", (e) => {
                this.done(e)
            });
        });
        addEventHandler(window, "resize", (e) => {
            moveGutter(gutter, this.options.gutterSize, axis, this.parent[this.offsetSize] / 100 * sum)
        });
    }
    changeDirection(newDirection) {
        var old_sizes, gutters;
        old_sizes = getLocal(this.Options.direction);
        console.log(this.Options.direction, old_sizes);
        console.log(this.Options.direction, newDirection);
        if (this.Options.direction !== newDirection) {
            gutters = document.querySelectorAll(".split-gutter." + this.Options.direction);
            for (var i = 0; i < gutters.length; i++) {
                const g = gutters[i];
                g.className = "split-gutter " + newDirection;
                g.setAttribute("data-direction", newDirection);
                moveGutter(g, this.options.gutterSize, newDirection == HORIZONTAL ? "X" : "Y", old_sizes[i]);
            }
            this.Options.direction = newDirection;
            setLocal(this.Options.direction, old_sizes);
        }
    }
    start(e) {
        let gutter = e.target.parentNode;
        if (!gutter.classList.contains("split-gutter")) return
        pair.init(gutter);
        pair.correct = e[pair.clientAxis] - pair.g.offsetPos;
        this.options.parentSize = this.parent[pair.offsetSize];
        document.getElementById("resizing-overlay").style.cursor = this.cursor;
        document.getElementById("resizing-overlay").style.display = "block";
        is.Move = true;
    }
    move(e) {
        if (!is.Move) return;
        let size = e[pair.clientAxis] - pair.p.offsetPos - pair.a.offsetPos + pair.correct,
            correct = this.options.gutterSize / 2,
            min = 0 + this.Options.minSizes,
            max = pair.b.offsetPos + pair.b.size - pair.correct - this.Options.minSizes;
        if (size < min) return
        if (size > max) return
        if (size > pair.p.offsetSize - correct) return
        resize(pair.a.node, px2flex(size, pair.p.offsetSize, false), pair.sizeAxis);
        resize(pair.b.node, px2flex((pair.a.size - size) + pair.b.size, pair.p.offsetSize, false), pair.sizeAxis);
        moveGutter(pair.g.node, this.options.gutterSize, pair.axis, pair.a.offsetPos + size);
    }
    done() {
        if (!is.Move) return;
        for (var i = 0; i < pair.sizes.length; i++) {
            var element = this.splitedNodes[i];
            if (element) pair.sizes[i] = getInt(element.style[pair.sizeAxis])
        }
        setLocal(pair.options.direction, pair.sizes);
        let overlay = document.getElementById("resizing-overlay");
        overlay.style.display = "none";
        removeEventHandler(overlay, "mousemove", this.move);
        removeEventHandler(document, "mouseup", this.done);
        pair.destroy();
        is.Move = false;
    }
};
const resize = (element, precents, sizeAxis) => {
    if (window.requestAnimationFrame) requestAnimationFrame;
    else if (window.msRequestAnimationFrame) msRequestAnimationFrame;
    else if (window.oRequestAnimationFrame) oRequestAnimationFrame;
    else if (window.mozRequestAnimationFrame) mozRequestAnimationFrame;
    else if (window.webkitRequestAnimationFrame) webkitRequestAnimationFrame;
    setTimeout(() => {
        element.style[sizeAxis] = precents + "%"
    }, TIMEOUT)
}
const moveGutter = (ghost, size, axis, pos) => {
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
    var s = getInt((getInt(size) / getInt(maxSize)) * 100);
    if (s >= maxSize) return;
    if (s < 0) return;
    if (showPrecentage) s = s + "%";
    return s;
}
//Helper functions
function create(tag, attributes, children) {
    let el = document.createElement(tag);
    if (typeof attributes == 'object') {
        for (var key in attributes) {
            if (key.toLowerCase() == 'class') {
                el.className = attributes[key]; // for IE compatibility
            } else if (key.toLowerCase() == 'style') {
                el.style.cssText = attributes[key]; // for IE compatibility
            }
            el.setAttribute(key, attributes[key]);
        }
    }
    if (children != undefined) {
        el.appendChild(children);
    }
    return el;
}
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