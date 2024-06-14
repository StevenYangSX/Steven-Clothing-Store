import { Category } from "./../../types/systemTypes";

import { createSelector } from "reselect";

//reselect used for memoization of selectors

const selectCateoryReducer = (state: any) => state.categories;

export const selectCategories = createSelector(
  [selectCateoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((acc: any, category: any) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
