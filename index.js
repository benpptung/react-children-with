'use strict';

const React = require('react');

/**
 *
 * @param children
 * @param props
 * @return {ReactElement}
 */
module.exports = function (children, props) {

  var _props = {};
  var has_prop = false;
  for (let p in props) {
    if (props.hasOwnProperty(p) && typeof props[p] !== 'undefined') {
      _props[p] = props[p];
      has_prop = true;
    }
  }

  if (!has_prop) return children;
  return React.Children.map(children, element=> {

      // ignore html element
      if (typeof element.type == 'string') return element;
      return React.cloneElement(element, _props);
  })
};