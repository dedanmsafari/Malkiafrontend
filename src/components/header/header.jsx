import React from "react";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cartIcon/cartIcon";
import { createStructuredSelector } from "reselect";
import CartDropDown from "../cartDropDown/cartDropDown";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./headerstyles";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { selectCartHidden } from "../../redux/cart/cartSelector";

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="./shop">SHOP</OptionLink>
        <OptionLink to="./checkout">CHECKOUT</OptionLink>
        <OptionLink to="./contacts">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={() => auth.signOut()}> Sign Out </OptionLink>
        ) : (
          <OptionLink to="/signin"> Sign In </OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropDown />}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
