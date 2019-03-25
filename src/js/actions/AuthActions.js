import restCall from 'shared/api'

export const login = (email, password) => (dispatch) => {
  restCall({
    url: '/auth',
    method: 'POST',
    data: {
      email,
      password
    },
    startType: 'AUTH_PENDING',
    successType: 'LOGIN_FULFILLED',
    errorType: 'AUTH_REJECTED',
    dispatch
  })
}

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT_FULFILLED'
  })
}

export const signup = (data) => (dispatch) => {
  restCall({
    url: '/users',
    method: 'POST',
    data,
    startType: 'AUTH_PENDING',
    successType: 'CREATE_USER_FULFILLED',
    errorType: 'AUTH_REJECTED',
    dispatch
  })
}

export const verifyEmail = (id, code) => (dispatch) => {
  restCall({
    url: `/users/${id}/verify`,
    method: 'POST',
    data: {code},
    startType: 'AUTH_PENDING',
    successType: 'VERIFY_CODE_FULFILLED',
    errorType: 'AUTH_REJECTED',
    dispatch
  })
}

export const verifyResend = (id) => (dispatch) => {
  restCall({
    url:`/users/${id}/verify`,
    method: 'PUT',
    startType: 'AUTH_PENDING',
    successType: 'VERIFY_RESEND_FULFILLED',
    errorType: 'AUTH_REJECTED',
    dispatch
  })
}

export const resetPW = (token, password) => (dispatch) => {
  restCall({
    url: '/auth/forgot-password',
    method: 'PUT',
    data: {token, password},
    startType: 'AUTH_PENDING',
    successType: 'RESET_PW_FULFILLED',
    errorType: 'AUTH_REJECTED',
    dispatch
  })
}

export const requestReset = (email, clientURL) => (dispatch) =>  {
  restCall({
    url: '/auth/forgot-password',
    method: 'POST',
    data: {email, clientURL},
    startType: 'AUTH_PENDING',
    successType: 'REQUEST_RESET_FULFILLED',
    errorType: 'AUTH_REJECTED',
    dispatch
  })
}
