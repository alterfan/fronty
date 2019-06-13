class Gutter {
    append() {
        for (let index = 0; index < this.split_elements_length - 1; index++) {
            var gutter = create("div", {
                class: "gutter gutter-" + this.split_direction,
                style: "position:absolute;right:0"
            });
            this.styles(gutter);
            this.split_elements[index].append(gutter);
        }
    }
    styles(gutter) {
        switch (this.split_direction) {
            case "vertical":
                gutter.style.height = this.gutterSize;
                gutter.style.width = "100%";
            case "horizontal":
                gutter.style.width = this.gutterSize;
                gutter.style.height = "100%";
        }
    }
}
class Split extends Gutter {
    constructor(options) {
        super();
        this.split = document.querySelector(options.parent);
        this.split_elements = this.split.querySelectorAll(options.element);
        this.split_direction = options.direction;
        this.split_elements_length = this.split_elements.length;
        this.gutterSize = options.gutterSize;
        this.init()
    }
    init() {
        var elementSize = 100 / this.split_elements_length;
        for (let index = 0; index < this.split_elements_length; index++) {
            this.split_elements[index].style['flex-basis'] = "calc(" + elementSize + "%" + " - " + this.gutterSize + ")";
        }
        this.append();
    }
}
var split = new Split({
    parent: ".split-parent",
    element: '.split-element',
    direction: 'horizontal',
    gutterSize: "16px"
});

function create(tag, attributes, children) {
    let e = document.createElement(tag);
    if (typeof attributes == 'object') {
        for (var key in attributes) {
            e.setAttribute(key, attributes[key]);
            if (key.toLowerCase() == 'class') {
                e.className = attributes[key]; // for IE compatibility
            } else if (key.toLowerCase() == 'style') {
                e.style.cssText = attributes[key]; // for IE compatibility
            }
        }
    }
    if (children != undefined) {
        e.appendChild(children);
    }
    return e;
}