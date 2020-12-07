# State Management.

For the state management of the application, the project is using the [Context API](https://reactjs.org/docs/context.html), the React's own library for state management.

This app has 2 state providers:

- **Pagination:** Here is stored all the logic related to paginate the results.
- **Query:** And here it's handled which query is going to execute on users page.

### Types.

The types are the actions that can be handled by the reducer.

### Reducer.

The reducer is who updates the state.

### State.

The state is the app's data at runtime, making this way if the state changes, the UI changes too.

## Pagination.

### PaginationContext.

Here we create the pagination's state:

```js
import { createContext } from 'react'

const PaginationContext = createContext()

export default PaginationContext
```

### PaginationReducer.

Here we have a switch case which depending of the action type is going to go to execute an action:

- **Go to next page:**

```js
    case types.GO_FORWARD:
      return {
        ...state,
        offset: state.offset + 10,
        fetch: state.fetch + 10,
      }
```

- **Go to previous page:**

```js
    case types.GO_BACK:
      return {
        ...state,
        offset: state.offset - 10,
        fetch: state.fetch - 10,
      }
```

- **Get the rows number that the query returned**

```js
    case types.SET_TOTAL_ROWS:
      return {
        ...state,
        rows: action.payload,
      }
```

- **Reset to the default values**

```js
    case types.RESET_PAGINATION:
      return {
        ...action.payload,
      }
```

### Pagination Types.

Here you'll find const values which connect the state with the reducer

```js
// Pagination
export const GO_FORWARD = 'GO_FORWARD'
export const GO_BACK = 'GO_BACK'
export const SET_TOTAL_ROWS = 'SET_TOTAL_ROWS'
export const RESET_PAGINATION = 'RESET_PAGINATION'
```

### PaginationState.

Here is where we use the reducer, the context and the types defined combine.
The first 2 lines of the state file we define an **initialState** and **useReducer** Hook:

```js
const initialState = { offset: 0, fetch: 10, rows: 0 }

const [state, dispatch] = useReducer(PaginationReducer, initialState)
```

With these 2 lines of code we match the state and the reducer, this makes when reducer makes an operation, the state is going to be changed and with this, the UI is going to reflect the changes.

The following functions corresponds for each action we defined in the switch case of our reducer, there que defined the `action.type` and the `action.payload`:

```js
const goForward = () => {
  dispatch({
    type: types.GO_FORWARD,
  })
}
const goBack = () => {
  dispatch({
    type: types.GO_BACK,
  })
}
const setRows = rows => {
  dispatch({
    type: types.SET_TOTAL_ROWS,
    payload: rows,
  })
}
const resetPagination = () => {
  dispatch({
    type: types.RESET_PAGINATION,
    payload: initialState,
  })
}
```

And Finally we returned a JSX component which is going to give the access to everything that we defined in the `value` prop, and the children are the components which is going to wrap this state (in this case, every component will have access) :

```js
return (
  <PaginationContext.Provider
    value={{
      offset: state.offset,
      fetch: state.fetch,
      rows: state.rows,
      goForward,
      goBack,
      setRows,
      resetPagination,
    }}
  >
    {children}
  </PaginationContext.Provider>
)
```

## Query.

On the query context, is basically all the same:

### QueryContext.

```js
import { createContext } from 'react'

const QueryContext = createContext()

export default QueryContext
```

### QueryReducer.

The only operation that is going to execute is to update the query string:

```js
const PaginationReducer = (state, action) => {
  switch (action.type) {
    case types.SET_QUERY:
      return {
        query: action.payload,
      }

    default:
      return state
  }
}
```

### QueryState.

And finally the QueryState which is only going to provide the query value and the function who updates the query string.

```js
const initialState = {
    query: 'List of people logged inthe past 90 days, ordered by last login',
  }

  const [state, dispatch] = useReducer(QueryReducer, initialState)

  const setQuery = query => {
    dispatch({
      type: types.SET_QUERY,
      payload: query,
    })
  }

  return (
    <QueryContext.Provider
      value={{
        query: state.query,
        setQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
```

## Context States.

Finally these two states are going to be called in the `_app.jsx`, which is the file with the root tree of components, with this we achieve to get all the values and function through all the app:

```js
function MyApp({ Component, pageProps }) {
  return (
    <PaginationState>
      <QueryState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryState>
    </PaginationState>
  )
}
```
