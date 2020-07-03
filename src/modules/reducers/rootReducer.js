import { combineReducers } from "redux";
import tasks from "./taskReducer";
import app from "./appReducer";

export default combineReducers({
  tasks,
  app,
});
