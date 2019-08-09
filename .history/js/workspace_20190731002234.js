function $create(tag, attributes, children) {
    let el = document.createElement(tag);
    if (typeof attributes !== "object")
        throw attributes;
    for (var attr in attributes) {
        el.setAttribute(attr, attributes[attr])
    }
    if (children) el.appendChild(children)
    return el
}
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
let workspace = document.querySelector("#workspace");
workspace.className = "frontland-workspace flexbox-column";
var dom = workspace.attachShadow({
    mode: 'open'
});
dom.appendChild(editorsArea);
dom.appendChild(previewArea)