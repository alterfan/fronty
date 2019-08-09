var $overlay = $(".fronty__overlay");
/* sidebar */
var sidebar = new class {
    constructor() {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.splited = true;
        this.init()
    }
    init() {
        $(".fronty__workspace__sidebar").each(function(index, element) {
            var side = $(element).attr('data-side');
            console.log('side: ', side);
            this.splited = local.getStorage("app.config")["sidebar-" + $(element).attr('data-side') + "-splited"];
            $(element).addClass(this.splited?"fronty__workspace__sidebar__splited":"fronty__workspace__sidebar__overalayed");
        });
    }
    open(el) {
        var view = $(el).attr('data-view'),
            sidebar = "#sidebar__" + $(el).attr('data-side');
        if (this.splited) {
            if (!this.isClosed) {
                this.close(el);
                this.timeout = 600;
            }
            $("<div>", {
                "class": "fronty__overlay",
                "data-action": "close-sidebar",
                "data-side": $(el).attr('data-side')
            }).insertBefore(sidebar);
        } else {
            $(sidebar).addClass("fronty__workspace__sidebar__splited");
            $(".fronty__workspace__editor").css({
                "flex-basis": "85%"
            });
            $(".fronty__workspace__editor").addClass("fronty__workspace__editor__splited");
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
            if (this.splited) {
                $overlay.removeClass('visible');
                $(sidebar).removeClass("fronty__workspace__sidebar__overalayed");
            } else {
                $(".fronty__workspace__editor").removeClass("fronty__workspace__editor__splited");
                $(".fronty__workspace__editor").css({
                    "flex-basis": "100%"
                });
                $(sidebar).removeClass("fronty__workspace__sidebar__splited");
            }
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