class Split {
    constructor(element) {
        this.splitElement = document.querySelectorAll(element);
    }
    init() {
        console.log(this.splitElement.length, this.splitElement)
    }
}
var split = new Split(['.split-element'])