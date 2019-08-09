"use strict";
const root = $("#workscpace");
class Workspace {
    constructor(root) {
        this.root = root
    }
    init(direction) {
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        editorsArea.id = "editorsArea"
        editorsArea.className = "frontland-workspace-area flex " + direction;
        var previewArea= $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        this.root.classList.add()
        this.root.append(editorsArea, previewArea)
    }
}