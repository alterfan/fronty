"use strict";
class Workspace {
    constructor(root) {
        this.init(root);
    }
    init(root) {
        root = $(root);
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        console.log($(root), this.root);
        root.append(editorsArea, previewArea)
    }
}