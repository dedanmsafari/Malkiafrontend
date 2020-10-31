import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { ToastContainer, toast } from "react-toastify";
import * as userService from "../services/userService";
import auth from "../services/authService";
import Tour from "./tourRegister";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", confirmpassword:"", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(8)
      .label("Password"),
    confirmpassword: Joi.string()
      .required()
      .min(8)
      .label("ConfirmPassword"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    const {password,confirmpassword} = this.state.data
    if (password !== confirmpassword) {
      toast.error("Passwords do not match")
      toast.error("Passwords do not match")
      return;
    }
    try {
      
     const response = await userService.register(this.state.data);
    auth.loginWithJwt(response.headers['x-auth-token']);
    window.location = '/';
    
    } catch (ex) {
      if(ex.response && ex.response.status === 400){
      const errors = {...this.state.errors};
      errors.username = ex.response.data;
      this.setState({errors})};
    }
  
  };

  render() {
    return (
      
      <React.Fragment>
          <ToastContainer />
          <br/>
          <Tour/>
      <section className="banner-main tour-Register">
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
         {this.renderInput("confirmpassword", "ConfirmPassword", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
      </section>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
