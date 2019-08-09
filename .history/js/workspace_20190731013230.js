const workspaceArea = $create("div", {
    id: "workspace-editors",
    class: "frontland-workspace-area flexbox-row"
}, $create("div", {
    class: "frontland-workspace-area-view"
}), $create("div", {
    class: "frontland-workspace-area-view"
}), $create("div", {
    class: "frontland-workspace-area-view"
}));
const previewArea = $create("div", {
    id: "workspace-preview",
    class: "frontland-workspace-area flexbox-column"
}, $create("div", {
        class: "frontland-workspace-area-view"
    },
    $create("iframe", {
        id: "iframe"
    })));
let workspace = $('#workspace')[0];
workspace = workspace.attachShadow({
    mode: 'open'
});
function init() {
    workspace.appendChild(workspaceArea);
    workspace.appendChild(previewArea);
    return true
}
function $create(elem, attributes, ...childrens) {
    if (!elem) throw "Не указаn тэг"
    elem = document.createElement(elem);
    if (typeof attributes == "object") {
        for (var attr in attributes) {
            elem.setAttribute(attr, attributes[attr])
        }
    } else {
        throw "set attributes failed!! 2 arg is not OBJECT"
    }
    if (childrens) {
        for (let i = 0; i < childrens.length; i++) {
            const node = childrens[i];
            elem.append(node);
        }
    }
    return elem
}