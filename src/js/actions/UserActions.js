import restCall from 'shared/api'

export const getAdmins = () => (dispatch) => {
  restCall({
    url: '/users/',
    method: 'GET',
    data: { admin: 'true' },
    startType: 'USER_PENDING',
    successType: 'USERS_FULFILLED',
    errorType: 'USER_REJECTED',
    authType: 'AUTHENTICATION_REJECTED',
    dispatch
  })
}

export const addAdmin = (firstName, lastName, email) => (dispatch) => {
  const clientURL = `${location.protocol}//${location.host}/resetpassword`
  restCall({
    url: '/users/admin',
    method: 'POST',
    data: {
      firstName,
      lastName,
      email,
      clientURL
    },
    startType: 'USER_PENDING',
    successType: 'USERS_FULFILLED',
    errorType: 'USER_REJECTED',
    authType: 'AUTHENTICATION_REJECTED',
    dispatch
  })
}

export const removeAdmin = id => (dispatch) => {
  restCall({
    url: `/users/${id}`,
    method: 'DELETE',
    startType: 'USER_PENDING',
    successType: 'USERS_FULFILLED',
    errorType: 'USER_REJECTED',
    authType: 'AUTHENTICATION_REJECTED',
    dispatch
  })
}
