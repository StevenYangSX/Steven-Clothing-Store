import Home from "./routes/home/Home.component";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscire = onAuthStateChangedListener((user: any) => {
      // console.log("check obserber -> ", user);
      if (user) {
        createUserDocumentFromAuth(user);
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
      </Route>
    </Routes>
  );
};

export default App;
