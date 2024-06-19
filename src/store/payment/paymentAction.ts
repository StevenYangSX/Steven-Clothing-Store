import { createAction } from "../../utils/reducer/reducer.util";
import { PAYMENT_ACTION_TYPE } from "./paymentActionType";

export const setPaymentIntent = (intent: object | null) =>
  createAction(PAYMENT_ACTION_TYPE.SET_PAYMENT_INTENT, intent);
