let content = `
<div id="editors" class="frontland-workspace-area horizontal">
</div>
<div id="preview" class="frontland-workspace-area">
    <div class="frontland-workspace-area-preview">
        <iframe class="frontland-workspace-area-preview-iframe" id="iframe"></iframe>
    </div>
</div>
`;
let myElements = $('#workspace').get(0);
var workspace =myElements.attachShadow({
    mode: 'open'
});
workspace.innerHTML = content;