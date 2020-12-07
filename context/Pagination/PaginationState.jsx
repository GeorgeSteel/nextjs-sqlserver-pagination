import { useReducer } from 'react'

import * as types from '../types'
import PaginationContext from './PaginationContext'
import PaginationReducer from './PaginationReducer'

export default function PaginationState({ children }) {
  const initialState = { offset: 0, fetch: 10, rows: 0 }

  const [state, dispatch] = useReducer(PaginationReducer, initialState)

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
}
