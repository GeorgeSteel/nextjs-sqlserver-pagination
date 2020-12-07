import * as types from '../types'

const PaginationReducer = (state, action) => {
  switch (action.type) {
    case types.GO_FORWARD:
      return {
        ...state,
        offset: state.offset + 10,
        fetch: state.fetch + 10,
      }
    case types.GO_BACK:
      return {
        ...state,
        offset: state.offset - 10,
        fetch: state.fetch - 10,
      }
    case types.SET_TOTAL_ROWS:
      return {
        ...state,
        rows: action.payload,
      }
    case types.RESET_PAGINATION:
      return {
        ...action.payload,
      }

    default:
      return state
  }
}

export default PaginationReducer
