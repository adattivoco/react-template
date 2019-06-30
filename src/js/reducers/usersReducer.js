const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_PENDING':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'USER_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.message
      }
    case 'USER_FULFILLED':
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload
      }
    case 'USERS_FULFILLED':
      return {
        ...state,
        loading: false,
        error: null,
        users: [...action.payload]
      }
    default:
      return state
  }
}
