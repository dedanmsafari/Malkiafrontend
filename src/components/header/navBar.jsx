import React from "react";
import { Link, NavLink } from "react-router-dom";
import withTooltip from "../common/withTooltip";

const NavBar = ({ user, showTooltip}) => {
  return (
   
    <nav className="navbar navbar-expand-lg main-nav">
      <Link className="navbar-brand brandname" to="/">
      <h5>  MalKia Rentals 
       <p> <small>  Kenya`s No.1</small></p></h5> 
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
        <div className="navbar-nav">

     
          <NavLink className="nav-item nav-link" to="/movies">
          Shows
          {showTooltip && <div>(View all the available shows) </div>}
          </NavLink>
      

         { user && user.isAdmin ?
         <React.Fragment>
         <NavLink className="nav-item nav-link" to="/customers">
            Customers
            {showTooltip && <div> (list of Customers)</div>}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
            {showTooltip && <div> (all available rentals) </div>}
          </NavLink>
        
          </React.Fragment> : null
          }
          {!user &&
          <React.Fragment>
             
          
          <NavLink className="nav-item nav-link mr-sm-2" to="/login">
            Login
            {showTooltip && <div> (Enter Site) </div>}
          </NavLink>
          <NavLink className="nav-item nav-link mr-sm-2" to="/register">
            Register
            {showTooltip && <div>(For first time users)</div>}
          </NavLink>
        
             
          </React.Fragment>
          }
          {user &&
          <React.Fragment>
              <NavLink className="nav-item nav-link" to="/mustsee">
            Must see!
            {showTooltip && <div> (most watched shows) </div>}
          </NavLink>
              <NavLink className="nav-item nav-link" to="/maps">
            Rental Location
            {showTooltip && <div> (rental places around) </div>}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/Me">
           <h6> Welcome! {user.name}</h6>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
            Logout
            {showTooltip && <div> (System Exit) </div>}
          </NavLink>
          </React.Fragment>
          }
        </div>
      </div>
    </nav>
 
  );
};

export default withTooltip(NavBar);
