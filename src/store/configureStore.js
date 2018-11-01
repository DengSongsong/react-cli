import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from '../reducers/index'

export default function configureStore(initialState) {
  // const store = createStore(rootReducer, initialState, 
  //   applyMiddleware(logger),
  //   window.devToolsExtension ? window.devToolsExtension() : undefined
  // )
  const store = createStore(rootReducer, initialState, 
    applyMiddleware(logger),
    // window.devToolsExtension ? window.devToolsExtension() : undefined
  )
  return store
}