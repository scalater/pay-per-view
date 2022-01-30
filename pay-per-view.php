<?php // phpcs:ignore WordPress.Files.FileName.InvalidClassFileName

/**
 * Plugin Name: Pay Per View
 * Let your customers pay per view your posts.
 * Version: 1.0.0
 * Requires at least: 4.6
 * Tested up to: 5.7.2
 * Requires PHP: 5.6
 * Stable tag: 1.0.0
 * Author: Scalater Team
 * License: GPL-3.0+
 * Network: false
 * Text Domain: pay-per-view
 * Domain Path: /languages
 */

namespace Scalater\PAY_PER_VIEW;

defined( 'ABSPATH' ) || exit;

class PayPerView {
	private static $instance;
	public static $slug = 'pay-per-view';
	private static $freemius;

	public function __construct() {
		self::init_freemius();
	}

	public static function get_freemius() {
		return self::$freemius;
	}

	private static function init_freemius() {
		if ( ! isset( self::$freemius ) ) {
			require_once dirname( __FILE__ ) . '/includes/freemius/start.php';
			self::$freemius = fs_dynamic_init( array(
				'id'             => '9812',
				'slug'           => 'pay-per-view',
				'type'           => 'plugin',
				'public_key'     => 'pk_8a0c344a7a22dbfd94ed2c3e1bf21',
				'is_premium'     => false,
				'has_addons'     => false,
				'has_paid_plans' => false,
				'menu'           => array(
					'first-path' => 'plugins.php',
					'support'    => false,
				),
			) );
		}

		do_action( 'pay_per_view_fs_loaded' );

		return self::$freemius;
	}

	/**
	 * Return an instance of this class.
	 *
	 * @return PayPerView A single instance of this class.
	 */
	public static function get_instance(): PayPerView {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Get plugins slug
	 *
	 * @return string
	 */
	static function get_slug(): string {
		return self::$slug;
	}
}

PayPerView::get_instance();
