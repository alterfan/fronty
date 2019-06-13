class Split {
    constructor(element) {
        this.splitElements = document.querySelectorAll(element);
    }
    init() {
        for (let index = 0; index < this.splitElements.length; index++) {
            this.splitElements[index].style['flex-basis'] = "33.33%"
            console.log(this.splitElements[index], this.splitElements[index].style['flex-basis'])
        }
    }
}
var split = new Split(['.split-element']);
split.init();