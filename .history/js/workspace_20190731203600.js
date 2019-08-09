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
        var workspace = $(root)
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        workspace.append(editorsArea, previewArea);
        console.log('workspace: ', workspace);
    }
}