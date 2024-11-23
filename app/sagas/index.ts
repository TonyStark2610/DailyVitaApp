import { all } from "redux-saga/effects";
import healthConcernsSaga from "./healthConcernsSaga";
import dietSaga from "./dietSaga";
import allergySaga from "./allergySaga";

export default function* rootSaga() {
  yield all([
    healthConcernsSaga(),
    dietSaga(), 
    allergySaga(), 
  ]);
}
