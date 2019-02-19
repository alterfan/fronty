class UI {
    constructor() {
            this._direction;
        }
        /* modal */
    openModal(el) {
        var view = el.attr('data-view');
        $overlay.fadeIn(150);
        $wrapper.addClass("wrapper-blur");
        setTimeout(function() {
            $modal.removeClass('closed').fadeIn(300).find('.fronty_modal_content').load('views/' + view + '.html ');
        }, 300);
    }
    closeModal() {
        $modal.fadeOut(150);
        setTimeout(function() {
            $overlay.fadeOut(150);
            $wrapper.removeClass("wrapper-blur");
            $modal.addClass('closed').find('.fronty_modal_content').html("");
        }, 300)
    }
    modalToggle(el) {
        if ($modal.hasClass('closed')) {
            this.openModal(el);
        }
        if (!$modal.hasClass('closed')) {
            this.closeModal(el);
        }
    }
    renderElem(parent) {
        var _this = this;
        $(parent).each(function(index, element) {
            var trgt = $(element).parents(".fronty_wrapper_block_editor").find(".code").attr("id");
            $(element).empty();
            $("<a>", {
                class: "group_btn",
                append: $("<i>", {
                    class: "material-icons",
                    style: "transform: rotateZ(90deg)",
                    text: "unfold_more",
                    title: "maximize " + trgt,
                    on: {
                        click: function(event) {
                            _this.maximize(trgt)
                        },
                    },
                })
            }).appendTo(this);
        });
    }
    maximize(id) {
        var p = $("#" + id).parent(),
            wgunter = $(".CodeMirror-gutters").width(),
            hbar = $(".fronty_wrapper_block_editor_bar").height();
        if ($wrapper.attr("data-layout") == "horizontal") {
            if (!p.hasClass('max')) {
                $("#" + id).parent().css("width", "100%").addClass('max');
                $(".fronty_wrapper_block_editor").each(function(index, element) {
                    if (!$(this).hasClass('max')) {
                        $(this).css("width", wgunter + "px")
                    }
                });
            } else {
                $(".fronty_wrapper_block_editor").each(function(index, element) {
                    $(this).css("width", (100 / 3) + "%").removeClass('max');
                });
            }
        }
        if ($wrapper.attr("data-layout") == "vertical") {
            if (!p.hasClass('max')) {
                $("#" + id).parent().css("height", "calc(100% - " + (hbar * 3) + "px)").addClass('max');
                $(".fronty_wrapper_block_editor").each(function(index, element) {
                    // element == this
                    if (!$(this).hasClass('max')) {
                        $(this).css("height", hbar + "px")
                    }
                });
            } else {
                $(".fronty_wrapper_block_editor").each(function(index, element) {
                    $(this).css("height", (100 / 3) + "%").removeClass('max');
                });
            }
        }
    }
}
/* var splitVertical = {
    sizes: [32, 32, 32],
    gutterSize: 2,
    direction: 'vetical',
    elementStyle: function(dimension, size, gutterSize) {
        return {
            'flex-basis': 'calc(' + size + '% - ' + gutterSize + '%)',
        }
    },
    gutterStyle: function(dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + '%',
        }
    },
};
var splitHorizontal = {
    gutterSize: 0.5,
    direction: 'horizontal',
    elementStyle: function(dimension, size, gutterSize) {
        return {
            'width': 'calc(' + size + '% - ' + gutterSize + 'em)',
        }
    },
    gutterStyle: function(dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'em',
        }
    },
};
// Split and Layout
var split;
function setLayout(el) {
    var layout = el.attr("layout-direction");
    if (toggle) {
        if (layout == 'horizontal') {
            layout = 'vertical';
        } else {
            layout = 'horizontal';
        }
    }
    if (split) {
        split.destroy();
        split = null;
    }
    split = Split(["#editor", "#preview"], {
        minSize: 200,
        direction: layout,
        onDrag: function() {},
        onDragEnd: function(cm) {
            cm.refresh();
        }
    });
    if (layout == 'horizontal') {
        document.getElementById("panel").classList.remove("vertical");
        document.getElementById("panel").classList.add("horizontal");
        localStorage.setItem("layout", "horizontal");
    } else {
        document.getElementById("panel").classList.remove("horizontal");
        document.getElementById("panel").classList.add("vertical");
        localStorage.setItem("layout", "vertical");
    }
    config.layout = !config.layout;
    window.editor.setSize();
} */
/* Изменение Макета  */
function changeLayout(layoutName) {
    var wl = "wrapper-layout",
        wbl = "wrapper_block-layout";
    var activeNum = $wrapper.attr("data-layout");
    if (activeNum == newNum) {
        alert("active layout")
    } else if (newNum == "") {
        newNum = 1;
        $wrapper.fadeOut("fast");
        $wrapper.removeClass(wl + activeNum).addClass(wl + newNum).attr("data-layout", newNum);
        $wrapper_block.removeClass(wbl + activeNum).addClass(wbl + newNum);
        setTimeout(function() {
            storage.setKey("local", frontyOptions, "layout", newNum);
            $wrapper.fadeIn("fast");
        }, 300);
    } else {
        $wrapper_block.fadeOut(300);
        setTimeout(function() {
            $wrapper.removeClass(wl + activeNum).addClass(wl + newNum).attr("data-layout", newNum);
            $wrapper_block.removeClass(wbl + activeNum).addClass(wbl + newNum);
            storage.setKey("local", frontyOptions, "layout", newNum);
        }, 300);
        $wrapper_block.fadeIn(300);
    }
}