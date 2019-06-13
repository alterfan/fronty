const H = 'horizontal';
const V = 'vertical';
const isString = (v) => {
    typeof v === 'string' || v instanceof String;
}
class Settings {
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
}
class Split extends Settings {
    constructor(settings) {
        super();
        this.settings = settings;
        this.init()
    }
    init() {
        this.resizeble_direction = this.settings.direction;
        this.resizeble_length = this.resizeble.length;
        var elementSize = 100 / this.resizeble.length;
        for (let index = 0; index < this.resizeble_length; index++) {
            this.resizeble[index].style['flex-basis'] = "calc(" + elementSize + "%" + " - " + this.gutterSize + ")";
        }
        this.gutter.append();
    }
    get gutter() {
        return {
            append() {
                for (let index = 0; index < this.resizeble_length - 1; index++) {
                    var gutter = create("div", {
                        class: "gutter gutter-" + this.split_direction,
                        style: "position:absolute;right:0"
                    });
                    this.gutter.styles(gutter);
                    this.resizeble[index].append(gutter);
                }
            },
            styles(gutter) {
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
    }
}
var split = new Split({
    parent: ".split-parent",
    elements: '.split-element',
    direction: 'horizontal',
    gutterSize: "16px"
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