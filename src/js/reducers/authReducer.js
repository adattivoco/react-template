import history from 'shared/history'

const initialState = {
  user: sessionStorage.userObject ? JSON.parse(sessionStorage.userObject) : null,
  token: sessionStorage.tokenObject,
  loading: false,
  resetSuccess: false,
  error: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_PENDING':
      return {
        ...state,
        loading: true,
        error: null,
        resetSuccess: false
      }
    case 'AUTH_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.message
      }
    case 'AUTHENTICATION_ERROR':
      sessionStorage.clear()
      history.push('/login')
      return {
        ...state,
        loading: false,
        error: action.message,
        user: null,
        token: null
      }
    case 'LOGIN_FULFILLED':
      const { user, token } = action.payload
      sessionStorage.setItem('userObject', JSON.stringify(user))
      sessionStorage.setItem('tokenObject', token)
      return {
        ...state,
        loading: false,
        error: null,
        user,
        token
      }
    case 'LOGOUT_FULFILLED':
      sessionStorage.clear()
      history.push('/login')
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
        token: null
      }
    case 'REQUEST_RESET_FULFILLED':
      return {
        ...state,
        loading: false,
        error: null,
        user: null
      }
    case 'RESET_PW_FULFILLED':
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
        resetSuccess: true
      }
    case 'CREATE_USER_FULFILLED': {
      sessionStorage.setItem('userObject', JSON.stringify(action.payload))
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        token: null
      }
    }
    case 'VERIFY_CODE_FULFILLED': {
      sessionStorage.setItem('userObject', JSON.stringify(action.payload.user))
      sessionStorage.setItem('tokenObject', action.payload.token)
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token
      }
    }
    default:
      return state
  }
}
