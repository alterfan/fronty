var Settings = new class {
    get app_config() {
        return ls.getStorage("app.config");
    }
    get editor_options() {
        return ls.getStorage("editor.options");
    }
    init() {
        var that = this;
        $("[type=\"checkbox\"]").each(function(i, el) {
            var key = $(this).attr("data-action"),
                stor = $(this).attr("data-class");
            if ()
                if (that.app_config.hasOwnProperty(key))
                    $(this).attr("checked", that.app_config[key]);
        });
        $("[type=\"select\"]").each(function(i, el) {
            var key = $(this).attr("data-action");
            if (that.app_config.hasOwnProperty(key))
                $(this).val(that.app_config[key]);
        });
    }
}
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
    Settings.init()
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