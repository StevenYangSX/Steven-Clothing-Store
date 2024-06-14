import { loadStripe } from "@stripe/stripe-js";
console.log(" process.env", process.env);
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? "";
export const stripePromise = loadStripe(stripePublicKey);
