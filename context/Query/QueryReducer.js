import * as types from '../types'

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

export default PaginationReducer
