import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({user}) => {
  return (
    <nav className="navbar navbar-expand-lg main-nav">
      <Link className="navbar-brand brandname" to="/">
      <h5>  MalKia Rentals 
       <p> <small>  Kenya`s No.1</small></p>   </h5> 
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
          <NavLink className="nav-item nav-link move-left" to="/movies">
            Movies
          </NavLink>
        
         { user && user.isAdmin ?
         <React.Fragment>
         <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          </React.Fragment> : null
          }
          {!user &&
          <React.Fragment>
           
          <NavLink className="nav-item nav-link move-right" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link move-right" to="/register">
            Register
          </NavLink>
          
          </React.Fragment>
          }
          {user &&
          <React.Fragment>
              <NavLink className="nav-item nav-link" to="/mustsee">
            Must see!
          </NavLink>
              <NavLink className="nav-item nav-link" to="/maps">
            Rental Location
          </NavLink>
          <NavLink className="nav-item nav-link" to="/Me">
           <h6> Welcome! {user.name}</h6>
          </NavLink>
          {/* <NavLink className="nav-item nav-link" to="/soon">
           Coming Soon
         </NavLink> */}
          <NavLink className="nav-item nav-link" to="/logout">
            Logout
          </NavLink>
          </React.Fragment>
          }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
