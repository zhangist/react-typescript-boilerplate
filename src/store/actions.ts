import { ActionType } from "../enums/actionType";
import { State } from "./reducer";

export interface ResetStateAction {
  type: ActionType.App_ResetState;
  payload?: State;
}

export interface UpdateStateAction {
  type: ActionType.App_UpdateState;
  payload: Partial<State>;
}

export type Actions = ResetStateAction | UpdateStateAction;

/**
 * reset state
 * @param state State
 */
export function resetState(state?: State): ResetStateAction {
  return {
    type: ActionType.App_ResetState,
    payload: state,
  };
}

/**
 * update state
 * @param state Partial<State>
 */
export function updateState(state: Partial<State>): UpdateStateAction {
  return {
    type: ActionType.App_UpdateState,
    payload: state,
  };
}
