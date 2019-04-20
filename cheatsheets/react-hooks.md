# React Hooks



## Functionalities from class-based components


### componentDidMount()
```javascript
useEffect(() => {
    /* componendDidMount function content */
}, []);
```
Function, that works like `componentDidMount()` in class-based components.


### componentDidUpdate()
```javascript
const mounted = useRef();
useEffect(() => {
    if (!mounted.current) {
        mounted.current = true;
        return;
    }
    /* componentDidUpdate function content */
}, []);
```
Function, that works like `componentDidUpdate()` in class-based components.


### componentDidMount() + componentDidUpdate()
```javascript
useEffect(() => {
    /* componendDidMount + componendDidUpdate function content */
});
```
Function, that works like combination of `componentDidMount()` and `componentDidUpdate()` in class-based components.


### componentWillUnmount()
```javascript
useEffect(() => {
  return () => {
    /* componentWillUnmount function content */
  }
}, []);
```
Function, that works like `componentWillUnmount()` in class-based components.


### forceUpdate()
```javascript
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
```
Function, that works like `this.forceUpdate()` in class-based components.





## Other hooks


### useClientRect
```javascript
function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```
Measure the element on the first rendering.
Example: https://codesandbox.io/s/1rzwy8r147


### useImageClientRect
```javascript
function useImageClientRect() {
  const [rect, setRect] = useState({});
  const ref = useCallback(node => {
    if (node !== null) {
      node.addEventListener("load", () => {
        setRect(node.getBoundingClientRect());
      });
    }
  }, []);
  return [rect, ref];
}
```
Measure the image element after its first loading into the DOM.
Example: https://codesandbox.io/s/qz3k091q26


### useClientRectObserver
```javascript
function useClientRectObserver() {
  const ref = useRef();
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }

      setRect(entries[0].contentRect);
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.unobserve(ref.current);
  }, []);

  return [rect, ref];
}
```
Measure the element on the first rendering and every resize. That hook uses an experimental ResizeObserver. If you care about backwards compatibility use [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill).
Example: https://codesandbox.io/s/42ll22y4v0


### useFetch
```javascript
function useFetch(url, initialValue) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading, error];
}
```
Use browser Fetch API to send a request to the provided URL.
Example: https://codesandbox.io/s/9z9mmqo58y


### usePrevious
```javascript
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
```
Access to the previous state/props of the component.
Example: https://codesandbox.io/s/5w9n7wxjnk