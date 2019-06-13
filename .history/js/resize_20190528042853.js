class Split {
    constructor(parent, element) {
        this.parent = document.querySelector(parent);
        this.splitElements = this.parent.querySelectorAll(parent + " " + element);
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