import * as actionTypes from './actionsTypes';

export const saveResult = (res) => {
  //const updatedResult = res * 2;
  return {
    type: actionTypes.STORE_RESULT,
    result: res,
  }
}

export const storeResult = (res) => {
  return function (dispatch, getState) {
    setTimeout(() => {
      const oldCounter = getState().ctr.counter;
      console.log(oldCounter);
      dispatch(saveResult(res));
    }, 2000);
  }
};

export const deleteResult = (res) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resutl: res,
  }
};