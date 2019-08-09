$(document).ready(function() {
    if (ls.getStorage("workspace")["dev-mode"] === true) localStorage.clear();
    const Workspace = new WorkSpace("#workspace");
    var ui = new UI();
    Workspace.render("#workspace")
    var sv = new Split({
        parent: "#workspace",
        elements: ".frontland-workspace-area",
        direction: "vertical",
        gutterSize: "12",
        sizes: [50, 50],
        minSizes: "40",
    });/*  
     var sh = new Split({
         parent: "#workspace-editors",
         elements: ".area-split-vew",
         sizes: [33, 33, 33],
         direction: "horizontal",
         gutterSize: "12",
         minSizes: "64",
     }); */
    var sidebar = new Sidebar(["left", "right"], "#workspace");
    $(window || "#iframe").on("resize", function() {
        //  frameResolution();
    });
    $(document).ready(function() {
        // frameResolution();
        $("[data-action='project-name']").val(ls.getStorage("project.name"))
    });
    $(document).on("click", "[data-action=\"toggle-sidebar\"]", (e) => {
        sidebar.toggle(e.target);
    });
    $(document).on("click", "[data-action=\"close-sidebar\"]", (e) => {
        sidebar.close(e.target);
    });
    $(document).on("change", "[data-action=\"project-name\"]", (e) => {
        ls.setStorage("project.name", $(e.target).val())
    });
    $(document).on("change", "[type=\"checkbox\"]", (e) => {
        toggleCheckbox("workspace", $(e.target).attr("data-action"), e.target.checked)
    });
    console.log(Workspace.config.editors.instances.length);
var change = (event) => console.log(event.key, event.newValue);
var toggleCheckbox = (storageName, itemName, val) => {
    ls.setStorageItem(storageName, itemName, val);
};
var changeTheme = (e) => {
    var newVal = $(e.target).val();
    for (let i = 0; i <Workspace.config.editors.instances ; i++) {
        setOption("theme", newVal, instances[i]);
    }
};
var changeFontSize = (e) => {
    var newVal = parseInt($(e.target).val());
    setCssOption($(e.target).attr("data-action"), newVal);
}
var changeFontFamily = (e) => {
    var newVal = $(e.target).val();
    setCssOption($(e.target).attr("data-action"), newVal);
}
var Settings = new class {
    cachedParametrs(stor) {
        if (stor !== undefined)
            return ls.getStorage(stor);
    }
    init() {
        var that = this;
        $("[type=\"checkbox\"]").each(function(i, el) {
            var key = $(this).attr("data-action"),
                stor = $(this).attr("data-storage");
            if (that.cachedParametrs(stor).hasOwnProperty(key))
                $(this).attr("checked", that.cachedParametrs(stor)[key]);
        });
        $("select").each(function(i, el) {
            var key = $(this).attr("data-action"),
                stor = $(this).attr("data-storage");
            console.log('key: ', key);
            if (that.cachedParametrs(stor).hasOwnProperty(key))
                $(this).val(that.cachedParametrs(stor)[key]);
        });
    }
}
$(document).on("change", "[data-action=\"font-size\"]", (e) => {
    changeFontSize(e);
});
$(document).on("change", "[data-action=\"font-family\"]", (e) => {
    changeFontFamily(e);
});
$(document).on("change", "[data-action=\"theme\"]", (e) => {
    changeTheme(e);
});
if (window.addEventListener) {
    window.addEventListener('storage', change, false);
} else if (window.attachEvent) {
    window.attachEvent('onstorage', change);
} else {
    window.onstorage = change;
}
});