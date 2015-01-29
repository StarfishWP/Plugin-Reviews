# WordPress.org Reviews

The plugin fetches reviews of any plugin on the WordPress Extend and shows them nicely formatted in your site.

It is super simple and only requires a shortcode to work. No option page, no messy settings. Everything is done through the shortcode ( and a couple of filters if you need ;) ).

Once you installed the plugin, just create a new page and paste the shortcode `[wr_reviews plugin_slug="my-plugin-slug"]`. That's all! It is already working.

The one and only required shortcode attribute is `plugin_slug`. This is what tells the system which plugin to fetch the reviews from. It should match the slug in your plugin page's URL (eg. https://wordpress.org/plugins/wordpress-reviews/, where `wordpress-reviews` is the slug).

## Shortcode Attributes

The plugin, even though it doesn't have a settings page, offers a handful of options through shortcode attributes. Here is the list of available attributes.

| Attribute                     | Values           | Default           | Description                                                                                                   |
|-------------------------------|------------------|-------------------|---------------------------------------------------------------------------------------------------------------|
| `plugin_slug` **(mandatory)** |                  | wordpress-reviews | Slug of your plugin as it appears in the plugin page's URL                                                    |
| `rating`                      | 1-5, `all`       | `all`             | Only show reviews with a certain rating up. For instance, defining 3 will show reviews rated 3+               |
| `limit`                       | *integer*        | 10                | Number of reviews to show                                                                                     |
| `sortby`                      | `date`, `rating` | `date`            | How to sort the reviews                                                                                       |
| `sort`                        | `ASC`, `DESC`    | `DESC`            | Sort reviews is an ascending (low to high) or descending (high to low) order                                  |
| `truncate`                    | *integer*        | 300               | Number of characters to show. Everything after this limit will be hidden and a "Read more" link will be added |
| `gravatar_size`               | *integer*        | 96                | Size of the Gravatar                                                                                          |
| `container`                   | HTML container   | div               | Type of container to use to wrap the reviews. Leave blank for no container                                    |
| `container_class`             |                  | `wr`              | Class of the container. **Will replace the default class which may result in ugly styling.**                  |
| `container_id`                |                  |                   | ID of the container                                                                                           |
| `link_all`                    | `yes`, `no`      | `no`              | Whether or not to show a link to the WordPress.org reviews page                                               |
| `link_add`                    | `yes`, `no`      | `yes`             | Whether or not to show a link to add a new review on WordPress.org                                            |