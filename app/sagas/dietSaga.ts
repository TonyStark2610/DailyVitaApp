import { call, takeLatest } from "redux-saga/effects";
import { addDiet } from "../reducers/dietReducer";


const fetchDietsApi = async () => {
  return new Promise<string[]>((resolve) =>
    setTimeout(() => resolve(["Vegan", "Ketogenic", "Paleo", "Vegetarian"]), 1000)
  );
};


function* fetchDietsWorker() {
  try {
    const data: string[] = yield call(fetchDietsApi); 
    console.log("Fetched diets:", data);
    
  } catch (error) {
    console.error("Failed to fetch diets:", error);
  }
}


export default function* dietSaga() {
  yield takeLatest(addDiet.type, fetchDietsWorker); 
}
