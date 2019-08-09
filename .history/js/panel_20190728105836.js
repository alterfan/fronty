var $overlay = $(".fronty__overlay");
/* Panel */
var Panel = new class {
    constructor() {
        this.view;
        this.isClosed = true;
        this.timeout = 300;
        this.onTop = true;
    }
    open(el) {
        var view = $(el).attr('data-view'),
            panel = "#panel__" + $(el).attr('data-side');
        if (!this.isClosed) {
            this.close(el);
            this.timeout = 600;
        }
        if (this.isClosed) {
            if (this.onTop) {
                $("<div>", {
                    "class": "fronty__overlay",
                    "data-action": "close-panel",
                    "data-side": $(el).attr('data-side')
                }).insertBefore(panel);
            }
            setTimeout(function() {
                $(".fronty__overlay").addClass("visible");
                $(panel).addClass("visible").find('.fronty__panel__content').load('modules/' + view + '/' + view + '.html ');
            }, this.timeout);
        }
        this.view = view;
        this.isClosed = false;
    }
    close(el) {
        var panel = "#panel__" + $(el).attr('data-side'),
            $overlay = $(".fronty__overlay");
        $(".fronty__panel").removeClass('visible');
        setTimeout(() => {
            $(panel).find('.fronty__panel__content').html("");
            $overlay.removeClass('visible');
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