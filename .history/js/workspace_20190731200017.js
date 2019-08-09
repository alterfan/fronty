"use strict";
class Workspace {
    constructor(root) {
        this.init(root);
    }
    init() {
        this.root = root;
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        console.log($(this.root), this.root);
        $("#workspace").append(editorsArea, previewArea)
    }
}