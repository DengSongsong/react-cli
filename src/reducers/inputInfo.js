import * as actionTypes from '../constants/inputInfo'

const initialState = []

export default function inputInfo (state = initialState, action) {
  switch(action.type) {
    case actionTypes.INPUT_UPDATE:
      return action.data
    default:
      return state
  }
}