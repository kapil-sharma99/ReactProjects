import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
  result: [],
}

const deleteResult = (state, action) => {
  const updatedArray = state.result.filter(result => result.id !== action.resultElId);
  return updateObject(state, {result: updatedArray});
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(state, {result: state.result.concat({id: new Date(),value: action.result}),})
    case actionTypes.DELETE_RESULT:
      // const id = 2;
      // const newArray = [...state.result];
      // newArray.splice(id, 1);
      return deleteResult(state, action);
  }
  return state;
}

export default reducer;