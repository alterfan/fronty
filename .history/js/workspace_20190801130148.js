class WorkSpace {
    constructor(root) {
        this.root = $(root);
        this.config = ls.getStorage("workspace");
        this.editors = {};
        WorkSpace.init();
    }
   static init() {
        var that = this;
        WorkSpace.root.addClass(that.config.direction)
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
        WorkSpace.root.append(editorsArea, previewArea)
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
        this.editors[name] = new Editor(name, mode);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}