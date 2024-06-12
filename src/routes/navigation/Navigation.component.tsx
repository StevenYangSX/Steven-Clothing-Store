import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/UserContext";
import { signOutUser } from "../../utils/firebase/firebase.util";

import CartIcon from "../../components/cart-icon/CartIcon.component";
import { CartContext } from "../../context/CartContext";
import CartDropdown from "../../components/cart-dropdown/CartDropDown.component";

import {
  NavigationContainer,
  LogoContainer,
  NaviLinks,
  NavLink,
  NavSpan,
} from "./navigation.styles";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NaviLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavSpan onClick={signOutUser}>SIGN OUT</NavSpan>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NaviLinks>
        {isCartOpen && <CartDropdown />}
        {/* <CartDropdown /> */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
