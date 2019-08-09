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
let myElements = $('#workspace')[0];
var workspace = myElements.attachShadow({
    mode: 'open'
});
workspace.innerHTML = content;

function $create(tag, attributes, children) {
    if (!tag) throw tag
    let el = document.createElement(tag);
    if (!attributes || typeof attributes !== "object") throw attributes;
    for (var attr in attributes) {
   
        el.setAttribute(attr, attributes[attr])
    }
    el.appendChild(children);
    return el
}