'use strict';

const React = require('react');

/**
 *
 * @param children
 * @param props
 * @param type
 * @return {ReactElement}
 */
module.exports = function (children, props, type) {

  var _props = {};
  var has_prop = false;
  for (let p in props) {
    if (props.hasOwnProperty(p) && typeof props[p] !== 'undefined') {
      _props[p] = props[p];
      has_prop = true;
    }
  }

  if (!has_prop) return children;
  return React.Children.map(children, child=> {

    // ignore html element
    if (typeof child.type == 'string') return child;

    // if type, only limited types recieve new props
    if (typeof type == 'function') {
      return child.type === type ? React.cloneElement(child, _props) : child;
    }

    // if type is an Array, check if child is in the array, and add new props
    if (Array.isArray(type)) {
      return type.indexOf(child.type) >= 0 ? React.cloneElement(child, _props) : child;
    }

    // if no type, all children recieve new props
    return React.cloneElement(child, _props);
  })
};