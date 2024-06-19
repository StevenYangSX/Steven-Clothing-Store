import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { stripePromise } from "../../utils/stripe/stripe.utils";
import PaymentForm from "../../components/payment-form/PaymentForm.component";
import { Appearance } from "@stripe/stripe-js";
import Button from "../../components/button/Button.component";
import { useSelector } from "react-redux";
import { selectPaymentIntent } from "../../store/payment/paymentSelector";

const Payment = () => {
  const paymentIntent = useSelector(selectPaymentIntent);
  const [message, setMessage] = useState<string | null>(null);
  const prevPaymentIntent = useRef(paymentIntent);
  //   const stripe = useStripe();
  //   const elements = useElements();
  const navigate = useNavigate();
  const appearance: Appearance = {
    theme: "flat",
    variables: { colorPrimaryText: "#262626" },
  };

  const options = {
    clientSecret: paymentIntent?.client_secret,
    appearance,
  };

  useEffect(() => {
    if (prevPaymentIntent.current !== paymentIntent) {
      if (paymentIntent === null && prevPaymentIntent.current !== null) {
        navigate("/");
      }

      prevPaymentIntent.current = paymentIntent;
    }
  }, [paymentIntent]);
  return (
    <>
      {paymentIntent && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
