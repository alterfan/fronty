class Split {
    constructor(element) {
        this.splitElement = element;
    }
    init() {
        console.log(this.splitElement.length, this.splitElement)
    }
}
var split = new Split(['.split-element'])