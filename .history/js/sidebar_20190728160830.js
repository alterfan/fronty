const loadView = (side, view) => {
    var header = "<a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>",
        viewUrl = 'modules/' + view + '/' + view + '.html ',
        sidebar = "#sidebar__" + side;
    $(sidebar).find('.fronty__workspace__sidebar__content').load(viewUrl);
    $(sidebar).find('.fronty__workspace__sidebar__header').html(header);
};
var $overlay = $(".fronty__overlay");
/* Panel */
class Sidebar {
    constructor(side = [], parent) {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
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
            if(this.getCache(s))loadView(s)
            if (s == "left") $parent.prepend($sidebar);
            if (s == "right") $parent.append($sidebar);
        }
    }
    open(el) {

        if ($(panel).hasClass('visible'))
            this.close(el);
        $("<div>", {
            "class": "fronty__overlay",
            "data-action": "close-panel",
            "data-side": $(el).attr('data-side')
        }).insertBefore(panel);
        setTimeout(function() {
            $(".fronty__overlay").addClass("visible");
            $(panel).addClass("visible").find('.fronty__workspace__sidebar__content').load('modules/' + view + '/' + view + '.html ');
        }, 300);
        this.view = view;
    }
    close(el) {
        var panel = "#sidebar__" + $(el).attr('data-side'),
            $overlay = $(".fronty__overlay");
        $(panel).removeClass('visible');
        setTimeout(() => {
            $(panel).find('.fronty__workspace__sidebar__content').html("");
            $overlay.removeClass('visible');
            $overlay.remove();
        }, 300);
        this.view = "";
    }
    toggle(el) {
        var view = $(el).attr('data-view');
        console.log('view: ', view);
        if (view == this.view) {
            this.close(el);
        } else {
            this.open(el);
        }
    }
};