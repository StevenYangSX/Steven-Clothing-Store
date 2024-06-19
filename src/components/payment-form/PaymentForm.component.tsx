import { PaymentFormContainer, FormContainer } from "./paymentForm.styles";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import Button from "../button/Button.component";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cartSelector";
import { selectCurrentUser } from "../../store/user/userSelector";
import { selectPaymentIntent } from "../../store/payment/paymentSelector";
import Message from "../message/Message";
import { MessageProps } from "../../types/systemTypes";
import { setPaymentIntent } from "../../store/payment/paymentAction";

const PaymentForm = () => {
  const amount = useSelector(selectCartTotal);
  const paymentIntent = useSelector(selectPaymentIntent);
  const [message, setMessage] = useState<MessageProps | null>(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [stripeOptions, setOptions] = useState<Object | undefined>(undefined);

  const paymentHandler = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Instead of redirecting the user to a return_url, you can handle the result directly
        // For example, you could provide a return_url if required by your setup
      },
      redirect: "if_required", // This ensures that the user is only redirected if 3D Secure or another verification is needed
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds, card has expired, etc.)
      setMessage({
        type: "error",
        content: result.error.message || "An unexpected error occurred.",
        showTime: 3,
      });
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      // The payment has been processed successfully
      setMessage({
        type: "success",
        content: "Payment succeeded!",
        showTime: 3,
      });
    }

    // const currentPaymentElement = elements.getElement(CardElement);
    //  let paymentResult;
    // if (currentPaymentElement) {
    //   paymentResult = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: currentPaymentElement,
    //       billing_details: {
    //         name: currentUser ? currentUser.displayName : "Guest",
    //       },
    //     },
    //   });

    //   setIsProcessing(false);

    //   if (paymentResult.error) {
    //     alert(paymentResult.error);
    //     return;
    //   }
    //   if (paymentResult.paymentIntent.status === "succeeded") {
    //     alert("Payment Successful.");
    //   }
    // } else {
    //   alert("Payment Error.");
    // }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleDisappear = () => {
    console.log("disapper...");
    dispatch(setPaymentIntent(null));
    setMessage(null); // Update the state to reflect the message has disappeared
  };

  return (
    <>
      <PaymentFormContainer>
        {message ? (
          <Message
            type={message.type}
            content={message.content}
            showTime={message.showTime}
            onDisappear={handleDisappear}
          />
        ) : null}
        <FormContainer onSubmit={paymentHandler}>
          {/* <CardElement options={cardElementOptions} /> */}

          {paymentIntent ? <PaymentElement /> : null}
          <Button type="submit" buttonType="inverted">
            PAY
          </Button>
        </FormContainer>
      </PaymentFormContainer>
    </>
  );
};

export default PaymentForm;

{
  /* <form onSubmit={handleSubmit}>
<PaymentElement />
<Button type="submit" buttonType="inverted">
  PAY
</Button>
</form> */
}
