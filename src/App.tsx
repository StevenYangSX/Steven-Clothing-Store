import Home from "./routes/home/Home.component";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.component";
import Authentication from "./routes/authentication/Authentication.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./routes/checkout/Checkout.component";
import { useEffect } from "react";
import { setCurrentUser } from "./store/user/userAction";
import { useDispatch } from "react-redux";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.util";
import PaymentForm from "./components/payment-form/PaymentForm.component";
import Payment from "./routes/payment/Payment.component";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscire = onAuthStateChangedListener((user: any) => {
      console.log("check obserber -> ", user);
      if (user) {
        createUserDocumentFromAuth(user);
        navigate("/");
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscire;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
      </Route>
    </Routes>
  );
};

export default App;
