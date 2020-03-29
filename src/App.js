import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import RentalForm from "./components/rentalForm";
import CustomerForm from "./components/customersForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import MustSee from "./components/mustsee"
import Me from "./components/me";
import Soon from './components/soon';
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import  auth  from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
   const user = auth.getCurrentUser();
   this.setState({ user});
   
  toast("API mounted successfully");
   if (auth.getCurrentUser()){
      toast.success("Succesfull Login")
    }
  }
  render() {
   

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path = "/mustsee" component={MustSee}/>
            <Route path = "/soon" component={Soon}/>
            <ProtectedRoute path="/movies/:id" component = {MovieForm} />
            <ProtectedRoute path="/customers/:id" component = {CustomerForm} />
            <ProtectedRoute path="/rentals/:id" component = {RentalForm} />
            <ProtectedRoute path="/customers" component={Customers} />
            <ProtectedRoute path="/rentals" component={Rentals} />
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />}  />
            <Route path="/me" render={props => <Me {...props} user={this.state.user} />} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      
      </React.Fragment>
    );
  }
}

export default App;
