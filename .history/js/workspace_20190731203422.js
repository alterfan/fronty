"use strict";
class Workspace {
    constructor(root) {
        this.init(root);
    }
    init(root) {
        this.areas = ls.getStorageItem("workspace.area");
        if (root)
            this.render(root);
    }
    render(root) {
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        $(root).html(editorsArea);
        console.log(this.root);
    }
}