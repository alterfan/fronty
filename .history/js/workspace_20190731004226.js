let content = `
<div id="editors" class="frontland-workspace-area horizontal">
</div>
<div id="preview" class="frontland-workspace-area">
    <div class="frontland-workspace-area-preview">
        <iframe class="frontland-workspace-area-preview-iframe" id="iframe"></iframe>
    </div>
</div>
`;
const workspaceArea = $create()
let workspace = $('#workspace')[0];
workspace = myElements.attachShadow({
    mode: 'open'
});
workspace.className = "frontland-workspace";
workspace.innerHTML = content;

function $create(tag, attributes, children) {
    if (!tag) throw "Не указаn тэг"
    if (!attributes)
        tag = document.createElement(tag);
    if (attributes && typeof attributes == "object") {
        for (var attr in attributes) {
            el.setAttribute(attr, attributes[attr])
        }
    } else {
        throw "set attributes failed!! 2 arg is not OBJECT"
    }
    if (typeof children == Node) el.appendChild(children);
    return el
}