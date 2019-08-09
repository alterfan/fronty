var SETTINGS = () => {
    $(document).on("change", "[data-action=\"font-size\"]", (e) => {
        changeFontSize(e);
    });
    $(document).on("change", "[data-action=\"font-family\"]", (e) => {
        changeFontFamily(e);
    });
    $(document).on("change", "[data-action=\"theme\"]", (e) => {
        changeTheme(e);
    });
}
var toggleCheckbox = (storageName, itemName, val) => {
    local.setStorageItem(storageName, itemName, val);
};
var changeTheme = (e) => {
    var newVal = $(e.target).val(),
        optArr = e.target.querySelectorAll("option");
    for (let i = 0; i < instances.length; i++) {
        setOption("theme", newVal, instances[i]);
    }
};
var changeFontSize = (e) => {
    var newVal = parseInt($(e.target).val()),
        optArr = e.target.querySelectorAll("option");
    setCssOption($(e.target).attr("data-action"), newVal);
}

var changeFontFamily = (e) => {
    var newVal = $(e.target).val(),
        optArr = e.target.querySelectorAll("option");
    setCssOption($(e.target).attr("data-action"), newVal);
}
window.addEventListener('storage', function(event) {
    console.log(event.key, event.newValue);
});