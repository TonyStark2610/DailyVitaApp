import { call, put, takeLatest } from "redux-saga/effects";
import { addAllergy, removeAllergy } from "../reducers/allergyReducer";


const fetchAllergySuggestionsApi = async () => {
  return new Promise<string[]>((resolve) =>
    setTimeout(() => resolve(["Milk", "Meat", "Wheat", "Nasacort", "Nasalide"]), 1000)
  );
};


function* fetchAllergySuggestionsWorker() {
  try {
    const data: string[] = yield call(fetchAllergySuggestionsApi); 
    console.log("Fetched allergy suggestions:", data);
    
  } catch (error) {
    console.error("Failed to fetch allergy suggestions:", error);
  }
}


export default function* allergySaga() {
  yield takeLatest(addAllergy.type, fetchAllergySuggestionsWorker);
  yield takeLatest(removeAllergy.type, fetchAllergySuggestionsWorker); 
}
