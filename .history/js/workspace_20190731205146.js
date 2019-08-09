"use strict";
class Workspace {
    constructor() {}
    init(root) {
        this.root =document.querySelector(root);
        console.log('this.root: ', this.root);
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        $(".frontland-workspace").append(editorsArea)
    }
}