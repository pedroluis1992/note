import { createStore, combineReducers } from "redux";
import users from './reducers/users';
import results from './reducers/results';

const reducer = combineReducers({
  users,
  results
});

const store = createStore(reducer);

export default store;