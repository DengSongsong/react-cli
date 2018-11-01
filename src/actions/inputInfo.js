import * as actionTypes from '../constants/inputInfo'

export function update(data) {
  return {
    type: actionTypes.INPUT_UPDATE,
    data
  }
}