class WorkSpace {
    constructor(root) {
        this.init(root);
        this.render()
    }
    init(root) {
        this.root = $(root);
        this.config = ls.getStorage("workspace");
        this.editors = {};
    }
    render() {
        var that = this;
        this.root.addClass(that.config.direction)
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area splitview flex " + that.config.editors.direction
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area splitview"
        }).append($("<div>", {
            id: "iframe-container"
        }).append($("<iframe>", {
            id: "iframe"
        })));
        this.root.append(editorsArea, previewArea);
        $.each(that.config.editors.instances, (indexInArray) => {
            const instance = that.config.editors.instances[indexInArray];
            const name = instance.mode + "__" + instance.id;
            that.createEditor("#editorsArea", name, instance.mode);
        });
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