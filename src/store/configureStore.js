import { createStore, combineReducers } from 'redux';
import userDataReducer from '../reducers/userData'
import modalStatus from "../reducers/modalStatus";


export default () => {
  const store = createStore(
    combineReducers({
        userData: userDataReducer,
        modalStatus: modalStatus
    })
  );

  return store;
};
