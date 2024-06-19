import { useEffect, useState } from "react";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import "./checkout.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cartSelector";
import { setIsCartOpen } from "../../store/cart/cartAction";
import PaymentForm from "../../components/payment-form/PaymentForm.component";
import Button from "../../components/button/Button.component";
import { selectCurrentUser } from "../../store/user/userSelector";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../utils/stripe/stripe.utils";
import { Appearance } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { setPaymentIntent } from "../../store/payment/paymentAction";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const navigate = useNavigate();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
  }, []);

  const paymentHandler = async () => {
    console.log("start payment process....");
    setIsProcessing(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const intent = response.paymentIntent;

    if (intent) {
      dispatch(setPaymentIntent(intent));
      navigate(`/payment`);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem: any) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${cartTotal}</div>
      {cartItems.length ? (
        <Button buttonType="inverted" disabled={isProcessing} onClick={paymentHandler}>
          {isProcessing ? "loading..." : "PAY NOW"}
        </Button>
      ) : null}

      {/* {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      )} */}
    </div>
  );
};

export default Checkout;
