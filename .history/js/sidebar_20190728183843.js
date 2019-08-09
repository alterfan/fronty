const loadView = (panel, side, view) => {
    var header = "<div>" + view + "</div></div><a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>",
        viewUrl = 'modules/' + view + '/' + view + '.html ';
    console.log('viewUrl: ', viewUrl);
    $(panel).find('.fronty__workspace__sidebar__content').load('modules/' + view + '/' + view + '.html ');
    $(panel).find('.fronty__workspace__sidebar__header').html(header);
    $(panel).addClass("visible")
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
            var attachMode = this.getCache(s) == undefined ? this.splited : this.getCache(s);
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
                loadView(panel, side, "projects")
                $(panel).addClass("visible")
            }
        }
    }
    open(side, view, el) {
        var panel = "#sidebar__" + side,
            view = el == undefined ? view : el.attr("data-veiw");
        this.timeout = 300;
        if (this.isClosed) {
            this.close(el);
            this.timeout = 600
        }
        if (!this.getCache(side)) {
            $("<div>", {
                "class": "fronty__overlay",
                "data-action": "close-panel",
                "data-side": side
            }).insertBefore(panel);
            setTimeout(function() {
                $(".fronty__overlay").addClass("visible");
                console.log('view: ', view);
                loadView(panel, side, view)
            }, this.timeout);
            this.isClosed = false;
        }
    }
    close(el) {
        var panel = "#sidebar__" + $(el).attr('data-side'),
            $overlay = $(".fronty__overlay");
        $(panel).removeClass('visible');
        $overlay.removeClass('visible');
        setTimeout(() => {
            $(panel).find('.fronty__workspace__sidebar__content').html("");
            $overlay.remove();
        }, 300);
        this.view = "";
        this.isClosed = true;
    }
    toggle(el) {
        var view = $(el).attr('data-view'),
            side = $(el).attr('data-side');
        console.log(view);
        if (view == this.view) {
            this.close(el);
        } else {
            this.open(side, view, el);
        }
    }
};