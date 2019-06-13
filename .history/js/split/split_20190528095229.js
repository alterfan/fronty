const H = 'horizontal';
const V = 'vertical';
const isString = (v) => {
    typeof v === 'string' || v instanceof String;
}
class Options {
    constructor(options) {
        this.options = options;
    }
    get parent() {
        return this.options.parent
    }
    get elements() {
        return this.options.elements
    }
    get direction() {
        return this.options.direction
    }
    get gutterSize() {
        return this.options.gutterSize
    }
}
class Elements {
    constructor(options) {
        this.options = options;

    }
    init() {
        this.split = document.querySelector(this.options.parent);
        this.split_elements = this.split.querySelectorAll(this.options.elements);
        this.split_direction = this.options.direction;
        this.split_elements_length = this.split_elements.length;
        var elementSize = 100 / this.split_elements_length;
        for (let index = 0; index < this.split_elements_length; index++) {
            this.split_elements[index].style['flex-basis'] = "calc(" + elementSize + "%" + " - " + this.gutterSize + ")";
        }
        this.gutter.append();
    }
}
class Split extends Options {
    constructor(options) {
        super(options);

        this.init()
    }
    init() {
        this.split = document.querySelector(this.options.parent);
        this.split_elements = this.split.querySelectorAll(this.options.element);
        this.split_direction = this.options.direction;
        this.split_elements_length = this.split_elements.length;
        var elementSize = 100 / this.split_elements_length;
        for (let index = 0; index < this.split_elements_length; index++) {
            this.split_elements[index].style['flex-basis'] = "calc(" + elementSize + "%" + " - " + this.gutterSize + ")";
        }
        this.gutter.append();
    }
    get gutter() {
        return {
            append() {
                for (let index = 0; index < this.split_elements_length - 1; index++) {
                    var gutter = create("div", {
                        class: "gutter gutter-" + this.split_direction,
                        style: "position:absolute;right:0"
                    });
                    this.gutter.styles(gutter);
                    this.split_elements[index].append(gutter);
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