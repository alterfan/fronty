var $overlay = $(".fronty__overlay");
/* Panel */
var Panel = new class {
    constructor() {
        this.view;
    }
    open(el) {
        var view = $(el).attr('data-view'), panel = "#panel__" + $(el).attr('data-side');
        if ($(panel).hasClass('visible'))
            this.close(el);
        $("<div>", {
            "class": "fronty__overlay",
            "data-action": "close-panel",
            "data-side": $(el).attr('data-side')
        }).insertBefore(panel);
        setTimeout(function () {
            $(".fronty__overlay").addClass("visible");
            $(panel).addClass("visible").find('.fronty__panel__content').load('modules/' + view + '/' + view + '.html ');
        }, 300);
        this.view = view;
    }
    close(el) {
        var panel = "#panel__" + $(el).attr('data-side'), $overlay = $(".fronty__overlay");
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
        }
        else {
            this.open(el);
        }
    }
};