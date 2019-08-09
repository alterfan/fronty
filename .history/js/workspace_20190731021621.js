const workspaceArea = $create("div", {
    id: "workspace-editors",
    class: "frontland-workspace-area flexbox-row"
});
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
function init() {
    workspace.appendChild(workspaceArea);
    workspace.appendChild(previewArea);
    return true
}
function $create(elem, attributes, ...childrens) {
    if (!elem) throw "Не указаn тэг"
    let arr = [];
    elem = document.createElement(elem);
    if (typeof attributes == "object") {
        for (var attr in attributes) {
            elem.setAttribute(attr, attributes[attr])
        }
    } else {
        throw "set attributes failed!! 2 arg is not OBJECT"
    }
    if (childrens) {
        for (let i = 0; i < childrens.length; i++) {
            let node = childrens[i];
            elem.appendChild(node);
        }
    }
    return elem
}

`<div class="group">
    <a data-action="toggle-sidebar" data-view="projects" data-side="left" class="group_btn material-icons">
        view_list
    </a>
    <input type="text" id="title" data-action="project-name" class="group_input isBlured" placeholder="Project Name">
</div>
<div class="group">
    <div class="group_separator"></div>
    <a data-target="ui" data-action="changeLayout" action="click" data-layout="horizontal" data-reverse="default" class="group_btn">
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect x="0" y="53" width="100" height="47"></rect>
            <rect y="0" x="0" width="29.33" height="47"></rect>
            <rect y="0" x="35.33" width="29.33" height="47"></rect>
            <rect y="0" x="70.66" width="29.33" height="47"></rect>
        </svg>
    </a>
    <a data-target="ui" data-action="changeLayout" action="click" data-layout="vertical" data-reverse="default" class="group_btn">
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect x="0" y="0" width="47" height="29.33"></rect>
            <rect x="0" y="35.33" width="47" height="29.33"></rect>
            <rect x="0" y="70.66" width="47" height="29.33"></rect>
            <rect x="53" y="0" width="47" height="100"></rect>
        </svg>
    </a>
    <a data-target="ui" data-action="changeLayout" action="click" data-layout="vertical" data-reverse="reverse" class="group_btn">
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect x="0" y="0" width="47" height="100"></rect>
            <rect x="53" y="0" width="47" height="29.33"></rect>
            <rect x="53" y="35.33" width="47" height="29.33"></rect>
            <rect x="53" y="70.66" width="47" height="29.33"></rect>
        </svg>
    </a>
    <div class="group_separator"></div>
    <a data-action="toggle-sidebar" data-view="settings" data-side="right" class="group_btn material-icons">
        settings
    </a>
</div>`