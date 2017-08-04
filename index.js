'use strict';

var React = require('react');

/**
 *
 * @param children
 * @param props
 * @param type
 * @param deep
 * @return {ReactElement}
 */
exports = module.exports = merge;
function merge (children, props, type, deep) {

  var _props = {};
  var has_prop = false;
  var p;
  for ( p in props) {
    if (props.hasOwnProperty(p) && typeof props[p] !== 'undefined' && p !== 'children') {
      _props[p] = props[p];
      has_prop = true;
    }
  }

  if (!has_prop) return children;
  if (typeof type == 'boolean' ) deep = type;

  return mergeProps(children);
  function mergeProps(children) {

    return React.Children.map(children, function(child) {

      if (!child || !child.props) return child;

      var __props = _props;
      var new_children = null;

      if (React.Children.count(child.props.children) > 0 && deep === true) {
        new_children = {children: mergeProps(child.props.children) };
        __props = Object.assign({}, _props, new_children );
      }

      // skip html dom, but still merge props to its children
      if (typeof child.type == 'string') return new_children ? React.cloneElement(child, new_children) : child;

      // if type is a constructor
      if (typeof type == 'function') {
        return child.type === type ? React.cloneElement(child, __props) :
          new_children ? React.cloneElement(child, new_children) : child;
      }

      // if type is an array with constructors included
      if (Array.isArray(type)) {
        return type.indexOf(child.type) >= 0 ? React.cloneElement(child, __props) :
          new_children ? React.cloneElement(child, new_children) : child;
      }

      return React.cloneElement(child, __props);
    })
  }
}

exports.deep = function(children, props, type) {
  return merge(children, props, type, true);
};