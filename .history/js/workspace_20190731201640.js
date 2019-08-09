"use strict";
class Workspace {
    constructor(root) {
        this.local=
        this.init(root);
    }
    init(root) {
        this.root = $(root);
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