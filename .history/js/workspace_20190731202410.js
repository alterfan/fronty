"use strict";
class Workspace {
    constructor(root) {
        this.areas = ls.getStorageItem("workspace.area");
        this.init(root);
    }
    init(root) {
        this.root = $(root);
        for (const key in this.areas) {
            if (this.areas.hasOwnProperty(key)) {
                const area = this.areas[key];
                editorsArea.append($("<div>", {
                    id: area.mode + "=" + area.id,
                    class: "split-view flex"
                }))
            }
        }
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