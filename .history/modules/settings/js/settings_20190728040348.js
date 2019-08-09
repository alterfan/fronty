var SETTINGS = () => {
    $(document).on("change", "[data-action=\"font-size\"]", (e) => {
        var newVal = parseInt($(e.target).val()),
            optArr = e.target.querySelectorAll("option");
        setCssOption($(e.target).attr("data-action"), newVal);
    });
    $(document).on("change", "[data-action=\"font-family\"]", (e) => {
        var newVal = $(e.target).val(),
            optArr = e.target.querySelectorAll("option");
        setCssOption($(e.target).attr("data-action"), newVal);
    });
    $(document).on("change", "[data-action=\"theme\"]", (e) => {
        var newVal = $(e.target).val(),
            optArr = e.target.querySelectorAll("option");
        setTheme(newVal);
    });
}
var toggleCheckbox = (storageName, itemName, val) => {
    local.setStorageItem(storageName, itemName, val);
};
function setTheme(theme) {
    var l = document.createElement("link");
    l.href = "./src/codemirror/theme/" + theme + ".css";
    l.rel = "stylesheet";
    l.theme = theme;
    document.head.replaceChild(l, document.head.childNodes[4]);
    local.getStorageItem("editor.options", "theme", theme);
    htmlEditor.cm.setOption("theme", theme);
    cssEditor.cm.setOption("theme", theme);
    jsEditor.cm.setOption("theme", theme);
}