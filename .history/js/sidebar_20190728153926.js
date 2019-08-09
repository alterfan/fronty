const loadView = (side, view) => {
    var header = "<a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>",
        viewUrl = 'modules/' + view + '/' + view + '.html ',
        sidebar = "#sidebar__" + side;
    $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__content').load(viewUrl);
    $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__header').html(header);
};
var $overlay = $(".fronty__overlay");
/* Panel */
var Panel = new class {
    constructor(side, parent) {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.attachMode;
        this.side = side;
        this.parent = $(parent);
        this.view;
        this.init();
    }
    init(attachMode) {
        var that = this;
        this.attachMode = this.cache == undefined ? attachMode : this.cache;
        var $sidebar = $("<div>", {
            "id": "sidebar__" + this.side,
            "class": "fronty__workspace__sidebar fronty__workspace__sidebar__transition fronty__workspace__sidebar__" + this.side + " fronty__workspace__sidebar__" + (!this.attachMode ? "overlayed" : "splited")
        }).append($("<div>", {
            "class": "fronty__workspace__sidebar__header"
        })).append($("<div>", {
            "class": "fronty__workspace__sidebar__content"
        }));
        if (that.side == "left") this.parent.prepend($sidebar);
        if (that.side == "right") this.parent.append($sidebar);
    }
    open(el) {
        var view = $(el).attr('data-view'),
            panel = "#panel__" + $(el).attr('data-side');
        if ($(panel).hasClass('visible'))
            this.close(el);
        $("<div>", {
            "class": "fronty__overlay",
            "data-action": "close-panel",
            "data-side": $(el).attr('data-side')
        }).insertBefore(panel);
        setTimeout(function() {
            $(".fronty__overlay").addClass("visible");
            $(panel).addClass("visible").find('.fronty__panel__content').load('modules/' + view + '/' + view + '.html ');
        }, 300);
        this.view = view;
    }
    close(el) {
        var panel = "#panel__" + $(el).attr('data-side'),
            $overlay = $(".fronty__overlay");
        $(panel).removeClass('visible');
        setTimeout(() => {
            $(panel).find('.fronty__panel__content').html("");
            $overlay.removeClass('visible');
            $overlay.remove();
        }, 300);
        this.view = "";
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
/* sidebar */
class Sidebar {
    constructor(side, parent) {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.attachMode;
        this.side = side;
        this.parent = $(parent);
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
            "class": "fronty__workspace__sidebar fronty__workspace__sidebar__transition fronty__workspace__sidebar__" + this.side + " fronty__workspace__sidebar__" + (!this.attachMode ? "overlayed" : "splited")
        }).append($("<div>", {
            "class": "fronty__workspace__sidebar__header"
        })).append($("<div>", {
            "class": "fronty__workspace__sidebar__content"
        }));
        if (that.side == "left") this.parent.prepend($sidebar);
        if (that.side == "right") this.parent.append($sidebar);
    }
    get cache() {
        return local.getStorage("app.config")["sidebar-" + this.side + "-splited"]
    }
    open(el) {
        var view = $(el).attr('data-view'),
            sidebar = "#sidebar__" + this.side;
        if (!this.cache) {
            this.timeout = 300;
            if (!this.isClosed) {
                this.close();
                this.timeout = 600;
            }
            this.parent.prepend($("<div>", {
                "class": "fronty__overlay",
                "data-action": "close-sidebar",
                "data-side": this.side
            }));
            setTimeout(function() {
                loadView(this.side, view);
                $(".fronty__overlay").addClass("visible");
            }, this.timeout);
        }
        this.view = view;
        this.isClosed = false;
    }
    close() {
        $("#sidebar__" + this.side).removeClass("visible");
        $(".fronty__overlay").removeClass('visible');
        setTimeout(() => {
            if (!this.cache) {
                $(".fronty__overlay").remove();
                $("#sidebar__" + this.side).find('.fronty__workspace__sidebar__content').html("");
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