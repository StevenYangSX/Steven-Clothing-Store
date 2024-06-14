import { createAction } from "../../utils/reducer/reducer.util";
import { USER_ACTION_TYPES } from "./userActionType";

export const setCurrentUser = (user: any) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
