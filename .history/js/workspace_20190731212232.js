"use strict";
class Workspace {
    constructor(root) {
        this.root = $(root);
    }
    init() {
        var that = this;
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex " + that.direction
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex "
        });
        this.root.append(editorsArea, previewArea)
    }
    createEditorArea(id, classname) {
        return $("<div>", {
            class: "frontland-workspace-area flex"
        })
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}