"use strict";
const root = $("#workscpace");
class Workspace {
    constructor(root) {
        this.root = root
    }
    init() {
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        this.root.append(editorsArea, previewArea)
    }
}
const workspace = new Workspace(root);
workspace.init();