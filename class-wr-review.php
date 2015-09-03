<?php
/**
 * @package   WordPress Reviews
 * @author    ThemeAvenue <web@themeavenue.net>
 * @license   GPL-2.0+
 * @link      http://themeavenue.net
 * @copyright 2014 ThemeAvenue
 */

class WR_Review {

	/**
	 * The review.
	 *
	 * @since  0.1.0
	 * @var array
	 */
	protected $review;

	public function __construct( $review, $gravatar_size = 80, $trim_content = false, $no_query_string = false ) {
		$this->review          = $review;
		$this->gravatar_size   = $gravatar_size;
		$this->trim_content    = $trim_content;
		$this->no_query_string = (bool) $no_query_string;
	}

	/**
	 * Set the markup for one individual review.
	 *
	 * @since  0.1.0
	 * @return string Review markup
	 */
	protected function review_markup() { ?>
	
		<div class="wr-single">
			<div class="wr-avatar-wrap" style="width:{{gravatar_size}}px;height:{{gravatar_size}}px;"><img class="wr-avatar" data-lazy="{{gravatar_url}}" data-echo="{{gravatar_url}}" alt="{{username}}" width="{{gravatar_size}}" height="{{gravatar_size}}" src="<?php echo WR_URL; ?>images/blank.gif"></div>
			<div class="wr-username">{{username}}</div>
			<div class="wr-sr wr-sr-{{rating}}"><i></i><i></i><i></i><i></i><i></i></div>
			<div class="wr-title">{{title}}</div>
			<div class="wr-content">{{review}}</div>
			<div class="wr-date">{{date}}</div>
		</div>

	<?php }

	/**
	 * Return the review markup.
	 *
	 * @since  0.1.0
	 * @return string HTML markup
	 */
	protected function get_review_markup() {

		ob_start();
		$this->review_markup();
		$markup = ob_get_contents();
		ob_end_clean();

		return apply_filters( 'wr_review_markup', $markup );

	}

	/**
	 * Available tags list.
	 *
	 * Returns the available tags list with their
	 * value updated for this review.
	 *
	 * @since  0.1.0
	 * @return array Tags and their values
	 */
	public function tags() {

		$attributes = WR_Reviews::default_attributes();
		$tags       = array();

		/* Add all the default shortcode attributes */
		foreach ( $attributes as $attribute => $value ) {
			$tags[$attribute] = $value;
		}

		/* Add custom tags */
		$tags['username']     = $this->review['username']['text'];
		$tags['user_link']    = $this->review['username']['href'];
		$tags['gravatar_url'] = $this->resize_gravatar();
		$tags['plugin_name']  = $tags['plugin_slug'];
		$tags['review']       = false === $this->trim_content ? $this->review['content'] : $this->truncate();
		$tags['title']        = $this->review['title'];
		$tags['date']         = $this->review['date'];
		$tags['rating']       = substr( $this->review['rating'], 0, 1 );

		return $tags;

	}

	protected function truncate() {

		$content = $this->review['content'];
		$length  = $this->trim_content;
		$content = trim( $content );

		if ( strlen( $content ) < $length ) {
			return $content;
		}

		$readmore = __( 'Read more', 'wordpress-reviews' );
		$content  = wordwrap( $content, $length );
		$content  = explode( "\n", $content, 2 );
		$trimmed  = $content[0] . ' [...]';
		$trimmed  = $trimmed . '<span class="wr-truncated">' . $content[1] . '</span> <a class="wr-truncated-show" href="#wr-readmore">' . $readmore . ' &raquo;</a>';

		return $trimmed;
	}

	/**
	 * Convert tags.
	 *
	 * Takes the HTML markup and converts all the tags
	 * into their actual value.
	 *
	 * @since  0.1.0
	 * @return string Final HTML markup
	 */
	public function convert_tags() {

		$output = $this->get_review_markup();
		$tags   = $this->tags();

		foreach ( $tags as $tag => $value ) {
			$output = str_replace( '{{' . $tag . '}}', $value, $output );
		}

		return $output;

	}

	/**
	 * Properly resize a Gravatar image.
	 *
	 * @since  0.1.0
	 * @return string Gravatar URL
	 */
	protected function resize_gravatar() {

		$url  = $this->review['avatar']['src'];
		$base = strtok( $url, '?' );

		/**
		 * Remove all query strings if enabled.
		 * This allows for performance improvements.
		 */
		if ( defined( 'WR_NO_QUERY_STRING' ) && true === WR_NO_QUERY_STRING || true === $this->no_query_string ) {
			return esc_url( $base );
		}

		parse_str( parse_url( $url, PHP_URL_QUERY ), $args );
		
		$size = intval( $args['s'] );

		if ( $size !== $this->gravatar_size ) {
			$args['s'] = $this->gravatar_size;
		}

		/**
		 * If the requested size is the default (80)
		 * we remove the size query string for PageSpeed
		 * improvement
		 */
		if ( 80 === (int) $args['s'] ) {
			unset( $args['s'] );
		}

		return add_query_arg( $args, $base );

	}

	/**
	 * Add the timestamp.
	 *
	 * @since  0.1.0
	 * @return void
	 */
	protected function add_timestamp() {
		$time                      = $this->review['date'];
		$timestamp                 = strtotime( $time );
		$this->review['timestamp'] = $timestamp;
	}

	/**
	 * Convert the rating into an integer.
	 *
	 * @since  0.1.0
	 * @return void
	 */
	protected function add_rating() {
		$stars                  = $this->review['rating'];
		$rating                 = intval( trim( str_replace( array( 'star', 'stars' ), '', $stars ) ) );
		$this->review['rating'] = $rating;
	}

	/**
	 * Get an individual review with the final markup.
	 *
	 * @since  0.1.0
	 * @return string Review with final markup
	 */
	public function get_review() {

		if ( !is_array( $this->review ) || empty( $this->review ) ) {
			return '';
		}

		$output                 =  $this->convert_tags();
		$this->review['output'] = $output;
		$this->add_timestamp();
		$this->add_rating();

		return $this->review;

	}

}