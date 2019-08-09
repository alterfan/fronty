class WorkSpace {
    constructor(root) {
        this.init(root);
    }
    get config() {
        return ls.getStorage("workspace")
    }
    init(root) {
        this.$root = $(root);
        this.editors = {};
        this.preview = {};
    }
    render(root) {
        var editorsArea = $("<div>", {
            id: "editorsArea",
            class: "frontland-workspace-area"
        });
        var previewArea = $("<div>", {
            id: "previewArea",
            class: "frontland-workspace-area"
        }).append($("<div>", {
            class: "frontland-workspace-area-bar"
        })).append($("<div>", {
            class: "frontland-workspace-area-iframe"
        }).append($("<iframe>", {
            id: "preview"
        })));
        this.$root.append(editorsArea, previewArea);
        $.each(this.config.editors.instances, (indexInArray) => {
            const instance = this.config.editors.instances[indexInArray];
            const name = instance.mode + "__" + instance.id;
            this.createEditor("#editorsArea", name, instance.mode);
        });
        this.changeDirection("#editorsArea", this.config.direction);
    }
    changeDirection(editorsArea, newDirection) {
        this.$root.removeClass(this.config.direction);
        this.$root.addClass(newDirection);
        var editorsAreaDirection = newDirection == "vertical" ? "horizontal" : "vertical";
        $(editorsArea).removeClass(this.config.direction == "vertical" ? "horizontal" : "vertical");
        $(editorsArea).addClass(editorsAreaDirection);
        ls.setStorageItem("workspace", "direction", newDirection)
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