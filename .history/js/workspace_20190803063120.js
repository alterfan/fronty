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
        var sv = new Split({
            parent: "#workspace",
            elements: ".frontland-workspace-area",
            direction: "vertical",
            gutterSize: "12",
            sizes: [50, 50],
            minSizes: "40",
        });
        var sh = new Split({
            parent: "#editorsArea",
            elements: ".frontland-workspace-area-editor",
            sizes: [33, 33, 33],
            direction: "horizontal",
            gutterSize: "12",
            minSizes: "64",
        });
    }
    changeDirection(editorsArea, newDirection) {
        var layoutDirection = newDirection == "vertical" ? "vertical" : "horizontal";
        if (newDirection === this.config.editors.direction) {
            var direction = this.config.editors.direction;
        } else {
            $(editorsArea).removeClass(this.config.editors.direction);
        }
        $(editorsArea).addClass(direction);
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
        setCssOption("font-size", ls.getStorage("workspace")["font-size"], this.editors[name].cm);
        setCssOption("font-family", ls.getStorage("workspace")["font-family"], this.editors[name].cm);
    }
    get direction() {
        return ls.getStorageItem("workspace", "editors")["direction"]
    }
}