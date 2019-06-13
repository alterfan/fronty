class Split {
    constructor(parent, element) {
        this.parent = document.querySelector(parent);
        this.splitElements = this.parent.querySelectorAll(element);
        this.gutter = document.createElement("div");
        this.gutterSize = "16px"
    }
    init() {
        for (let index = 0; index < this.splitElements.length; index++) {
            this.splitElements[index].style['flex-basis'] = "calc(100% / " + this.splitElements.length + ")"
            console.log(this.splitElements[index].style['flex-basis'])
        }
    }
}
var split = new Split(".split-parent", '.split-element');
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