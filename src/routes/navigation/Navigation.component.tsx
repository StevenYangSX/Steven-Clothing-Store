import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../components/cart-icon/CartIcon.component";

import CartDropdown from "../../components/cart-dropdown/CartDropDown.component";
import { useSelector } from "react-redux";
import {
  NavigationContainer,
  LogoContainer,
  NaviLinks,
  NavLink,
  NavSpan,
} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/userSelector";
import { selectIsCartOpen } from "../../store/cart/cartSelector";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

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
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
