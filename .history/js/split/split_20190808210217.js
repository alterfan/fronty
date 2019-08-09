'use strict';
const horizontal = 'horizontal';
const vertical = 'vertical';
const TIMEOUT = 20;
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
    init(g) {
        this.g.node = g;
        this.parent = this.g.node.parentNode;
        this.elements = this.parent;
        this.direction = this.g.node.getAttribute("data-direction")
        this.isHorizontal = this.direction === horizontal;
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
        this.p.node = this.b.node.parentNode;
        this.p.offsetPos = this.isHorizontal ? this.p.node.offsetLeft : this.p.node.offsetTop;
        this.p.offsetSize = this.isHorizontal ? this.p.node.offsetWidth : this.p.node.offsetHeight;
        this.sizes = ls.getStorage(this.direction);
        this.g.offsetPos = this.a.size + this.a.offsetPos + this.p.offsetPos;
    }
    get parentSize() {
        return this.p.node[this.offsetSize]
    }
    resize(a, b) {
        this.a.node.style.flexBasis = a
        this.b.node.style.flexBasis = b
    }
    destroy() {
        this.g.node = "";
        this.parent = "";
        this.elements = "";
        this.direction = "";
        this.isHorizontal = "";
        this.sizeAxis = "";
        this.axis = "";
        this.offsetSize = "";
        this.clientAxis = "";
        this.index = "";
        this.index = "";
        this.a.node = "";
        this.b.node = "";
        this.a.offsetPos = "";
        this.b.offsetPos = "";
        this.a.size = "";
        this.b.size = "";
        this.sizes = "";
        this.p.node = "";
        this.p.offsetPos = "";
        this.p.offsetSize = "";
        return
    }
}
class Split {
    constructor(options = {}) {
        this.parent;
        this.elements;
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
        this.offsetSize = this.direction === horizontal ? "offsetWidth" : "offsetHeight";
        this.offsetPos = this.direction === horizontal ? "offsetLeft" : "offsetTop";
        this.cursor = this.direction === horizontal ? 'col-resize' : 'row-resize';
        this.init()
    }
    get splitedNodes() {
        return document.querySelectorAll(this.parent + " > " + this.elements);
    }
    init() {
        this.parentNode = document.querySelector(this.parent);
        this.parentSize = this.parentNode[this.offsetSize];
        if (!document.getElementById("resizing-overlay")) document.body.appendChild(this.overlay);
        if (this.splitedNodes !== null) {
            var sum = 0;
            var n = this.splitedNodes.length;
            var сache = getLocal(this.direction) === null ? [] : getLocal(this.direction);
            var ss = сache.length != 0 ? сache.reduce((first, last) => {
                return first + last
            }) : ss;
            for (var i = 0; i < n; i++) {
                var el = this.splitedNodes[i];
                el.classList.add(this.direction + "-" + i);
                el.style.minHeight = 0;
                el.style.minWidth = 0;
                if (ss > 101 || ss < 99) сache[i] = this.parentSize / n / this.parentSize * 100;
                сache[i] = !сache[i] ? this.parentSize / n / this.parentSize * 100 : сache[i];
                resize(el, сache[i], "flex-basis");
                if (i < n - 1) {
                    sum += сache[i]
                    this.renderGutter(this.parentSize / 100 * sum, i, sum);
                }
            }
            setLocal(this.options.direction, сache);
        }
        return false
    }
    renderGutter(ghostPos, i, sum) {
        var axis = this.direction === horizontal ? "X" : "Y",
            overlay = document.getElementById("resizing-overlay"),
            gutter = document.createElement("div");
        gutter.append(document.createElement("div"))
        gutter.className = "split-gutter " + this.direction;
        gutter.setAttribute("data-direction", this.direction);
        gutter.setAttribute("data-index", i + 1);
        gutter.setAttribute("draggble", "true");
        gutter.style[this.direction === horizontal ? "width" : "height"] = this.gutterSize + "px";
        this.parentNode.insertBefore(gutter, this.splitedNodes[i + 1]);
        moveGutter(gutter, this.gutterSize, axis, ghostPos);
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
            moveGutter(gutter, this.gutterSize, axis, this.parentNode[this.offsetSize] / 100 * sum)
        });
    }
    changeDirection(newDirection) {
        var dir = newDirection == "horizontal" ? "vertical" : "horizontal";
        var old_sizes = getLocal(dir);
        console.log(this.direction, newDirection);
        var G = document.querySelectorAll(".split-gutter." + dir);
        for (var i = 0; i < G.length; i++) {
            const g = G[i];
            g.className = "split-gutter " + newDirection;
            g.setAttribute("data-direction", newDirection);
            moveGutter(g, this.gutterSize, newDirection === horizontal ? "X" : "Y", old_sizes[i]);
        }
        this.direction = newDirection;
        setLocal(newDirection, old_sizes);
    }
    start(e) {
        let gutter = e.target.parentNode;
        if (!gutter.classList.contains("split-gutter")) return
        pair.init(gutter);
        pair.correct = e[pair.clientAxis] - pair.g.offsetPos;
        this.parentSize = this.parentNode[pair.offsetSize];
        document.getElementById("resizing-overlay").style.cursor = this.cursor;
        document.getElementById("resizing-overlay").style.display = "block";
        is.Move = true;
    }
    move(e) {
        if (!is.Move) return;
        let size = e[pair.clientAxis] - pair.p.offsetPos - pair.a.offsetPos + pair.correct,
            correct = this.gutterSize / 2,
            min = 0 + this.minSizes,
            max = pair.b.offsetPos + pair.b.size - pair.correct - this.minSizes;
        if (size < min) return
        if (size > max) return
        if (size > pair.p.offsetSize - correct) return
        resize(pair.a.node, px2flex(size, pair.p.offsetSize, false), pair.sizeAxis);
        resize(pair.b.node, px2flex((pair.a.size - size) + pair.b.size, pair.p.offsetSize, false), pair.sizeAxis);
        moveGutter(pair.g.node, this.gutterSize, pair.axis, pair.a.offsetPos + size);
    }
    done() {
        if (!is.Move) return;
        for (var i = 0; i < pair.sizes.length; i++) {
            var element = this.splitedNodes[i];
            if (element) pair.sizes[i] = getInt(element.style[pair.sizeAxis])
        }
        setLocal(pair.direction, pair.sizes);
        let overlay = document.getElementById("resizing-overlay");
        overlay.style.display = "none";
        removeEventHandler(overlay, "mousemove", this.move);
        removeEventHandler(document, "mouseup", this.done);
        pair.destroy();
        is.Move = false;
    }
    destroy() {
        for (var i = 0; i < this.splitedNodes.length; i++) {
            var el = this.splitedNodes[i];
            el.classList.remove(this.direction + "-" + i);
        }
        setLocal(this.direction, []);
        if (document.getElementById("resizing-overlay")) document.getElementById("resizing-overlay").remove();
        for (var i = 0; i < document.querySelectorAll(".split-gutter." + this.direction).length; i++) {
            var el = document.querySelectorAll(".split-gutter." + this.direction)[i];
            el.remove();
        }
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