var $overlay = $(".fronty__overlay");
/* sidebar */
var sidebar = new class {
    constructor() {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.onTop = true;
    }
    open(el) {
        var view = $(el).attr('data-view'),
            sidebar = "#sidebar__" + $(el).attr('data-side');
        this.onTop = local.getStorage("app.config")["sidebar-" + $(el).attr('data-side') + "-splited"];
        if (!this.isClosed) {
            this.close(el);
            this.timeout = 600;
        }
        if (this.onTop) {
            $("<div>", {
                "class": "fronty__overlay",
                "data-action": "close-sidebar",
                "data-side": $(el).attr('data-side')
            }).insertBefore(sidebar);
            $(sidebar).addClass("fronty__workspace__sidebar__overalayed");
        } else {
            $(sidebar).addClass("fronty__workspace__sidebar__splited");
            $(".fronty__workspace__editor").animate({"width":"calc(100% - " + $("fronty__workspace__sidebar__splited").width() + ")"},300);
        }
        setTimeout(function() {
            $(".fronty__overlay").addClass("visible");
            $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__content').load('modules/' + view + '/' + view + '.html ');
        }, this.timeout);
        this.view = view;
        this.isClosed = false;
    }
    close(el) {
        var sidebar = "#sidebar__" + $(el).attr('data-side'),
            $overlay = $(".fronty__overlay");
        $(".fronty__workspace__sidebar").removeClass('visible');
        setTimeout(() => {
            if (this.onTop) {
                $overlay.removeClass('visible');
                $(sidebar).removeClass("fronty__workspace__sidebar__overalayed");
            } else {
                $(".fronty__workspace__editor").css("width", "calc(100% - " + $("fronty__workspace__sidebar__splited").width() + "px)");
                $(sidebar).removeClass("fronty__workspace__sidebar__splited");
            }
            $(sidebar).find('.fronty__workspace__sidebar__content').html("");
            $overlay.remove();
        }, 300);
        this.view = "";
        this.isClosed = true;
    }
    toggle(el) {
        var view = $(el).attr('data-view');
        if (view == this.view) {
            this.close(el);
        } else {
            this.open(el);
        }
    }
};