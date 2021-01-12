// Trigger things on frontend.
jQuery( document ).ready(
	function ($) {
		doThings();
	}
);

// Trigger things on block rendering.
document.addEventListener(
	'gutenbergSlick',
	function( e ) {
		window.setTimeout( doThings, 20 );
	},
	false
);

/* Trigger things on Gutenberg edit screen load.
 * @see: https://github.com/WordPress/gutenberg/issues/8379#issuecomment-518805831
 *
*/
let blockLoaded = false;
let blockLoadedInterval = setInterval(function() {
    if (document.getElementById('post-title-0')) {/*post-title-0 is ID of Post Title Textarea*/

		doThings();
        blockLoaded = true;
    }
    if ( blockLoaded ) {
        clearInterval( blockLoadedInterval );
    }
}, 5000);

/*
Carousel for Testimonials
http://kenwheeler.github.io/slick/
*/
const doThings = function() {

	var grid     = jQuery( '.wr-grid' );
	var carousel = jQuery( '.wr-carousel' );

	if (jQuery().slick && carousel.length) {
		carousel.fadeIn( 400 ).slick(
			{
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
			}
		);
	}
	/*
	Lazy Load for Grid Layout
	https://github.com/toddmotto/echo
	 */
	if (typeof echo != 'undefined' && grid.length) {
		echo.init(
			{
				callback: function (element, op) {
					jQuery( element ).parent( '.wr-avatar-wrap' ).css( 'background', 'none' );
				}
			}
		);
	}
};

/*
Truncate testimonials
 */
jQuery( '.wr-single' ).on(
	'click',
	'.wr-truncated-show',
	function (e) {
		e.preventDefault();
		jQuery( this ).prev( '.wr-truncated' ).slideDown( 'fast' );
		jQuery( this ).remove();
	}
);