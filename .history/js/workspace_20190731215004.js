"use strict";
class Workspace {
    constructor(root) {
        this.root = $(root);
        this.config = ls.getStorage("workspace")
    }
    init() {
        var that = this;
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex " + that.config.editors.direction
        });

        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex "
        });
        this.root.append(editorsArea, previewArea)
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}