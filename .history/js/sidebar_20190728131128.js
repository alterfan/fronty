var $overlay = $(".fronty__overlay");
/* sidebar */
var sidebar = new class {
    constructor() {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.splited = true;
        this.overlay = $("<div>", {
            "class": "fronty__overlay",
            "data-action": "close-sidebar",
            "data-side": $(el).attr('data-side')
        });
        this.init()
    }
    init() {
        $(".fronty__workspace__sidebar").each(function(index, element) {
            var side = $(element).attr('data-side');
            this.splited = local.getStorage("app.config")["sidebar-" + $(element).attr('data-side') + "-splited"];
            if (this.splited) {
                $(element).addClass("fronty__workspace__sidebar__splited");
                loadView(side, "projects")
            } else {
                $(element).addClass("fronty__workspace__sidebar__overlayed");
            }
        });
    }
    open(el) {
        var view = $(el).attr('data-view'),
            side = $(el).attr('data-side'),
            sidebar = "#sidebar__" + $(el).attr('data-side'),
            header = "<a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>";
        if (this.splited) {
            if (!this.isClosed) {
                this.close(el);
                this.timeout = 600;
            }
            this.overlay.insertBefore(sidebar);
        } else {
            $(sidebar).addClass("fronty__workspace__sidebar__splited");
            $(".fronty__workspace__editor").css({
                "flex-basis": "85%"
            });
            $(".fronty__workspace__editor").addClass("fronty__workspace__editor__splited");
        }
        setTimeout(function() {
            $(".fronty__overlay").addClass("visible");
            $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__content').html()
            loadView(side, view)
        }, this.timeout);
        this.view = view;
        this.isClosed = false;
    }
    loadView(side, view) {
        var header = "<a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>",
            viewUrl = 'modules/' + view + '/' + view + '.html ',
            sidebar = "#sidebar__" + $(el).attr('data-side');
        $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__content').load(viewUrl);
    }
    close(el) {
        var sidebar = "#sidebar__" + $(el).attr('data-side');
        $(".fronty__workspace__sidebar__overlayed").removeClass('visible');
        setTimeout(() => {
            if (this.splited) {
                $(".fronty__overlay").removeClass('visible');
                $(".fronty__workspace__sidebar__overalayed").removeClass("visible");
                $(".fronty__workspace__sidebar__overalayed").find('.fronty__workspace__sidebar__content').html("");
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