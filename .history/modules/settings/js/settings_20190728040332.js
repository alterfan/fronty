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

        setTheme(l, newVal);
    });
}
var toggleCheckbox = (storageName, itemName, val) => {
    local.setStorageItem(storageName, itemName, val);
};

function setTheme(l, newVal) {
    var l = document.createElement("link");
    l.href = "./src/codemirror/theme/" + newVal + ".css";
    l.rel = "stylesheet";
    l.theme = newVal;
    document.head.replaceChild(l, document.head.childNodes[4]);
    local.getStorageItem("editor.options", "theme", newVal);
    htmlEditor.cm.setOption("theme", newVal);
    cssEditor.cm.setOption("theme", newVal);
    jsEditor.cm.setOption("theme", newVal);
}