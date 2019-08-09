function $create(tag, {
    attributes
}, children) {
    let el = document.createElement(tag);
    if (typeof attributes !== "object")
        throw attributes;
    for (var attr in attributes) {
        el.setAttribute(attr, attributes[attr])
    }
    return el
}
let content = `
<div id="editors" class="frontland-workspace-area horizontal">
</div>
<div id="preview" class="frontland-workspace-area">
    <div class="frontland-workspace-area-preview">
        <iframe class="frontland-workspace-area-preview-iframe" id="iframe"></iframe>
    </div>
</div>
`;
const editors = $create("div", {
    id: "editors",
    class: "frontland-workspace-area"
})
const preview = $create("div", {
    id: "preview",
    class: "frontland-workspace-area"
}, $create("div", {
    id: "preview",
    class: "frontland-workspace-area-preview"
}, $create("iframe", {
    id: "iframe",
    class: "frontland-workspace-area-preview-iframe"
})))
let workspace = $('#workspace')[0];
var dom = workspace.attachShadow({
    mode: 'open'
});
dom.appendChild(editors);
dom.appendChild(preview)