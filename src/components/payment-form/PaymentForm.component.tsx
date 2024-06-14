import { PaymentFormContainer, FormContainer } from "./paymentForm.styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../button/Button.component";

import { useState } from "react";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cartSelector";
import { selectCurrentUser } from "../../store/user/userSelector";

const PaymentForm = () => {
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const paymentHandler = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    console.log("check res-->", clientSecret);
    const currentPaymentElement = elements.getElement(CardElement);
    let paymentResult;
    if (currentPaymentElement) {
      paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: currentPaymentElement,
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
          },
        },
      });

      setIsProcessing(false);

      if (paymentResult.error) {
        alert(paymentResult.error);
        return;
      }
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful.");
      }
    } else {
      alert("Payment Error.");
    }
  };

  return (
    <>
      <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment</h2>
          <CardElement />
          <Button buttonType="inverted" disabled={isProcessing}>
            Pay Now
          </Button>
        </FormContainer>
      </PaymentFormContainer>
    </>
  );
};

export default PaymentForm;
