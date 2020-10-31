import React from "react";
import withTooltip from "../common/withTooltip";
import { Typography } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
  TitleContainer
} from "./headerstyles";

const NavBar = ({ user, showTooltip}) => {
  return (
    <HeaderContainer>
          <LogoContainer to="/">
        <Logo className="logo" />
      
      </LogoContainer>
      <TitleContainer>
      <h5>  MalKia Rentals 
    <p> <small>  Kenya`s No.1</small></p></h5> 
    </TitleContainer>
      <OptionsContainer>
      
    
        { user && user.isAdmin ?
        <>
        <OptionLink to="./customers"><Typography  color='textSecondary' display = 'block'>Customers.</Typography></OptionLink>
        <OptionLink to="./rentals"><Typography  color='textSecondary' display = 'block'>Rentals.</Typography></OptionLink>
        </>
        :null}

           {!user && <> <OptionLink to="./login"><Typography  color='textSecondary' display = 'block'>Login. {showTooltip && <div>(For continued users)</div>}</Typography></OptionLink>
        <OptionLink to="./register"><Typography  color='textSecondary' display = 'block'>Register.{showTooltip && <div>(For first time users)</div>}</Typography></OptionLink> </>}


           {user && <>
         <OptionLink to="./mustsee"><Typography  color='textSecondary' display = 'block'>Must See!</Typography></OptionLink>
        <OptionLink to="./maps"><Typography  color='textSecondary' display = 'block'>Rental Location.</Typography></OptionLink>
           <OptionLink to="./me"><h6> <Typography  color='textSecondary' display = 'block'>Welcome.{user.name}</Typography></h6></OptionLink>
        <OptionLink to="./logout"><Typography  color='textSecondary' display = 'block'>Log Out</Typography></OptionLink>
         </>}


        </OptionsContainer>
        </HeaderContainer>

    // <nav className="navbar navbar-expand-lg main-nav">
    //   <Link className="navbar-brand brandname" to="/">
    //   <h5>  MalKia Rentals 
    //    <p> <small>  Kenya`s No.1</small></p></h5> 
    //   </Link>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarNavAltMarkup"
    //     aria-controls="navbarNavAltMarkup"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon" />
    //   </button>
    //   <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
    //     <div className="navbar-nav">

     
    //       <NavLink className="nav-item nav-link" to="/movies">
    //       Shows
    //       {showTooltip && <div>(View all the available shows) </div>}
    //       </NavLink>
      

    //      { user && user.isAdmin ?
    //      <React.Fragment>
    //      <NavLink className="nav-item nav-link" to="/customers">
    //         Customers
    //         {showTooltip && <div> (list of Customers)</div>}
    //       </NavLink>
    //       <NavLink className="nav-item nav-link" to="/rentals">
    //         Rentals
    //         {showTooltip && <div> (all available rentals) </div>}
    //       </NavLink>
        
    //       </React.Fragment> : null
    //       }
    //       {!user &&
    //       <React.Fragment>
             
          
    //       <NavLink className="nav-item nav-link mr-sm-2" to="/login">
    //         Login
    //         {showTooltip && <div> (Enter Site) </div>}
    //       </NavLink>
    //       <NavLink className="nav-item nav-link mr-sm-2" to="/register">
    //         Register
    //         {showTooltip && <div>(For first time users)</div>}
    //       </NavLink>
        
             
    //       </React.Fragment>
    //       }
    //       {user &&
    //       <React.Fragment>
    //           <NavLink className="nav-item nav-link" to="/mustsee">
    //         Must see!
    //         {showTooltip && <div> (most watched shows) </div>}
    //       </NavLink>
    //           <NavLink className="nav-item nav-link" to="/maps">
    //         Rental Location
    //         {showTooltip && <div> (rental places around) </div>}
    //       </NavLink>
    //       <NavLink className="nav-item nav-link" to="/Me">
    //        <h6> Welcome! {user.name}</h6>
    //       </NavLink>
    //       <NavLink className="nav-item nav-link" to="/logout">
    //         Logout
    //         {showTooltip && <div> (System Exit) </div>}
    //       </NavLink>
    //       </React.Fragment>
    //       }
    //     </div>
    //   </div>
    // </nav>

  );
};

export default withTooltip(NavBar);
