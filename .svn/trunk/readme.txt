=== WordPress.org Reviews ===
Contributors: themeavenue,julien731,SiamKreative
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KADEESTQ9H3GW
Tags: wordpress,reviews,rating
Requires at least: 3.8
Tested up to: 3.4
Stable tag: 0.1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Display the reviews of your plugin fetched from WordPress.org on your site.

== Description ==

A tiny plugin to help you **showcase your WordPress.org reviews on your site**. It offers two different layouts: grid and carousel.

Simply provide your plugin's slug (on WordPress.org) and the plugin will fetch the reviews, and display them. For instance, if you want to get the reviews for the plugin [Awesome Support](https://wordpress.org/support/plugin/awesome-support), the slug is `awesome-support`.

By default, all reviews from WordPress.org are cached for 24 hours.

All shortcode parameters are listed on the [GitHub repo](https://github.com/ThemeAvenue/WordPress.org-Reviews).

= Demo =

You can see it working here: http://getawesomesupport.com/reviews. We use the Carousel Layout.

= Roadmap =
We're pretty busy, so feel free to contribute if you like the plugin :)

* Make carousel options available from within the shortcode (items to show, items to scroll, duration, etc.)
* Make it work with AJAX to avoid long page load (for the first call to the API)
* Add styling options for grid?
* Add styling options for carousel?
* Add a way to disable style completely
* Add a way to change the prefix from `wr-` to `whatever` (applies to every elements)
* Add loading spinner while fetching data / preloading avatars
* Loading carousel styles & scripts only if chosen layout is carousel
* Add fallback if error retrieving data from KimonoLabs (link to plugin's reviews page)

= Contributing Guidelines =

* Head over to our [Github Repo](https://github.com/ThemeAvenue/WordPress.org-Reviews)
* Forks and create pull requests are encouraged
* Submit issues if you find any
* Spread the word on Twitter & Facebook :)

== Installation ==

You're a developer. You know ;)

== Frequently Asked Questions ==

= Can I use my own KimonoLabs API key? =

Yes you can. Just define a new constant called `WR_KIMONOLAB_API_KEY` with your API key (most likely in your theme's `functions.php`).

== Screenshots ==

1. WordPress.org Reviews, Grid Layout
2. WordPress.org Reviews, Carousel Layout

== Changelog ==

= 0.1.0 =
* First release