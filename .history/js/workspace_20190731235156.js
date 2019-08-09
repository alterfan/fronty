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
        $.each(that.config.editors.instances, (indexInArray) => {
            const instance = this.config.editors.instances[indexInArray];
            that.renderEditor(editorsArea, instance)
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
        this.createEditor($textarea.get(0), (instance.mode + "__" + instance.id), instance.mode);
    }
    createEditor(textarea, name, mode) {
        new Editor(textarea, name, mode);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}