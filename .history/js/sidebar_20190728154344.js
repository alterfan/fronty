const loadView = (side, view) => {
    var header = "<a data-action=\"close-sidebar\" data-side=\"" + side + "\" action=\"click\" class=\"group_btn group--flex-end material-icons\">close</a>",
        viewUrl = 'modules/' + view + '/' + view + '.html ',
        sidebar = "#sidebar__" + side;
    $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__content').load(viewUrl);
    $(sidebar).addClass("visible").find('.fronty__workspace__sidebar__header').html(header);
};
var $overlay = $(".fronty__overlay");
/* Panel */
var Sidebar = new class {
    constructor(side, parent) {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.attachMode;
        this.view;
        this.render(side, parent);
    }
    get overlay() {
        return $("<div>", {
            "class": "fronty__overlay",
            "data-action": "close-sidebar"
        });
    }
    render(side, parent, attachMode) {
        var that = this,
            $parent = $(parent);
        this.attachMode = this.cache == undefined ? attachMode : this.cache;
        var $sidebar = $("<div>", {
            "id": "sidebar__" + side,
            "class": "fronty__workspace__sidebar fronty__workspace__sidebar__transition fronty__workspace__sidebar__" + side + " fronty__workspace__sidebar__" + (!this.attachMode ? "overlayed" : "splited")
        }).append($("<div>", {
            "class": "fronty__workspace__sidebar__header"
        })).append($("<div>", {
            "class": "fronty__workspace__sidebar__content"
        }));
        if (that.side == "left") $parent.prepend($sidebar);
        if (that.side == "right") $parent.append($sidebar);
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