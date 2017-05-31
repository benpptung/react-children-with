# react-children-with

send new props to children in React.

## Installation

`npm install -D react-children-with`

## Example

Instead of

```

var children = React.Children.map(this.props.children, child=> {

  return React.cloneElement(child, new_props);
})

```

Just write
```
var children = merge(this.props.children, new_props);

```

or

Instead of
```
var types = [Apple, Orange];
var children = React.Children.map(this.props.children, child=> {

  
  return types.indexOf(child.type) >= 0 ? React.cloneElement(child, new_props) : child;
})
```

just write
```
var types = [Apple, Orange];
var children = merge(this.props.children, new_props, types);
```