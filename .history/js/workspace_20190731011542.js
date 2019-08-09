let content = `
<div id="editors" class="frontland-workspace-area flexbox-row">
</div>
<div id="preview" class="frontland-workspace-area">
    <div class="frontland-workspace-area-preview">
        <iframe class="frontland-workspace-area-preview-iframe" id="iframe"></iframe>
    </div>
</div>
`;
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
workspace.appendChild(workspaceArea);
workspace.appendChild(previewArea);
function $create(tag, attributes, ...children) {
    if (!tag) throw "Не указаn тэг"
    tag = document.createElement(tag);
    if (typeof attributes == "object") {
        for (var attr in attributes) {
            tag.setAttribute(attr, attributes[attr])
        }
    } else {
        throw "set attributes failed!! 2 arg is not OBJECT"
    }
    if (children) {
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            tag.append(node);
        }
    }
    return tag
}