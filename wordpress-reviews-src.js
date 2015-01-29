jQuery(document).ready(function ($) {
	$('.wr-single').on('click', '.wr-truncated-show', function (e) {
		e.preventDefault();
		$(this).prev('.wr-truncated').slideDown('fast');
		$(this).remove();
	});
});