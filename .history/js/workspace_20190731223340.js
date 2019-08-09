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
            const instance = this.config.editors.instances[indexInArray];
            that.renderEditor(editorsArea, instance)
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area flex "
        });
        this.root.append(editorsArea, previewArea)
    }
    renderEditor(parent, instance) {
        var $textarea = $("<textarea>", {
                id: instance.mode + "__" + instance.id
            }),
            $area = $("<div>", {
                class: "frontland-workspace-area-editor flex"
            }).append($textarea);
        parent.append($area);
        this.createEditor($textarea.get(0), instance.mode)
    }
    createEditor(mode) {
        const id = this.config.editors.instances;
        new Editor("#workspace-editors", id, mode);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}