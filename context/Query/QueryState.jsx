import { useReducer } from 'react'

import * as types from '../types'
import QueryContext from './QueryContext'
import QueryReducer from './QueryReducer'

export default function PaginationState({ children }) {
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
  )
}
