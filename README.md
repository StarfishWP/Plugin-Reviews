# Plugin Reviews by Starfish #
**Contributors:** starfishwp,julien731,SiamKreative,cssimmon,anasbinmukim,thefiddler  
**Donate link:** https:paypal.me/fiddler  
**Tags:** wordpress,plugins,reviews,ratings,plugin reviews,  
**Requires at least:** 4.5
**Tested up to:** 4.9.1
**Stable tag:** 0.4.0
**License:** GPLv2 or later  
**License URI:** http://www.gnu.org/licenses/gpl-2.0.html  

Display the WordPress.org reviews of any plugin on your site.

## Description ##

**Updated!** _Plugin Reviews_ is finally updated and working with the latest versions of WP, PHP, etc. It's now maintained by [Starfish WP Plugins](https://starfishwp.com). So use it confidently, and look for new features in the future.

A tiny plugin to help you **showcase your WordPress.org reviews on your site**. It offers two different layouts: grid and carousel.

Simply provide your plugin's slug (on WordPress.org) and the plugin will fetch the reviews, and display them. For instance, if you want to get the reviews for this plugin, the slug is `plugin-reviews`.

By default, all reviews from WordPress.org are cached for 24 hours.

### Shortcode ###

You need to use the following shortcode:


	[wr_reviews]


The shortcode can be used anywhere on your site, and even on multiple pages/posts. All shortcode parameters are [listed here](https://github.com/StarfishWP/Plugin-Reviews/wiki/Shortcode-Attributes).

### Demo ###

You can see it working here on the [Starfish Plugin Reviews page](https://starfishwp.com/plugin-reviews/). We use the Carousel Layout.

### Roadmap ###

No promises, but things we'd like to add include:

* Make carousel options available from within the shortcode (items to show, items to scroll, duration, etc.)
* Make it work with AJAX to avoid long page load (for the first call to the API)
* Add styling options for grid?
* Add styling options for carousel?
* Add a way to disable style completely
* Add a way to change the prefix from `wr-` to `whatever` (applies to every elements)
* Loading carousel styles & scripts only if chosen layout is carousel
* Register modules for popular pagebuilders like Divi, Beaver Builder, Visual Composer, etc
* Add Gutenblocks compatibility (whenever Gutenberg is ready for that)

We're busy, so feel free to contribute!

### Contributing Guidelines ###

* Head over to our [Github Repo](https://github.com/StarfishWP/Plugin-Reviews/)
* Pull requests are encouraged
* Submit issues if you find any
* Spread the word on Twitter & Facebook :)

## Installation ##

Go to Plugins>Add New and search "Plugin Reviews". Click "Install Now" then "Activate" on this plugin (by "Starfish Plugins").

## Screenshots ##

### 1. WordPress.org Reviews, Grid Layout ###
![WordPress.org Reviews, Grid Layout](http://ps.w.org/plugin-reviews/assets/screenshot-1.png)

### 2. WordPress.org Reviews, Carousel Layout ###
![WordPress.org Reviews, Carousel Layout](http://ps.w.org/plugin-reviews/assets/screenshot-2.png)


## Changelog ##

### 0.4.0 - December 20th, 2017 ###
* Enhancments
    * Add transient flush on activation.
* Fixes
    * Fix issue with ratings not loading due to changes in the plugin repo format that broke the filters. - Thanks Chris Simmons!

### 0.3.0 - September 4th, 2015 ###
* New
    * Add shortcode attribute `no_query_string` to remove all query strings
    * Add shortcode attribute `exclude` to exclude reviewers
    * Add lazy load for Gravatar images
    * Change Gravatar default size to 80
    * French translation

* Enhancements
    * Remove image size query string if default Gravatar size is used
    * Bigger and more accessible prev/next buttons on small devices

* Fixes
    * Fix issue with sites installed in sub-directories
    * Fix duplicated reviews if shortcode used more than once in the same page

### 0.2.0 ###
* Refactor the plugin to use the WordPress.org API

### 0.1.0 ###
* First release
