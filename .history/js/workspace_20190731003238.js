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
    let el = document.createElement(tag);
    if (typeof SELECTORS !== "object")
        throw SELECTORS;
    for (var attr in SELECTORS) {
        const attr = attr[i];
        el.setAttribute(attr, )
    }
    el.appendChild(children);
    return el
}
script type = "text/javascript"
src = "./js/workspace.js" > < /script>