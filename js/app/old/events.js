$(window).ready(function () {
    if (storage.init()) {
        ui.changeLayout(storage.getKey("local", frontyOptions, "layout"));
        ed.changeFontSize(storage.getKey("local", frontyOptions, "fontSize"));
        ed.changeFontFamily(storage.getKey("local", frontyOptions, "fontFamily"));
    }
});
/** переключатель автообновления */
$(document).on('click', '[data-action="autoUpdate"]', function () {
    ed.autoUpdate();
});
/** обновить предпросмотр */
$(document).on('click', '[data-action="updatePreview"]', function () {
    updatePreview();
});
$(document).on('click', '[data-action="format"]', function () {
    ed.format($(this));
});
$(document).on('click', '[data-action="undo"]', function () {
    ed.undo($(this))
});
$(document).on('click', '[data-action="undo"]', function () {
    ed.redo($(this))
});
$(document).on('change', '[data-action="changeTheme"]', function () {
    var theme = $(this).val();
    ed.changeTheme(theme);
});
$(document).on('change', '[data-action="changeFontSize"]', function () {
    ed.changeFontSize($(this).val());
});
$(document).on('change', '[data-action="changeFontStyle"]', function () {
    ed.changeFontStyle($(this).val());
});
$(document).on('change', '[data-action="changeFontFamily"]', function () {
    ed.changeFontFamily($(this).val());
});
$(document).on('change', '[data-action="addCssLibrary"]', function () {
    ed.addCssLibrary($(this).val());
});
$(document).on('change', '[data-action="addJsLibrary"]', function () {
    ed.addJsLibrary($(this).val());
});
$(document).on('click', '[data-action="toggleFullscreen"]', function () {
    ui.toggleFullScreen($(this));
});
$(document).on('click', '[data-action="addExternalInput"]', function () {
    ui.addExternalInput($(this).attr('data-type'));
});
$(document).on('change', '[data-action="addLibrary"]', function () {
    ui.addExternalInput($(this).attr('data-type'), $(this).val());
});
$(document).on('click', '[data-action="saveLibs"]', function () {
    ed.saveLibs();
});
$(document).on('click', '[data-action="deleteLib"]', function () {
    ed.deleteLib($(this));
});
$(document).on('click', '[data-action="consoleToggle"]', function () {
    $("#console").toggleClass('closed')
});
$(document).on('click', '[data-action="consoleClear"]', function () {
    $("#console").html('');
});
$(document).on('click', '[data-action="asideToggle"]', function () {
    ui.asideToggle($(this))
});
$(document).on('click', '[data-action="changeLayout"]', function () {
    ui.changeLayout($(this).attr('data-layout'));
});
$(document).on('click', '[data-action="modalToggle"]', function () {
    ui.modalToggle($(this));
});
$(document).on('click', '[data-action="closeModal"]', function () {
    ui.close();
});
$(document).on('click', '[data-action="inputAction"]', function () {
    ui.inputAction($(this));
});
$(document).on('click', '[data-action="deleteProject"]', function () {
    database.delete($(this));
});
var zip = new JSZip();
zip.file("js/js.js", "ui.close()");
$('[data-action="zip"]').on("click", function () {
  zip.generateAsync({
    type: "blob"
  }).then(function (blob) { // 1) generate the zip file
    saveAs(blob, "hello.zip"); // 2) trigger the download
  }, function (err) {
    $("#blob").text(err);
  });
})