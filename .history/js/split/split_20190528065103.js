class Split {
    constructor(options) {
        this.split = document.querySelector(options.parent);
        this.split_elements = this.split.querySelectorAll(options.element);
        this.split_direction = options.direction;
        this.split_elements_length = this.split_elements.length;
    }
    init() {
        this.gutterSize = "16px";
        for (let index = 0; index < this.split_elements_length; index++) {
            this.split_elements[index].style['flex-basis'] = "calc(100% / " + (this.split_elements_length - parseInt(this.gutterSize)) + ")"
        }
        this.gutter();
    }
    gutter() {
        for (let index = 0; index < this.split_elements_length - 1; index++) {
            var gutter = create("div", {
                class: "gutter gutter-" + this.split_direction
            });
            this.split_elements[index].append(gutter);
        }
        this.gutterStyle(gutter)
    }
    gutterStyle(gutter) {
        for (let index = 0; index < gutter.length; index++) {
            switch (this.split_direction) {
                case "vertical":
                    gutter.style.height = this.gutterSize;
                    gutter.style.width = "100%";

                case "horisontal":
                    gutter.style.width = this.gutterSize;
                    gutter.style.height = "100%";
            }
        }

    }
}
var split = new Split({
    parent: ".split-parent",
    element: '.split-element',
    direction: 'horisontal',
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