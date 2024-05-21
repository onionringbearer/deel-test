# 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The difference is in the way the components are evaluated for rerendering. In the PureComponents, the comparison is shallow, which means that for objects and other types that are passed by reference, only the reference is compared and not the different properties within that object. In Components that is not the case.

A profile component that relies on the profile object to show its details will not reliably show the changes in that object in the context of a PureComponent.

# 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

If the update process was stopped by the shouldUpdateComponent method, the context might not be propagated to all the children components that depend on it. This

# 3. Describe 3 ways to pass information from a component to its PARENT.

1. Through events.
2. Through context.
3. Through callbacks (not recommended).

# 4. Give 2 ways to prevent components from re-rendering.

1. Through memoization: useMemo and useCallback.
2. Using keys when mapping iterables in the JSX.
3. Avoiding passing object literals as props in the JSX.

# 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a React empty wrapper for components. Since React components must return one single element, a fragment can be used to group several elements together to be returned by a single component. Fragments can cause styling issues when used loosely. Returning serveral group components when the host container has a given `display` set, may break the layout of the application.

# 6. Give 3 examples of the HOC pattern.

1. Wrapping a component to return a version of it with modified props.
2. Using a WithLoading to add a loading animation to components.
3. Using a HOC to render a component or another based on certain criteria.

# 7. What's the difference in handling exceptions in promises, callbacks and async…await?

Promises come with the chainable `.catch()` method to handle exception.
`async... await...` can perfectly work with `try {} catch {}`.
Callbacks require precise error handling in each of the callback functions, which gets convoluted and is prone to errors.

# 8. How many arguments does setState take and why is it async.

It takes one argument, the new value or a function that will be used to update the value.
It is asynchronous to allow React to evaluate all state updates in the component and children before attempting to rerender.

# 9. List the steps needed to migrate a Class to Function Component.

1. Use the return value of `render()` as the return value of your functional component.
2. Turn the props into the function arguments.
3. Break the state props into `useState` hook calls with destructuring.
4. Change your lifecycle methods into `useEffects`, and consider extracting functionality to custom hooks.
5. Evaluate your component for perfomance enhancements: memoization, JSX clean up, etc...

# 10. List a few ways styles can be used with components.

1. Directly in the elements with the `style` attribute (only when absolutely necessary).
2. Providing a class linked an imported CSS file.
3. Providing a class linked to an imported CSS module file.

# 11. How to render an HTML string coming from the server.

Using one of the server rendering React APIs like renderToString. That is not to mention using SSR libraries like NextJs.
