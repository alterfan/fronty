class Gutter {
    append() {
        for (let index = 0; index < this.split_elements_length - 1; index++) {
            var gutter = create("div", {
                class: "gutter gutter-" + this.split_direction,
                style: "position:absolute;right:0"
            });
            this.gutterStyles(gutter);
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
    }
    init() {
        this.gutterSize = "16px";
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
split.init();

function create(tag, attributes, children) {
    let e = document.createElement(tag),
        cObj = children,
        aObj = attributes;
    if (typeof aObj == 'object') {
        for (var key in aObj) {
            e.setAttribute(key, aObj[key]);
            if (key.toLowerCase() == 'class') {
                e.className = aObj[key]; // for IE compatibility
            } else if (key.toLowerCase() == 'style') {
                e.style.cssText = aObj[key]; // for IE compatibility
            }
        }
    }
    if (cObj != undefined) {
        if (Array.isArray(cObj)) {
            for (var i = 0; i < cObj.length; i++) {
                let obj = cObj[i];
                let _c = document.createElement(obj["tag"]);
                for (var key in obj) {
                    if (key != "tag") {
                        _c.setAttribute(key, obj[key]);
                        if (key.toLowerCase() == 'class') {
                            _c.className = obj[key]; // for IE compatibility
                        } else if (key.toLowerCase() == 'style') {
                            _c.style.cssText = obj[key]; // for IE compatibility
                        }
                    }
                }
                e.appendChild(_c);
            }
        } else {
            e.appendChild(cObj);
        }
    }
    return e;
}