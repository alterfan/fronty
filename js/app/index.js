var $fronty = $(".fronty"),
    $modal = $("#modal"),
    $header = $("#header"),
    $wrapper = $("#wrapper"),
    $footer = $("#footer"),
    $hidden = $("#hidden"),
    $codeMirror = $(".CodeMirror"),
    $overlay = $('#overlay'),
    $editor_controls = $(".editor_controls");
$(document).ready(function() {
	var ui = new UI();
	var cm = new Cm();
	changeLayout(JSON.parse(localStorage.getItem("FrontyUserConfig"))["layout"]);
    if (cm.init() && ui) {
        setTimeout(function() {
            $header.removeClass("hidden");
            $footer.removeClass("hidden");
            setTimeout(function() {
                $wrapper.removeClass("hidden");
            }, 500)
        }, 500)
    }
    /* события кнопок */
    $(document).on('click', '[data-target="modal"]', function() {
        ui.modalToggle($(this))
    });
    $(document).on('click', '[data-target="layout"]', function() {
        changeLayout($(this).attr("data-layout"))
	});
	$(document).on('click', '[data-target="editor"]', function(e) {
		ui.maximize($(this))
	});
});
$(window).on("resize",function() {
	split.init($wrapper.attr("layout"));
});