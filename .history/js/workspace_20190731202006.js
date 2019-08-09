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
                console.log('area: ', area);
            }
        }
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var editorContainer = $("<div>", {
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