import axios from 'axios'
import settings from 'Settings'
import store from '../store'

// configure base url
const instance = axios.create({
  baseURL: settings.restEngine,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// intercept requests and add authorization token
instance.interceptors.request.use((config) => {
  const { token } = store.getState().auth
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

export default function restCall(params) {
  const {
    url, method, data, startType, successType,
    errorType, authType, dispatch
  } = params
  if (startType) {
    dispatch({ type: startType })
  }
  const axVars = {
    url,
    method
  }
  if (method === 'DELETE' || method === 'GET') {
    axVars.params = data || {}
  } else {
    axVars.data = data || {}
  }
  return instance(axVars)
    .then((resp) => {
      dispatch({ type: successType, payload: resp.data })
    }).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            dispatch({
              type: authType || errorType,
              message: error.response.data.message
                       || 'User not authorized to perform this function. Please log in again.'
            })
            break
          default:
            dispatch({ type: errorType, message: error.response.data.message })
        }
      } else {
        dispatch({ type: errorType, message: error.message })
      }
    })
}
