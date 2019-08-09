$(document).ready(function() {
    if (ls.getStorage("workspace")["dev-mode"] === true) localStorage.clear()
    var ui = new UI();
    workspace.render("#workspace")
    /*  var sv = new Split({
         parent: "#workspace",
         elements: ".frontland-workspace-area",
         direction: "vertical",
         gutterSize: "12",
         sizes: [50, 50],
         minSizes: "40",
     });
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
});