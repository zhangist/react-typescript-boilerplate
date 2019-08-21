import { ActionType } from "../enums/actionType";
import { Actions } from "./actions";

export interface State {
  title: string;
}

export const getInitialState: () => State = () => ({
  title: "React-ts-boilerplate",
});

export function reducer(state = getInitialState(), action: Actions): State {
  switch (action.type) {
    case ActionType.App_ResetState: {
      return action.payload || getInitialState();
    }
    case ActionType.App_UpdateState: {
      return Object.assign({}, state, { ...action.payload });
    }
    default: {
      return state;
    }
  }
}
