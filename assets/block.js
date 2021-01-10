"use strict";
/**
 * @see https://gist.github.com/Shelob9/144055408101e2fdfc4bf34adc85dd04
 *
 * global plugin_reviews_params
 */

const { __ } = wp.i18n;
const { serverSideRender: ServerSideRender = wp.components.ServerSideRender } = wp;
const { createElement, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor || wp.editor;
const { SelectControl, TextControl, PanelBody, Placeholder } = wp.components;

registerBlockType("plugin-reviews/plugin-reviews-content", {
  title: __("Plugin Reviews", "wordpress-reviews"),
  icon: "format-status",
  category: "widgets",
  attributes: {
    pluginSlug: {
      type: "string"
    },
    layout: {
      type: "string"
    },
   ratingsLimit: {
      type: "int"
    },
    ratingsDisplay: {
      type: "string"
    },
    sortBy: {
      type: "string"
    },
  },
  example: {
    attributes: {
      preview: true
    }
  },

  edit(props) {
    const {
      attributes: {
        pluginSlug = "plugin-reviews",
        ratingsLimit = 10,
        ratingsDisplay = "all",
        layout = "grid",
        sortBy = "DESC"
      },
      setAttributes
    } = props;
    let jsx;

    function setPluginSlug(value) {
      setAttributes({
        pluginSlug: value
      });
    }

     function setLayout(value) {
      setAttributes({
        layout: value
      });
    }

     function setRatingsDisplay(value) {
      setAttributes({
        ratingsDisplay: value
      });
    }

     function setRatingsLimit(value) {
      setAttributes({
        ratingsLimit: value
      });
    }

    function setSortBy(value) {
      setAttributes({
        sortBy: value
      });
    }

    jsx = [
      /*#__PURE__*/ React.createElement(
        InspectorControls,
        {
          key: "plugin-reviews-inspector-controls"
        },
        /*#__PURE__*/ React.createElement(
          PanelBody,
          {
            title: __( "Settings", "wordpress-reviews" )
          },
          /*#__PURE__*/ React.createElement(TextControl, {
            label: __( "Plugin Slug", "wordpress-reviews" ),
            value: pluginSlug,
            onChange: setPluginSlug
          }),
           /*#__PURE__*/ React.createElement(SelectControl, {
            label: __( "Layout", "wordpress-reviews" ),
            value: layout,
            onChange: setLayout,
            options:  [
              { value: 'grid', label: 'Grid' },
              { value: 'carousel', label: 'Carousel' }
            ] 
          }),
           /*#__PURE__*/ React.createElement(SelectControl, {
            label: __( "Ratings Display", "wordpress-reviews" ),
            value: ratingsDisplay,
            onChange: setRatingsDisplay,
            options:  [
              { value: 'all', label: 'All' },
              { value: '5', label: '5 Stars' },
              { value: '4', label: '4 Stars +' },
              { value: '3', label: '3 Stars +' },
              { value: '2', label: '2 Stars +' },
              { value: '1', label: '1 Stars +' }
            ] 
          }),
           /*#__PURE__*/ React.createElement(SelectControl, {
            label: __( "Sort Ratings By", "wordpress-reviews" ),
            value: sortBy,
            onChange: setSortBy,
            options:  [
              { value: 'DESC', label: 'DESC' },
              { value: 'ASC', label: 'ASC' }
            ] 
          }),           
          /*#__PURE__*/ React.createElement(TextControl, {
            label: __( "Number of Ratings", "wordpress-reviews" ),
            value: ratingsLimit,
            onChange: setRatingsLimit
          })
        )
      )
    ];

    if (pluginSlug) {
      jsx.push(
        /*#__PURE__*/ React.createElement(ServerSideRender, {
          key: "plugin-reviews-server-side-renderer",
          block: "plugin-reviews/plugin-reviews-content",
          attributes: props.attributes
        })
      );
    } else {  // Empty plugin slug.
      jsx.push(
        /*#__PURE__*/ React.createElement(
          Placeholder,
          {
            key: "plugin-reviews-wrap",
            className: "plugin-reviews-wrap"
          },
          /*#__PURE__*/ React.createElement("img", {
            src: plugin_reviews_params.preview_url
          })
        )
      );
    }

    return jsx;
  },

  save() {
    return null;
  }
});
