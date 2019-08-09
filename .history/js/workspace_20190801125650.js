class WorkSpace {
    constructor(root) {
        this.root = $(root);
        this.config = ls.getStorage("workspace");
        this.editors = {};
    }
    init() {
        var that = this;
        this.root.addClass(that.config.direction)
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area splitview flex " + that.config.editors.direction
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area splitview"
        }).append($("<iframe>", {
            id: "iframe"
        }));
        this.root.append(editorsArea, previewArea)
    }
    renderEditor(parent, instance) {
        //this.createEditor($textarea.get(0), (instance.mode + "__" + instance.id), instance.mode);
        // console.log('this.editors: ', this.editors);
    }
    createEditor(parentSelector, name, mode) {
        const $textarea = $("<textarea>", {
            id: name,
            class: "code"
        });
        const $area = $("<div>", {
            class: "frontland-workspace-area-editor  splitview flex"
        }).append($textarea);
        $(parentSelector).append($area);
        new Editor(name, mode);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}