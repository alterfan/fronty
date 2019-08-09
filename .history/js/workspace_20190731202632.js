"use strict";
class Workspace {
    constructor(root) {
        this.init(root);
    }
    init(root) {
        this.root = $(root);
        this.areas = ls.getStorageItem("workspace.area");
    }
    render() {
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area flex"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex"
        });
        for (const key in this.areas) {
            if (this.areas.hasOwnProperty(key)) {
                const area = this.areas[key];
                console.log('area: ', area);
                editorsArea.append($("<div>", {
                    id: area.mode + "=" + area.id,
                    class: "split-view flex"
                }))
            }
        }
        this.root.append(editorsArea, previewArea)
    }
}