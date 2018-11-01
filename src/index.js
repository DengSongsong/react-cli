import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './common/style/index.less'

import RouteMap from './router/routeMap'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <RouteMap></RouteMap>
  </Provider>, 
  document.getElementById('app'))