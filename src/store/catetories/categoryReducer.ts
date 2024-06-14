import { CATEGORIES_ACTION_TYPE } from "./categoryActionType";

export const INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state: any = INITIAL_STATE, action: any = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
