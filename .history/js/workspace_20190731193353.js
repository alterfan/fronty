"use strict";
const root = document.querySelector("#workscpace");
class Workspace {
    init(direction) {
        var editorsArea = document.createElement("div");
        editorsArea.id="editorsArea"
        editorsArea.className = "frontland-workspace-area " + direction;
        var previewArea = document.createElement("div");
        previewArea.className = "frontland-workspace-area flexbox-column";
    }
}