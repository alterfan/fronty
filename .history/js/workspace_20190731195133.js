"use strict";
const root = $("#workscpace");
class Workspace {
    constructor(root) {
        this.root = root;
        this.init();
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
        console.log('previewArea: ', previewArea);
        this.root.append(editorsArea)
    }
}