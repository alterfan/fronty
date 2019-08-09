"use strict";
class Workspace {
    constructor(root) {
        this.init(root);
    }
    init(root) {
        this.root = $(root);
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        console.log($(root), this.root);
          this.root.append(editorsArea, previewArea)
    }
}