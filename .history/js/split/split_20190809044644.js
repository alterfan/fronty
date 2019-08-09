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
    get sizes() {
        return this.size
    }
    set sizes(direction) {
        this.size = direction
    }
    init(g) {
        this.g.node = g;
        this.direction = this.g.node.getAttribute("data-direction");
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
        this.p.offsetPos = this.isHorizontal ? this.p.node.getBoundingClientRect().left : this.p.node.getBoundingClientRect().top;
        this.p.offsetSize = this.isHorizontal ? this.p.node.offsetWidth : this.p.node.offsetHeight;
        this.p.id = "#" + pair.p.node.id;
        this.g.offsetPos = this.a.size + this.a.offsetPos + this.p.offsetPos;
    }
    get parentSize() {
        return this.p.node[this.offsetSize]
    }
    destroy() {
        this.direction = "";
        this.sizes = "";
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
        this.Options.parent = parent;
        this.Elements = document.querySelectorAll(parent + " > .split-element");
        this.Parent = document.querySelector(this.options.parent);
    }
    get parent() {
        return this.Parent
    }
    get gutterSize() {
        return this.Options.gutterSize
    }
    get splitedNodes() {
        return document.querySelectorAll(this.options.parent + " > " + this.options.elements);
    }
    init(options) {
        this.options = options;
        this.direction = options.direction;
        this.offsetSize = options.direction === HORIZONTAL ? "offsetWidth" : "offsetHeight";
        this.offsetPos = options.direction === HORIZONTAL ? "offsetLeft" : "offsetTop";
        this.cursor = options.direction === HORIZONTAL ? 'col-resize' : 'row-resize';
        this.parent = options.parent;
        this.options.parentSize = this.parent[this.offsetSize];
        if (!document.getElementById("resizing-overlay")) document.body.appendChild(OVERLAY);
        if (this.splitedNodes !== null) {
            var sum = 0;
            var n = this.splitedNodes.length;
            var сache = getLocal(n + "." + this.options.direction) === null ? [] : getLocal(n + "." + this.options.direction);
            var ss = сache.length != 0 ? сache.reduce((first, last) => {
                return first + last
            }) : ss;
            for (var i = 0; i < n; i++) {
                var el = this.splitedNodes[i];
                el.classList.add(this.options.direction + "-" + i);
                el.classList.add("split-element");
                el.style.minHeight = 0;
                el.style.minWidth = 0;
                if (ss > 101 || ss < 99) сache[i] = this.options.parentSize / n / this.options.parentSize * 100;
                сache[i] = !сache[i] ? this.options.parentSize / n / this.options.parentSize * 100 : сache[i];
                resize(el, сache[i], "flex-basis");
                if (i < n - 1) {
                    sum += сache[i]
                    this.renderGutter(this.options.parentSize / 100 * sum, i, sum);
                }
            }
            setLocal(n + "." + this.options.direction, сache);
            setLocal(n + ".old." + this.Options.direction, сache);
        }
        return false
    }
    elements(parent) {
        return document.querySelectorAll(parent + " > .split-element");
    }
    renderGutter(ghostPos, i, sum) {
        var axis = this.options.direction === HORIZONTAL ? "X" : "Y",
            overlay = document.getElementById("resizing-overlay"),
            gutter = document.createElement("div");
        gutter.append(document.createElement("div"))
        gutter.className = "split-gutter " + this.options.direction;
        gutter.setAttribute("data-direction", this.options.direction);
        gutter.setAttribute("data-index", i + 1);
        gutter.setAttribute("draggble", "true");
        gutter.style[this.Options.direction === HORIZONTAL ? "width" : "height"] = this.gutterSize + "px";
        this.parent.insertBefore(gutter, this.splitedNodes[i + 1]);
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
            moveGutter(gutter, this.gutterSize, axis, this.parent[this.offsetSize] / 100 * sum)
        });
    }
    changeDirection(newDirection) {
        var old_sizes, gutters, el, sum,
            overlay = document.getElementById("resizing-overlay");
        if (this.direction !== newDirection) {
            var overlay = document.getElementById("resizing-overlay");
            old_sizes = getLocal(this.splitedNodes.length + ".old." + this.direction);
            sum = 0;
            var class_name_old = this.direction;
            console.log('class_name_old: ', class_name_old);
            var class_name = newDirection;
            var parent = document.querySelector(".split-gutter." + class_name_old).parentNode;
            parent
            gutters = parent.querySelectorAll(".split-gutter." + class_name_old);
            for (var i = 0; i < gutters.length; i++) {
                const g = gutters[i];
                sum = sum + this.parent[class_name == HORIZONTAL ? "offsetWidth" : "offsetHeight"] / 100 * old_sizes[i];
                el = document.querySelector("." + class_name_old + "-" + i);
                el.classList.toggle(class_name_old + "-" + i);
                el.classList.toggle(class_name + "-" + i);       
                g.style["height"] = 100 + "%";
                g.style["width"] = 100 + "%";
                g.style[newDirection === HORIZONTAL ? "width" : "height"] = this.gutterSize + "px";
                g.style["transform"] = "translate" + (class_name == HORIZONTAL ? "Y" : "X") + "(" + (sum - this.gutterSize / 2) + "px)";
                g.style["transform"] = "translate" + (class_name == HORIZONTAL ? "X" : "Y") + "(" + (sum - this.gutterSize / 2) + "px)";
                g.setAttribute("data-direction", class_name);
                g.className = "split-gutter " + class_name;
                removeEventHandler(g.firstChild, "mousedown");
                addEventHandler(g.firstChild, "mousedown", (e) => {
                    this.start(e);
                    addEventHandler(overlay, "mousemove", (e) => {
                        mouseMoveHandler(this.move(e))
                    });
                    addEventHandler(document, "mouseup", (e) => {
                        this.done(e)
                    });
                });
                addEventHandler(window, "resize", (e) => {
                    moveGutter(g, this.gutterSize, class_name == HORIZONTAL ? "Y" : "X", (sum - this.gutterSize / 2))
                });
            }
            this.direction = class_name;
            this.offsetSize = this.direction === HORIZONTAL ? "offsetWidth" : "offsetHeight";
            this.offsetPos = this.direction === HORIZONTAL ? "offsetLeft" : "offsetTop";
            this.cursor = this.direction === HORIZONTAL ? 'col-resize' : 'row-resize';
            setLocal(this.direction, old_sizes);
        } else {
            return
        }
    }
    start(e) {
        let gutter = e.target.parentNode;
        if (!gutter.classList.contains("split-gutter")) return
        pair.init(gutter);
        pair.correct = e[pair.clientAxis] - pair.g.offsetPos;
        document.getElementById("resizing-overlay").style.cursor = this.cursor;
        document.getElementById("resizing-overlay").style.display = "block";
        is.Move = true;
    }
    move(e) {
        if (!is.Move) return;
        let size = e[pair.clientAxis] + pair.correct - pair.p.offsetPos - pair.a.offsetPos,
            correct = this.gutterSize / 2,
            min = 0 + this.options.minSizes,
            max = pair.b.offsetPos + pair.b.size - pair.correct - this.options.minSizes;
        if (size < min) return
        if (size > max) return
        if (size > pair.p.offsetSize - correct) return
        resize(pair.a.node, px2flex(size, pair.p.offsetSize, false), pair.sizeAxis);
        resize(pair.b.node, px2flex((pair.a.size - size) + pair.b.size, pair.p.offsetSize, false), pair.sizeAxis);
        moveGutter(pair.g.node, this.gutterSize, pair.axis, pair.a.offsetPos + size);
    }
    done() {
        if (!is.Move) return;
        var overlay = document.getElementById("resizing-overlay");
        removeEventHandler(overlay, "mousemove", this.move);
        removeEventHandler(document, "mouseup", this.done);
        overlay.style.display = "none";
        pair.sizes = getLocal(this.elements(pair.p.id).length + "." + pair.direction, pair.sizes);
        for (var i = 0; i < pair.sizes.length; i++) {
            var element = document.querySelector("." + pair.direction + "-" + i);
            if (element) pair.sizes[i] = getInt(element.style[pair.sizeAxis]);
        }
        setLocal(pair.sizes.length + "." + pair.direction, pair.sizes);
        setLocal(pair.sizes.length + ".old." + pair.direction, pair.sizes);
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