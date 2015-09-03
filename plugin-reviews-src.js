jQuery(document).ready(function ($) {

	var grid = $('.wr-grid');
	var carousel = $('.wr-carousel');

	/*
	Truncate testimonials
	 */
	$('.wr-single').on('click', '.wr-truncated-show', function (e) {
		e.preventDefault();
		$(this).prev('.wr-truncated').slideDown('fast');
		$(this).remove();
	});

	/*
	Carousel for Testimonials
	http://kenwheeler.github.io/slick/
	*/
	if (jQuery().slick && carousel.length) {
		carousel.fadeIn(400).slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: true,
			arrows: true,
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 5000,
			lazyLoad: 'ondemand',
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
	}

	/*
	Lazy Load for Grid Layout
	https://github.com/toddmotto/echo
	 */
	if (typeof echo != 'undefined' && grid.length) {
		echo.init({
			callback: function (element, op) {
				$(element).parent('.wr-avatar-wrap').css('background', 'none');
			}
		});
	}

});