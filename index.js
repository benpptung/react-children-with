'use strict';

const React = require('react');

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
  for (let p in props) {
    if (props.hasOwnProperty(p) && typeof props[p] !== 'undefined') {
      _props[p] = props[p];
      has_prop = true;
    }
  }

  if (!has_prop) return children;
  if (typeof type == 'boolean' ) deep = type;

  return mergeProps(children);
  function mergeProps(children) {

    return React.Children.map(children, child=> {

      let __props = _props;
      let new_children = null;

      if (child.props && React.Children.count(child.props.children) > 0 && deep === true) {
        new_children = {children: mergeProps(child.props.children) };
        __props = Object.assign({}, _props, new_children );
      }

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