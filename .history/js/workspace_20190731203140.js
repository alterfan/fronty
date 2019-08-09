"use strict";
class Workspace {
    constructor(root) {
        this.init(root);
    }
    init(root) {
        this.root = $(root);
        this.areas = ls.getStorageItem("workspace.area");
        this.render();
    }
    render() {
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        this.root.html(editorsArea);
        console.log(this.root,editorsArea, previewArea);
    }
}