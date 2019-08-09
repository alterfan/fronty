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
    let el;
    if (tag) document.createElement(tag);
    if (typeof attributes !== "object") throw attributes;
    for (var attr in attributes) {
        const attr = attributes[attr];
        el.setAttribute(attr, )
    }
    el.appendChild(children);
    return el
}