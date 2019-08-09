var SETTINGS = () => {
    var cached = ls.getStorage("app.config");
    $(document).on("change", "[data-action=\"font-size\"]", (e) => {
        changeFontSize(e);
    });
    $(document).on("change", "[data-action=\"font-family\"]", (e) => {
        changeFontFamily(e);
    });
    $(document).on("change", "[data-action=\"theme\"]", (e) => {
        changeTheme(e);
    });
    $("[type=\"checkbox\"]").each(function(index, element) {
        var key = $(this).attr("checked", "data-action");
        if (cached[key])
            $("[data-action=\"" + key + "\"]").attr("checked", cached[key]);
    });
}
var change = (event) => console.log(event.key, event.newValue);
var toggleCheckbox = (storageName, itemName, val) => {
    ls.setStorageItem(storageName, itemName, val);
};
var changeTheme = (e) => {
    var newVal = $(e.target).val();
    for (let i = 0; i < instances.length; i++) {
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
if (window.addEventListener) {
    window.addEventListener('storage', change, false);
} else if (window.attachEvent) {
    window.attachEvent('onstorage', change);
} else {
    window.onstorage = change;
}