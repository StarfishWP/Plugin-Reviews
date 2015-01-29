<?php
/**
 * @package   WordPress Reviews
 * @author    ThemeAvenue <web@themeavenue.net>
 * @license   GPL-2.0+
 * @link      http://themeavenue.net
 * @copyright 2014 ThemeAvenue
 */

class WR_Kimonolabs {

	/**
	 * Kimonolabs API key.
	 *
	 * @since  0.1.0
	 * @var    string
	 */
	protected $api_key;

	/**
	 * Slug of the plugin to fetch.
	 *
	 * @since  0.1.0
	 * @var    string
	 */
	protected $plugin_name;

	/**
	 * Kimonolabs endpoint.
	 *
	 * @since  0.1.0
	 * @var    string
	 */
	protected $endpoint;

	/**
	 * Constructor.
	 * 
	 * @param string $plugin_name Slug of the plugin to fetch
	 */
	public function __construct( $plugin_name = 'wordpress-reviews' ) {

		$this->api_key     = trim( '34f710899fb2424aeb213c881ff10109' );
		$this->plugin_name = $plugin_name;
		$this->endpoint    = 'https://www.kimonolabs.com/api/6zkgvl56';

	}

	/**
	 * Build the query for Kimonolabs.
	 *
	 * @since  0.1.0
	 * @return string URL to query
	 */
	protected function get_query() {
		$query = add_query_arg( array( 'apikey' => $this->api_key, 'kimpath4' => $this->plugin_name ), $this->endpoint );
		return $query;
	}

	protected function parse_query() {

		$args = array(
			'timeout'     => 45,
			'redirection' => 5,
			'httpversion' => '1.0',
			'blocking'    => true,
			'headers'     => array(),
		);

		$response = wp_remote_request( $this->get_query(), $args );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		if ( 200 != wp_remote_retrieve_response_code( $response ) ) {
			return new WP_Error( 'invalid_response', __( 'The server returned an invalid response', 'wordpress-reviews' ) );
		}

		$body = wp_remote_retrieve_body( $response );
		$body = json_decode( $body, true );

		if ( is_null( $body ) ) {
			return new WP_Error( 'decode_error', __( 'Unable to decode the data received', 'wordpress-reviews' ) );
		}

		if ( !isset( $body['results'] ) || !isset( $body['results']['collection1'] ) ) {
			return new WP_Error( 'missing_data', __( 'The server response is missing the reviews data', 'wordpress-reviews' ) );
		}

		/* Cache the response to avoid querying the API all the time */
		$this->cache_response( $body['results']['collection1'] );

		return $body['results']['collection1'];

	}

	protected function cache_response( $data ) {
		$hash = md5( $this->plugin_name );
		set_transient( "wr_reviews_$hash", $data, apply_filters( 'wr_cache_lifetime', 24*60*60 ) );
	}

	protected function get_response() {

		$hash     = md5( $this->plugin_name );
		$response = get_transient( "wr_reviews_$hash" );

		if ( false === $response ) {
			$response = $this->parse_query();
		}

		return $response;

	}

	public function get_reviews() {
		return $this->get_response();
	}

}