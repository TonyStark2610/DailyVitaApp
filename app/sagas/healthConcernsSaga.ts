import { call, put, takeLatest } from "redux-saga/effects";
import { setHealthConcerns, fetchHealthConcerns } from "../reducers/healthConcernsReducer";


const fetchHealthConcernsApi = async () => {
  return new Promise<string[]>((resolve) =>
    setTimeout(() => resolve(["Sleep", "Stress", "Immunity", "Mood"]), 1000)
  );
};

function* fetchHealthConcernsWorker() {
  try {
    const data: string[] = yield call(fetchHealthConcernsApi);
    yield put(setHealthConcerns(data));
  } catch (error) {
    console.error("Failed to fetch health concerns:", error);
  }
}

export default function* healthConcernsSaga() {
  yield takeLatest(fetchHealthConcerns.type, fetchHealthConcernsWorker);
}
