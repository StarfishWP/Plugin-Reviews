"use strict";
/**
 * @see https://gist.github.com/Shelob9/144055408101e2fdfc4bf34adc85dd04
 *
 * global plugin_reviews_params
 */

const { __ } = wp.i18n;
const el = wp.element.createElement;
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
    plguinSlug: {
      type: "string"
    },
    layout: {
      type: "string"
    },
    rating: {
      type: "string"
    },
    sortBy: {
      type: "string"
    },
    limit: {
      type: "string"
    }
  },
  example: {
    attributes: {
      preview: true
    }
  },

  edit(props) {
    const {
      attributes: {
        plguinSlug = "plugin-reviews",
        layout = "grid",
        rating = "all",
        sortBy = "DESC"
      },
      setAttributes
    } = props;
    let jsx;

    function pluginSlug(value) {
      setAttributes({
        plguinSlug: value
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
            title: "Title"
          },
          /*#__PURE__*/ React.createElement(TextControl, {
            label: "Plugin Slug",
            value: plguinSlug,
            onChange: pluginSlug
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
    } else {
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
