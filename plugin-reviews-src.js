jQuery(document).ready(function ($) {
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
	var carousel = $('.wr-carousel');
	if (jQuery().imagesLoaded && jQuery().slick && carousel.length) {
		carousel.imagesLoaded(function () {
			carousel.fadeIn(400).slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: true,
				arrows: true,
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 5000
			});
		});
	}
});