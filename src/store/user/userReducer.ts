import { USER_ACTION_TYPES } from "./userActionType";

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state: any = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
