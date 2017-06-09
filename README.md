# react-children-with

send new props to children in React.

## Installation

`npm install -S react-children-with`

## Example

Instead of

```
const React = require('react');

var children = React.Children.map(this.props.children, child=> {

  return React.cloneElement(child, new_props);
})

```

Just write
```
const merge = require('react-children-with');

var children = merge(this.props.children, new_props);

```

or Instead of
```
const React = require('react');

var children = React.Children.map(this.props.children, child=> {
  return [Apple, Orange].indexOf(child.type) >= 0 ? 
    React.cloneElement(child, new_props) : child;
})
```

just write
```
const merge = require('react-children-with');

var children = merge(this.props.children, new_props, [Apple, Orange]);
```

## merge.deep()
same as merge(), but it can merge props to grand child, or grand's grand child....

```
<Parent>
	<Child>
		<GrandChild />
	</Child>
	<Child>
		<GrandChild />
	</Child>
</Parent>
```

in Parent, merge new_props to `GrandChild` and skip `Child`
```
const merge = require('react-children-with').deep;

var children = merge(props.children, {onSelect}, [GrandChild]);

```