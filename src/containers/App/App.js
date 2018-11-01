import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as inputInfoActionsFromOtherFile from '../../actions/inputInfo'
import './index.less'

class App extends React.Component {
  clickHandle() {
    this.props.inputInfoActions.update({
      value: inpVal
    })
  }
  render() {
    return (
      <div className="app">
        <img src={require('../../common/images/u=1022562505,1474493798&fm=26&gp=0.jpg')} alt=""/>
        <input type="text" ref={input => this.input = input}/>
        <button onClick={this.clickHandle.bind(this)}>提交</button>
        <div>{this.props.inputVal.value}</div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    inputVal: state.inputInfo
  }
}
function mapDispatchToProps(dispatch) {
  return {
    inputInfoActions: bindActionCreators(inputInfoActionsFromOtherFile, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)