import { ActionType } from "../../../enums/actionType";
import { State } from "./reducer";

export interface ResetStateAction {
  type: ActionType.ReduxDemo_ResetState;
  payload?: State;
}

export interface UpdateStateAction {
  type: ActionType.ReduxDemo_UpdateState;
  payload: Partial<State>;
}

export interface UpdateCounterAction {
  type: ActionType.ReduxDemo_UpdateCounter;
  payload: number;
}

export type Actions =
  | ResetStateAction
  | UpdateStateAction
  | UpdateCounterAction;

/**
 * reset state
 * @param state State
 */
export function resetState(state?: State): ResetStateAction {
  return {
    type: ActionType.ReduxDemo_ResetState,
    payload: state,
  };
}

/**
 * update state
 * @param state Partial<State>
 */
export function updateRedirectUrl(state: Partial<State>): UpdateStateAction {
  return {
    type: ActionType.ReduxDemo_UpdateState,
    payload: state,
  };
}

/**
 * update counter
 * @param value number
 */
export function updateCounter(value: number): UpdateCounterAction {
  return {
    type: ActionType.ReduxDemo_UpdateCounter,
    payload: value,
  };
}
