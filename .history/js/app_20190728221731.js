if (local.getStorage("app.config")["dev-mode"] === true) localStorage.clear()
var ui = new UI();
var htmlEditor = new Editor("editors", 0, "htmlmixed");
var cssEditor = new Editor("editors", 1, "css");
var jsEditor = new Editor("editors", 2, "javascript");
htmlEditor.cm.setValue(local.getStorage("project.htmlmixed"));
cssEditor.cm.setValue(local.getStorage("project.css"));
jsEditor.cm.setValue(local.getStorage("project.javascript"));
var instances = [htmlEditor.cm, cssEditor.cm, jsEditor.cm];
var sv = new Split({
    parent: "#workspace",
    elements: ".fronty__wrapper__workspace__splited",
    direction: "vertical",
    gutterSize: "12",
    sizes: [50, 50],
    minSizes: "40",
});
var sh = new Split({
    parent: "#editors",
    elements: ".CodeMirror-wrapper",
    sizes: [33, 33, 33],
    direction: "horizontal",
    gutterSize: "12",
    minSizes: "64",
});
var sidebar = new Sidebar(["left", "right"], "#wrapper");
$(window || "#iframe").on("resize", function() {
    frameResolution();
});
$(document).ready(function() {
    frameResolution();
    $("[data-action='project-name']").val(local.getStorage("project.name"))
});
$(document).on("click", "[data-action=\"toggle-sidebar\"]", (e) => {
    sidebar.toggle(e.target);
    console.log('e.target: ', e.target);
});
$(document).on("click", "[data-action=\"close-sidebar\"]", (e) => {
    sidebar.close(e.target);
    console.log('e.target: ', e.target);
});
$(document).on("change", "[data-action=\"project-name\"]", (e) => {
    local.setStorage("project.name", $(e.target).val())
});
$(document).on("change", "[type=\"checkbox\"]", (e) => {
    toggleCheckbox("app.config", $(e.target).attr("data-action"), e.target.checked)
});