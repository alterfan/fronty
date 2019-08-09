const loadView = (side, view) => {
    var header = "<a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>",
        viewUrl = 'modules/' + view + '/' + view + '.html ',
        sidebar = "#sidebar__" + side;
    $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__content').load(viewUrl);
    $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__header').html(header);
}
/* sidebar */
class Sidebar {
    constructor(side, parent) {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.attachMode;
        this.side = side;
        this.parent = parent;
        this.init(side, parent)
    }
    get overlay() {
        return $("<div>", {
            "class": "fronty__overlay",
            "data-action": "close-sidebar"
        });
    }
    init(attachMode) {
        var that = this;
        this.attachMode = this.cache == undefined ? attachMode : this.cache;
        var $sidebar = $("<div>", {
            "id": "sidebar__" + this.side,
            "class": "fronty__workspace__sidebar fronty__workspace__sidebar__transition fronty__workspace__sidebar" + this.side + "fronty__workspace__sidebar__" + !this.attachMode ? "overlayed" : "splited"
        });
        var $parent = $(this.parent),
            parentFirstChild = "." + $(".fronty__workspace").children(":first-child").attr("class");
        if (that.side == "left") $parent.prepend($sidebar);
        if (that.side == "right") $parent.append($sidebar);
       
    }
    get cache() {
        return local.getStorage("app.config")["sidebar-" + this.side + "-splited"]
    }
    open(el) {
        var view = $(el).attr('data-view'),
            side = $(el).attr('data-side'),
            sidebar = "#sidebar__" + $(el).attr('data-side'),
            header = "<a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>";
        if (this.getSplitedState(side)) {
            if (!this.isClosed) {
                this.close(el);
                this.timeout = 600;
            }
            this.overlay.attr("data-side", side);
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
    close(el) {
        var side = $(el).attr('data-side'),
            sidebar = "#sidebar__" + $(el).attr('data-side');
        $(".fronty__workspace__sidebar__overlayed").removeClass('visible');
        setTimeout(() => {
            if (this.getSplitedState(side)) {
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