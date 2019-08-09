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
        for (let i = 0; i < instances.length; i++) {

            setOption("theme", newVal, instances[i]);
        }
    });
}
var toggleCheckbox = (storageName, itemName, val) => {
    local.setStorageItem(storageName, itemName, val);
};