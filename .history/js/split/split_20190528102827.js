const H = 'horizontal';
const V = 'vertical';
const isString = (v) => {
    typeof v === 'string' || v instanceof String;
}
class Options {
    get parent() {
        return document.querySelector(this.options.parent);
    }
    get resizeble() {
        return this.parent.querySelectorAll(this.options.elements);
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
            elements: '.split-element',
            direction: 'horizontal',
            gutterSize: "16px",
            minSize: "128px"
        }
    }
    get option(propName, defaults) {
        const value = options[propName]
        if (value !== undefined) {
            return value
        }
        return defaults
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
        let length = this.resizeble.length;
        var elementSize = 100 / length;
        for (let index = 0; index < length; index++) {
            this.resizeble[index].style['flex-basis'] = "calc(" + elementSize + "%" + " - " + this.gutterSize + ")";
        }
        this.gutterInit(length - 1);
    }
    gutterInit(gutterLength) {
        let gutter;
        for (let index = 0; index < gutterLength; index++) {
            gutter = create("div", {
                class: "gutter gutter-" + this.split_direction,
                style: "position:absolute;right:0"
            });
            this.gutterStyle(gutter);
            this.resizeble[index].append(gutter);
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
    elements: '.split-element',
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