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
        $.each(that.config.editors.instances, (indexInArray) => {
            that.renderEditor(indexInArray)
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex "
        });
        this.root.append(editorsArea, previewArea)
    }
    renderEditor(index) {
        const instance = this.config.editors.instances[index];
        var $area = $("<div>", {
            class: "frontland-workspace-area-editor flex"
        }).append($("<textarea>", {
            id: instance.mode + "__" + instance.id
        }));
        editorsArea.append($area);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}