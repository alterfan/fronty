const change = (event) => console.log(event.key, event.newValue);
const app_config = local.getStorage("app.config");
const toggleCheckbox = (storageName, itemName, val) => {
    ls.setStorageItem(storageName, itemName, val);
};
const changeTheme = (e) => {
    const newVal = $(e.target).val();
    for (let i = 0; i < instances.length; i++) {
        setOption("theme", newVal, instances[i]);
    }
};
const changeFontSize = (e) => {
    const newVal = parseInt($(e.target).val());
    setCssOption($(e.target).attr("data-action"), newVal);
}
const changeFontFamily = (e) => {
    const newVal = $(e.target).val();
    setCssOption($(e.target).attr("data-action"), newVal);
}
$("[data-action=\"dev-mode\"]").attr("checked", app_config["dev-mode"]);
$("[data-action=\"autoupdate\"]").attr("checked", app_config["autoupdate"]);
$("[data-action=\"font-size\"]").attr("checked", app_config["font-size"]);

const SETTINGS = () => {
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

if (window.addEventListener) {
    window.addEventListener('storage', change, false);
} else if (window.attachEvent) {
    window.attachEvent('onstorage', change);
} else {
    window.onstorage = change;
}