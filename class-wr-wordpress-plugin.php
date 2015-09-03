<?php
/**
 * @package   WordPress Reviews
 * @author    ThemeAvenue <web@themeavenue.net>
 * @license   GPL-2.0+
 * @link      http://themeavenue.net
 * @copyright 2014 ThemeAvenue
 */

class WR_WordPress_Plugin {

	/**
	 * Plugin information object.
	 *
	 * @since  0.1.0
	 * @var    object
	 */
	protected $plugin = '';

	/**
	 * Plugin reviews.
	 *
	 * @since  0.1.0
	 * @var    array
	 */
	protected $reviews = array();

	/**
	 * Slug of the plugin to fetch.
	 *
	 * @since  0.1.0
	 * @var    string
	 */
	protected $plugin_name;

	/**
	 * Constructor.
	 * 
	 * @param string $plugin_name Slug of the plugin to fetch
	 */
	public function __construct( $plugin_name = 'plugin-reviews' ) {
		$this->plugin_name = $plugin_name;
	}

	/**
	 * Get plugin information.
	 *
	 * Query WP.org to get the plugin information,
	 * including the reviews.
	 *
	 * @since  0.1.0
	 * @return object Plugin info
	 */
	protected function get_plugin_information() {

		if ( ! function_exists( 'plugins_api' ) ) {
			$admin_path = trailingslashit( str_replace( site_url() . '/', ABSPATH, get_admin_url() ) );
			require_once( $admin_path . 'includes/plugin-install.php' );
		}

		$this->plugin = plugins_api( 'plugin_information', array( 'slug' => $this->plugin_name, 'fields' => array( 'reviews' => true ) ) );

		return $this->plugin;

	}

	/**
	 * Get plugin reviews.
	 *
	 * Extract the plugin reviews from the plugin information
	 * that we got from WP.org.
	 *
	 * @since  0.1.0
	 * @return string All reviews in a string
	 */
	protected function get_plugin_reviews() {

		$hash          = md5( $this->plugin_name );
		$this->reviews = get_transient( "wr_reviews_$hash" );

		if ( false === $this->reviews ) {

			$this->get_plugin_information();

			if ( isset( $this->plugin->sections['reviews'] ) ) {
				$this->reviews = $this->plugin->sections['reviews'];
				$this->split_reviews();
				$this->cache_reviews();
			}

		}

		return $this->reviews;

	}

	/**
	 * Split the reviews.
	 *
	 * The reveiws we get from the plugin information are all contained
	 * in a text string with HTML markup. We need to split the reviews
	 * into individual elements in order to process them.
	 *
	 * @since  0.1.0
	 * @return array Splitted reviews
	 */
	protected function split_reviews() {

		$reviews       = $this->reviews;
		$this->reviews = array();
		$dom           = new DOMDocument();
		$dom->loadHTML( $reviews );
		$finder        = new DomXPath( $dom );
		$nodes         = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' review ')]");

		foreach ( $nodes as $node ) {

			$raw_review = $node->ownerDocument->saveXML( $node );
			$review     = $this->extract_review_data( $raw_review );

			array_push( $this->reviews, $review );

		}

		return $this->reviews;

	}

	/**
	 * Get the content of an HTML node.
	 *
	 * Get the content of an HTML node using DOMDocument.
	 * We are searching the node by its class.
	 *
	 * @since  0.1.0
	 * @param  string $html  HTML string to get the content from
	 * @param  string $class Class of the node to get the content from
	 * @return string        Node content
	 */
	protected function get_node_content( $html, $class ) {

		$dom     = new DOMDocument();
		$dom->loadHTML( $html );
		$finder  = new DomXPath( $dom );
		$nodes   = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $class ')]");
		$content = '';

		foreach ( $nodes as $element ) {
			$content = $element->ownerDocument->saveXML( $element );
		}

		return trim( strip_tags( $content ) );

	}

	/**
	 * Construct review array.
	 *
	 * Prepare the review in its final form.
	 * We extract ll required information and store them
	 * in a re-usable array.
	 *
	 * @since  0.1.0
	 * @param  string $review An individual formatted review
	 * @return array          Review data
	 */
	protected function extract_review_data( $review ) {

		$data  = array();
		$links = $this->get_links( $review, true );

		$data['username']['text'] = isset( $links[1] ) ? $links[1] : '';
		$data['username']['href'] = $this->get_link_href( $review );
		$data['avatar']['src']    = $this->get_image_src( $review );
		$data['content']          = $this->get_node_content( $review, 'review-body' );
		$data['title']            = $this->get_tag_content( $review, 'h4' );
		$data['date']             = $this->get_node_content( $review, 'review-date' );
		$data['rating']           = $this->get_node_content( $review, 'screen-reader-text' );

		return $data;

	}

	/**
	 * Get the source of an image using DOMDocument.
	 *
	 * @since  0.1.0
	 * @param  string $html String containing an image tag
	 * @return string       Image source
	 */
	protected function get_image_src( $html ) {

		$doc        = new DOMDocument();
		$doc->loadHTML( $html );
		$imagepaths = array();
		$imageTags  = $doc->getElementsByTagName( 'img' );

		foreach ( $imageTags as $tag ) {
			$imagepaths[] = $tag->getAttribute( 'src' );
		}

		if ( ! empty( $imagepaths ) ) {
			return $imagepaths[0];
		} else{
			return '';
		}

	}

	/**
	 * Get the target of a link.
	 *
	 * @since  0.1.0
	 * @param  string $html String containing a link tag
	 * @return string       Link target
	 */
	protected function get_link_href( $html ) {

		$doc       = new DOMDocument();
		$doc->loadHTML( $html );
		$linkhrefs = array();
		$linkTags  = $doc->getElementsByTagName( 'a' );

		foreach ( $linkTags as $tag ) {
			$linkhrefs[] = $tag->getAttribute( 'href' );
		}

		if ( ! empty( $linkhrefs ) ) {
			return $linkhrefs[0];
		} else{
			return '';
		}

	}

	/**
	 * Get all links from a string.
	 *
	 * @since  0.1.0
	 * @param  string  $html       HTML string
	 * @param  boolean $strip_tags Whether of not to strip the tags and only retrieve the link anchor
	 * @return array               All links contained in the string
	 */
	protected function get_links( $html, $strip_tags = false ) {

		$links = array();

		$doc       = new DOMDocument();
		$doc->loadHTML( $html );
		$linkTags  = $doc->getElementsByTagName( 'a' );

		foreach ( $linkTags as $tag ) {
			if ( $strip_tags ) {
				$links[] = trim( strip_tags( $tag->ownerDocument->saveXML( $tag ) ) );
			} else {
				$links[] = $tag->ownerDocument->saveXML( $tag );
			}
		}

		return $links;

	}

	/**
	 * Get the content of any HTML tag.
	 *
	 * @since  0.1.0
	 * @param  string $html   HTML string to parse
	 * @param  string $search Tag to search
	 * @return string         Tag content
	 */
	protected function get_tag_content( $html, $search ) {

		$doc        = new DOMDocument();
		$doc->loadHTML( $html );
		$titlepaths = array();
		$titleTags  = $doc->getElementsByTagName( $search );

		foreach ( $titleTags as $tag ) {
			$titlepaths[] = $tag->ownerDocument->saveXML( $tag );
		}

		if ( ! empty( $titlepaths ) ) {
			return trim( strip_tags( $titlepaths[0] ) );
		} else{
			return '';
		}

	}

	/**
	 * Cache the reviews.
	 *
	 * In order to avoid too many calls to the
	 * WP.org API and slow down the site we cache
	 * the reviews into a transient.
	 *
	 * @since  0.1.0
	 * @return boolean Whether the transient was set
	 */
	protected function cache_reviews() {
		$hash = md5( $this->plugin_name );
		return set_transient( "wr_reviews_$hash", $this->reviews, apply_filters( 'wr_cache_lifetime', 24*60*60 ) );
	}

	/**
	 * Get the reviews.
	 *
	 * Return the reviews after processing them.
	 *
	 * @since  0.1.0
	 * @return array Plugin reviews
	 */
	public function get_reviews() {
		return $this->get_plugin_reviews();
	}

}