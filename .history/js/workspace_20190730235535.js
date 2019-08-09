function $create(tag,[id, className], dataAttr) {
    var selectors = ["id", " class"],
        [];
    let el = document.createElement(tag);
    for (let i = 0; i < attr.length; i++) {
        const attr = attr[i];
        el.setAttribute(attr, )
    }
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
const workspaceArea = $create()
let myElements = $('#workspace')[0];
var workspace = myElements.attachShadow({
    mode: 'open'
});
workspace.innerHTML = content;