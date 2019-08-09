class WorkSpace {
    constructor(root) {
        this.init(root);
    }
    init(root) {
        this.config = ls.getStorage("workspace");
        this.$root = $(root);
        this.editors = {};
        this.preview = {};
    }
    render(root) {
        this.$root.addClass(this.config.direction)
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area splitview flex "
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area splitview"
        }).append($("<div>", {
            id: "iframe-container"
        }).append($("<iframe>", {
            id: "iframe"
        })));
        this.$root.append(editorsArea, previewArea);
        $.each(this.config.editors.instances, (indexInArray) => {
            const instance = this.config.editors.instances[indexInArray];
            const name = instance.mode + "__" + instance.id;
            this.createEditor("#editorsArea", name, instance.mode);
            this.changeDirection("#editorsArea")
        });
    }
    changeDirection(editorsArea, newDirection) {
        var editorsDirection = !newDirection ? this.config.editors.direction : newDirection;
        var layoutDirection = editorsDirection == "vertical" ? "vertical" : "horizontal";
        console.log(layoutDirection, editorsDirection);
        $(editorsArea).toggleClass(editorsDirection);
        this.$root.toggleClass(layoutDirection);
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