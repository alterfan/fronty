const loadView = (panel, side, view) => {
    var header = "<div>" + view + "</div></div><a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>",
        viewUrl = 'modules/' + view + '/' + view + '.html ';
    $(panel).find('.fronty__workspace__sidebar__content').load('modules/' + view + '/' + view + '.html ');
    $(panel).find('.fronty__workspace__sidebar__header').html(header);
    $(panel).addClass("visible");
};
var $overlay = $(".fronty__overlay");
/* Panel */
class Sidebar {
    constructor(side = [], parent) {
        this.view;
        this.isClosed = true;
        this.timeout;
        this.view;
        this.render(side, parent);
    }
    get overlay() {
        return $("<div>", {
            "class": "fronty__overlay",
            "data-action": "close-sidebar"
        });
    }
    getCache(side) {
        return local.getStorage("app.config")["sidebar-" + side + "-splited"]
    }
    render(side, parent) {
        var that = this,
            panel = "#sidebar__" + side,
            $parent = $(parent);
        for (let i = 0; i < side.length; i++) {
            const s = side[i];
            var $sidebar = $("<div>", {
                "id": "sidebar__" + s,
                "class": "fronty__workspace__sidebar fronty__workspace__sidebar__transition fronty__workspace__sidebar__" + s + " fronty__workspace__sidebar__" + (!this.getCache(s) ? "overlayed" : "splited")
            }).append($("<div>", {
                "class": "fronty__workspace__sidebar__header"
            })).append($("<div>", {
                "class": "fronty__workspace__sidebar__content"
            }));
            if (s == "left") $parent.prepend($sidebar);
            if (s == "right") $parent.append($sidebar);
            if (this.getCache(s)) {
                $(panel).css("position", "relative");
                loadView(panel, side, "projects")
            }
        }
    }
    open(side, view, el) {
        var panel = "#sidebar__" + side,
            view = el == undefined ? view : el.getAttribute("data-view"),
            overflow = $("<div>", {
                "class": "fronty__overlay",
                "data-action": "close-panel",
                "data-side": side
            });
        this.timeout = 300;
        if (!this.getCache(side)) {
            if (!this.isClosed) {
                this.close(el);
                this.timeout = 600
            };
            overflow.insertBefore(panel);
            setTimeout(() => {
                $(".fronty__overlay").addClass("visible");
                loadView(panel, side, view)
            }, this.timeout);
        } else {
            if (!this.isClosed) {
                this.close(el);
                this.timeout = 600
            };
            $(panel).css("position", "relative");
            setTimeout(() => {
                loadView(panel, side, view)
            }, this.timeout);
        }
        this.view = view;
        this.isClosed = false;
    }
    close(el) {
        var side = el.getAttribute('data-side'),
            panel = "#sidebar__" + side,
            $overlay = $(".fronty__overlay");
         console.log('side: ', side);
        $(panel).removeClass('visible');
        if (this.getCache(side)) $(panel).css("position", "absolute");
        $overlay.removeClass('visible');
        setTimeout(() => {
            $(panel).find('.fronty__workspace__sidebar__content').html("");
            $overlay.remove();
        }, 300);
        this.view = "";
        this.isClosed = true;
    }
    toggle(el) {
        var view = el.getAttribute('data-view'),
            side = el.getAttribute('data-side');
        if (view == this.view) {
            this.close(el);
        } else {
            this.open(side, view, el);
        }
    }
};