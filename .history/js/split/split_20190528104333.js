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
    get childsLength() {
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
        this.options.direction = this.options.direction;
        console.warn("options{");
        for (var key in this.options) {

            console.warn(key, this.options[key]);


        }
        console.warn("}");
        var elementSize = 100 / this.childsLength;
        for (let index = 0; index < this.childsLength; index++) {
            this.childs[index].style['flex-basis'] = "calc(" + elementSize + "%" + " - " + this.gutterSize + ")";
        }
        this.gutterInit(this.childsLength - 1);
    }
    gutterInit(gutterLength) {
        let gutter;
        for (let index = 0; index < gutterLength; index++) {
            gutter = create("div", {
                class: "gutter gutter-" + this.split_direction,
                style: "position:absolute;right:0"
            });
            this.gutterStyle(gutter);
            this.childs[index].append(gutter);
        }
    }
    gutterStyle(gutter) {
        switch (this.direction) {
            case V:
                gutter.style.height = this.gutterSize;
                gutter.style.width = "100%";
            case H:
                gutter.style.width = this.gutterSize;
                gutter.style.height = "100%";
        }
    }
}
var split = new Split({
    parent: ".split-parent",
    childs: '.split-element',
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