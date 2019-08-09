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
        var $textarea = $("<textarea>", {
                id: instance.mode + "__" + instance.id,
                class: "code"
            }),
            $area = $("<div>", {
                class: "frontland-workspace-area-editor  splitview flex"
            }).append($textarea);
        parent.append($area);
        //this.createEditor($textarea.get(0), (instance.mode + "__" + instance.id), instance.mode);
       // console.log('this.editors: ', this.editors);
    }
    createEditor(textarea, name, mode) {
        let cm = new Editor(textarea, name, mode);
        this.editors[name] = cm
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}