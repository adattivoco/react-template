import { applyMiddleware, createStore, compose } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware = applyMiddleware(thunk, logger)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducers,
  {},
  composeEnhancers(middleware)
)
