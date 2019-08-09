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
            class: "frontland-workspace-area"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area"
        }).append($("<div>", {
            class: "frontland-workspace-area-iframe"
        }).append($("<iframe>", {
            id: "preview"
        })));
        this.$root.append(editorsArea, previewArea);
        $.each(this.config.editors.instances, (indexInArray) => {
            const instance = this.config.editors.instances[indexInArray];
            const name = instance.mode + "__" + instance.id;
            this.createEditor("#editorsArea", name, instance.mode);
            this.changeDirection("#editorsArea", this.config.direction)
        });
    }
    changeDirection(editorsArea, newDirection) {
        var edDirection = newDirection == "vertical" ? "horizontal" : "vertical";
        this.$root.removeClass(this.config.direction)
        this.$root.addClass(newDirection);
        $(editorsArea).removeClass(this.config.direction == "vertical" ? "horizontal" : "vertical");
        $(editorsArea).addClass(edDirection);

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
        setCssOption("font-size", ls.getStorage("workspace")["font-size"], this.editors[name].cm);
        setCssOption("font-family", ls.getStorage("workspace")["font-family"], this.editors[name].cm);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}