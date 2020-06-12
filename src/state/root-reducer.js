import { combineReducers } from "redux";
import associativeCenterState from "./reducers/associative-center-state";
import associativeCountState from "./reducers/associative-count-state";
import climateRatingsState from "./reducers/climate-ratings-state";
import climateStackState from "./reducers/climate-stack-state";
import sequentialCenterState from "./reducers/sequential-center-state";
import sequentialCountState from "./reducers/sequential-count-state";
import transitionLogState from "./reducers/transition-log-state";
import transitionTypeState from "./reducers/transition-type-state";
import mathCentersState from "./reducers/math-instruction-state";
import mathCountState from "./reducers/math-count-state";
import engagementCountState from "./reducers/engagement-count-state";
import instructionStackState from "./reducers/instruction-stack-state";
import listeningCountState from "./reducers/listening-count-state";
import teacherSelectedState from "./reducers/teacher-selected-state";
import teacherListState from "./reducers/teacher-list-state";
import coachState from './reducers/coach-state';

export default combineReducers({
  associativeCenterState,
  associativeCountState,
  climateRatingsState,
  climateStackState,
  sequentialCenterState,
  sequentialCountState,
  transitionLogState,
  transitionTypeState,
  mathCentersState,
  mathCountState,
  engagementCountState,
  instructionStackState,
  listeningCountState,
  teacherSelectedState,
  teacherListState,
  coachState
});
