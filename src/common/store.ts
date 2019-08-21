import {
  Reducer,
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  ReducersMapObject,
} from "redux";
import thunk from "redux-thunk";
import { ReducerKey } from "../enums/reducerKey";
import { reducer } from "../store/reducer";

const reducers: ReducersMapObject = {};

export const store = createStore(
  reducer,
  undefined,
  compose(applyMiddleware(thunk)),
);

export function injectReducer(key: ReducerKey, r: Reducer): void {
  reducers[key] = r;
  store.replaceReducer(combineReducers(reducers));
}

export function deleteReducer(key: ReducerKey): void {
  if (typeof reducers[key] !== "undefined") {
    delete reducers[key];
    store.replaceReducer(combineReducers(reducers));
  }
}
