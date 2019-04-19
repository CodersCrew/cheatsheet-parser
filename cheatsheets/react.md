# React

## Creating components

### Functional components
```jsx
import React from 'react';

const MyComponent = (props) => {
    return (
        <div>Hello World</div>
    );
}

export default MyComponent;
```
Simple function that returns JSX.
Example: https://reactjs.org/docs/components-and-props.html

### Class-based components
```jsx
import React, { Component } from 'react';

class MyComponent extends Component {
    render() {
        return (
            <div>Hello World</div>
        );
    }
}

export default MyComponent;
```
JavaScript class that extends from the Component class. In class-based components we can use state and lifecycle methods.
Example: https://reactjs.org/docs/components-and-props.html