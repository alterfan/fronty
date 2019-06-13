const isString = (v) => {
    typeof v === 'string' || v instanceof String;
}

class Split {
    constructor(options) {
        super();
        this.split = document.querySelector(options.parent);
        this.split_elements = isString(options.element) ? this.split.querySelectorAll(options.element) : options.element;
        this.split_direction = options.direction;
        this.split_elements_length = this.split_elements.length;
        this.gutterSize = options.gutterSize;
        this.init()
    }

    get gutter() {
        return {
            append() {
                for (let index = 0; index < this.split_elements_length - 1; index++) {
                    var gutter = create("div", {
                        class: "gutter gutter-" + this.split_direction,
                        style: "position:absolute;right:0"
                    });
                    this.styles(gutter);
                    this.split_elements[index].append(gutter);
                }
            },
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