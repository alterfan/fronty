class WorkSpace {
    constructor(root) {
        this.init(root);
    }
    get savedConfig() {
        return ls.getStorage("workspace")
    }
    init(root) {
        this.config = ls.getStorage("workspace");
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
        this.changeDirection("#editorsArea", this.config.direction)
    }
    changeDirection(editorsArea, newDirection) {
        this.$root.removeClass(this.savedConfig.direction);
        console.log('this.config.direction: ', this.config.direction);
        ls.setStorageItem("workspace", "direction", newDirection)
        console.log('this.config.direction: ', this.config.direction);
        this.$root.addClass(newDirection)
        var editorsAreaDirection = newDirection == "vertical" ? "horizontal" : "vertical";
        $(editorsArea).removeClass(this.config.direction == "vertical" ? "horizontal" : "vertical");
        $(editorsArea).addClass(editorsAreaDirection);
        var sv = new Split({
            parent: "#workspace",
            elements: ".frontland-workspace-area",
            direction: newDirection,
            gutterSize: "12",
            sizes: [50, 50],
            minSizes: "40",
        });
        var sh = new Split({
            parent: "#editorsArea",
            elements: ".frontland-workspace-area-editor",
            sizes: [33, 33, 33],
            direction: editorsAreaDirection,
            gutterSize: "12",
            minSizes: "64",
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
        setCssOption("font-size", ls.getStorage("workspace")["font-size"], this.editors[name].cm);
        setCssOption("font-family", ls.getStorage("workspace")["font-family"], this.editors[name].cm);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}