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
            const instance = this.config.editors.instances[index];
            that.renderEditor(instance)
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex "
        });
        this.root.append(editorsArea, previewArea)
    }
    renderEditor(instance) {

        var $area = $("<div>", {
            class: "frontland-workspace-area-editor flex"
        }).append($("<textarea>", {
            id: instance.mode + "__" + instance.id
        }));
        editorsArea.append($area);
        this.createEditor(instance.mode)
    }
    createEditor(mode) {
        const id = that.config.editors.instances;
        new Editor("#workspace-editors", id, mode);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}