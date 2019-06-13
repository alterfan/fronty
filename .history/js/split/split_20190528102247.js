const H = 'horizontal';
const V = 'vertical';
const isString = (v) => {
    typeof v === 'string' || v instanceof String;
}
class Options {
    get parent() {
        return document.querySelector(this.settings.parent);
    }
    get resizeble() {
        return this.parent.querySelectorAll(this.settings.elements);
    }
    get direction() {
        return this.settings.direction
    }
    get gutterSize() {
        return this.settings.gutterSize
    }
    get minSize() {
        return this.settings.minSize
    }
    get default() {
        return {
            parent: ".split-parent",
            elements: '.split-element',
            direction: 'horizontal',
            gutterSize: "16px",
            minSize: "128px"
        }
    }
}

class Split extends Options {
    constructor(settings) {
        super();
        this.settings = settings == null ? this.default : settings;
        this.init()
    }
    init() {
        this.settings.direction = this.settings.direction;
        let length = this.resizeble.length;
        var elementSize = 100 / length;
        for (let index = 0; index < length; index++) {
            this.resizeble[index].style['flex-basis'] = "calc(" + elementSize + "%" + " - " + this.gutterSize + ")";
        }
        this.gutterInit(length - 1);
    }
    gutterInit(gutterLength) {
        for (let index = 0; index < gutterLength; index++) {
            var gutter = create("div", {
                class: "gutter gutter-" + this.split_direction,
                style: "position:absolute;right:0"
            });
            this.gutterStyle(gutter);
            this.resizeble[index].append(gutter);
        }
    }
    gutterStyle(gutter) {
        switch (this.split_direction) {
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