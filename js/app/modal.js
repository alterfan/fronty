/* modal */
class Modal {
	open(el) {
		var view = el.attr('data-view');
		$overlay.fadeIn(150);
		setTimeout(function () {
			$modal.removeClass('closed').fadeIn(300).find('.fronty_modal_content').load('views/' + view + '.html ');
		}, 300);
	}
	close() {
		$modal.fadeOut(150);
		setTimeout(function () {
			$overlay.fadeOut(150);
			$modal.addClass('closed').find('.fronty_modal_content').html("");
		}, 300)
	}
	toggle(el) {
		if ($modal.hasClass('closed')) {
			this.open(el);
		}
		if (!$modal.hasClass('closed')) {
			this.close(el);
		}
	}
}
var modal=new Modal()