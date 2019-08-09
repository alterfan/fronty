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
        $.each(that.config.editors.instances, function(indexInArray, valueOfElement) {
            const instance = that.config.editors.instances[indexInArray];
            console.log('instance: ', instance);
            var $area = $("<div>", {
                class: "frontland-workspace-area-editor flex"
            }, ("<textarea>", {
                id: instance.mode + "__" + instance.id
            })); 
            console.log('$area: ', $area);
            editorsArea.append($area)
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