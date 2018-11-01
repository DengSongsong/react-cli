import React from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import App from '../containers/App/App'

class RouteMap extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={App}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
export default RouteMap