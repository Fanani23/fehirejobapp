import { combineReducers } from "redux";
import userReducer from "./Users";

const rootReducers = combineReducers({
  user: userReducer,
});

export default rootReducers;
