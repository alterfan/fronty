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
    var l = document.createElement("link");
    l.href = "./src/codemirror/theme/" + newVal + ".css";
    l.rel = "stylesheet";
    l.theme = newVal;
    $("[theme=\"" + local.getStorageItem("editor.options", "theme") + "\"]").replace(ce);
    $("head").append(l);
    local.getStorageItem("editor.options", "theme", newVal);
});
var toggleCheckbox = (storageName, itemName, val) => {
    local.setStorageItem(storageName, itemName, val);
};