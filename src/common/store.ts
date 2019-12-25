import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
  ReducersMapObject,
} from "redux";
import thunk from "redux-thunk";
import { ReducerKey } from "../enums/reducerKey";

const reducers: ReducersMapObject = {
  __: () => ({}),
};

/**
 * store
 */
export const store = createStore(
  combineReducers(reducers),
  undefined,
  compose(applyMiddleware(thunk)),
);

/**
 * inject reducer
 * @param key ReducerKey
 * @param r Reducer
 */
export function injectReducer(key: ReducerKey, r: Reducer): void {
  reducers[key] = r;
  store.replaceReducer(combineReducers(reducers));
}

/**
 * delete reducer
 * @param key ReducerKey
 */
export function deleteReducer(key: ReducerKey): void {
  if (typeof reducers[key] !== "undefined") {
    delete reducers[key];
    store.replaceReducer(combineReducers(reducers));
  }
}
