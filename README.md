# Plugin Reviews #
**Contributors:** themeavenue,julien731,SiamKreative  
**Donate link:** https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KADEESTQ9H3GW  
**Tags:** wordpress,reviews,rating  
**Requires at least:** 3.8  
**Tested up to:** 4.3  
**Stable tag:** 0.2.0  
**License:** GPLv2 or later  
**License URI:** http://www.gnu.org/licenses/gpl-2.0.html  

Display WordPress.org reviews of any plugin on your site.

## Description ##

**A tiny plugin to help you **showcase your WordPress.org reviews on your site**. It offers two different layouts:** grid and carousel.  

Simply provide your plugin's slug (on WordPress.org) and the plugin will fetch the reviews, and display them. For instance, if you want to get the reviews for the plugin [Awesome Support](https://wordpress.org/support/plugin/awesome-support), the slug is `awesome-support`.

By default, all reviews from WordPress.org are cached for 24 hours.

### Shortcode ###

You need to use the following shortcode:

`
[wr_reviews]
`

The shortcode can be used anywhere on your site, and even on multiple pages/posts. All shortcode parameters are [listed here](https://github.com/ThemeAvenue/Plugin-Reviews/wiki/Shortcode-Attributes).

### Demo ###

**You can see it working here:** http://getawesomesupport.com/reviews. We use the Carousel Layout.  

### Roadmap ###

We're pretty busy, so feel free to contribute if you like the plugin :)

* Make carousel options available from within the shortcode (items to show, items to scroll, duration, etc.)
* Make it work with AJAX to avoid long page load (for the first call to the API)
* Add styling options for grid?
* Add styling options for carousel?
* Add a way to disable style completely
* Add a way to change the prefix from `wr-` to `whatever` (applies to every elements)
* Add loading spinner while fetching data / preloading avatars
* Loading carousel styles & scripts only if chosen layout is carousel

### Contributing Guidelines ###

* Head over to our [Github Repo](https://github.com/ThemeAvenue/Plugin-Reviews)
* Pull requests are encouraged
* Submit issues if you find any
* Spread the word on Twitter & Facebook :)

## Installation ##

You're a developer. You know ;)

## Screenshots ##

### 1. WordPress.org Reviews, Grid Layout ###
![WordPress.org Reviews, Grid Layout](http://s.wordpress.org/extend/plugins/plugin-reviews/screenshot-1.png)

### 2. WordPress.org Reviews, Carousel Layout ###
![WordPress.org Reviews, Carousel Layout](http://s.wordpress.org/extend/plugins/plugin-reviews/screenshot-2.png)


## Changelog ##

### 0.2.0 ###
* Refactor the plugin to use the WordPress.org API

### 0.1.0 ###
* First release