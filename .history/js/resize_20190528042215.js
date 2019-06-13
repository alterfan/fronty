class Split {
    constructor(element) {
        this.splitElements = document.querySelectorAll(element);
    }
    init() {
        for (let index = 0; index < this.splitElements.length; index++) {
            console.log(this.splitElements[index], this.splitElements[index].style.flexBasis)


        }
    }
}
var split = new Split(['.split-element']);
split.init();