import { CATEGORIES_ACTION_TYPE } from "./categoryActionType";
import { createAction } from "../../utils/reducer/reducer.util";

export const setCategories = (categoriesArray: any) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);
