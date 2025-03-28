import { combineReducers } from 'redux';
import loginReducer from "./src/components/Login/login.slice";
import workflowTableReducer from "./src/components/WorkflowTable/workflowTable.slice";

const rootReducer = combineReducers({
  login: loginReducer,
  workflows: workflowTableReducer,
});

export default rootReducer;
