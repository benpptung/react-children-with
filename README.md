# react-children-with

return children with new props merged.

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