import { PAYMENT_ACTION_TYPE } from "./paymentActionType";

export const INITIAL_STATE = {
  intent: null,
};

export const paymentReducer = (state: any = INITIAL_STATE, action: any = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_ACTION_TYPE.SET_PAYMENT_INTENT:
      console.log("get here set tu nulll....");
      return { ...state, intent: payload };
    default:
      return state;
  }
};
