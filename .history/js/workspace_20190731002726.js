let workspace = document.querySelector("#workspace");
console.log('workspace: ', workspace);
workspace.className="frontland-workspace"
const editorsArea = $create("div", {
    id: "editors",
    class: "frontland-workspace-area flexbox-row"
}, $create("div", {
    class: "flexbox-view"
}), $create("div", {
    class: "flexbox-view"
}), $create("div", {
    class: "flexbox-view"
}))
const previewArea = $create("div", {
    id: "preview",
    class: "frontland-workspace-area flexbox-column"
}, $create("div", {
    id: "preview",
    class: "frontland-workspace-area-preview"
}, $create("iframe", {
    id: "iframe",
    class: "frontland-workspace-area-preview-iframe"
})))
var dom = workspace.attachShadow({
    mode: 'open'
});
dom.appendChild(editorsArea);
dom.appendChild(previewArea);
function $create(tag, attributes, childrenNode) {
    let el = document.createElement(tag);
    if (typeof attributes !== "object")
        throw attributes;
    for (var attr in attributes) {
        el.setAttribute(attr, attributes[attr])
    }
    el.appendChild(childrenNode)
    return el
}