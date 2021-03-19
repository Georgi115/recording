import { combineReducers } from "redux";
import reducerHomePage from "./reducerHomePage";
import clientPageReducer from "./clientPageReducer";
import calendarReducer from "./calendarReducer";
import adminPageReducer from "./adminPageReducer";
export default combineReducers({
  reducerHomePage,
  clientPageReducer,
  calendarReducer,
  adminPageReducer,
});
