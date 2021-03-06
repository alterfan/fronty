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
            editorsArea.append(that.createEditor(indexInArray));
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex "
        });
        this.root.append(editorsArea, previewArea)
    }
    createEditor(ndexInArray, editorsArea) {
        const instance = this.config.editors.instances[indexInArray];
        console.log('instance: ', instance);
        var $area = $("<div>", {
            class: "frontland-workspace-area-editor flex"
        }).append($("<textarea>", {
            id: instance.mode + "__" + instance.id
        }));
        return $area
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}