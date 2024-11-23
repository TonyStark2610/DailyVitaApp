import { combineReducers } from "redux";
import healthConcernsReducer from "./healthConcernsReducer";
import dietReducer from "./dietReducer";
import allergyReducer from "./allergyReducer";

const rootReducer = combineReducers({
  healthConcerns: healthConcernsReducer,
  diet: dietReducer,
  allergy: allergyReducer,
});

export default rootReducer;
