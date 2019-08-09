"use strict";
class Workspace {
    constructor(root) {
        this.root = $(root);
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
    createEditorArea(id, classname) {
        return $("<div>", {
            class: "frontland-workspace-area flex"
        })
    }
    get direction() {
    }
}