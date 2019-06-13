class Split {
    constructor(parent, element, direction) {
        this.parent = document.querySelector(parent);
        this.splitElements = this.parent.querySelectorAll(element);
        this.direction = direction;

    }
    init() {
        let length = this.splitElements.length;

        for (let index = 0; index < length; index++) {
            this.splitElements[index].style['flex-basis'] = "calc(100% / " + length + ")"
            console.log(this.splitElements[index].style['flex-basis'])
        }
    }
    initGutter(){
        let length = this.splitElements.length;
        this.gutter = create("div", {
            class: "gutter gutter-" + this.direction
        });
        this.gutterSize = "16px";
        for (let index = 0; index < length - 1; index++) {
            this.splitElements[index].style['flex-basis'] = "calc(100% / " + length + ")"
            console.log(this.splitElements[index].style['flex-basis'])
        }
    }
}
var split = new Split(".split-parent", '.split-element', 'horisontal');
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