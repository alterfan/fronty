"use strict";
class Workspace {
    constructor(root) {
        this.init(root);
    }
    init(root) {
        this.areas=ls.getStorageItem("workspace.area")
        this.root = $(root);
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        this.root.html(editorsArea, previewArea)
        console.log(' this.root.html(editorsArea, previewArea): ',  this.root.html());
    }
}