import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCustomer, saveCustomer } from "../services/customerService";
class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      phone: ""
      // isGold:""
    },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Customer Name"),
    phone: Joi.string()
      .regex(/^\d{4}\d{3}\d{3}$/)
      .required()
      .label("Phone Number")
    // isGold: Joi.boolean().required().label("Previledge")
  };
  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;
      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
      console.log(customer);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateCustomer();
  }
  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
      // isGold:customer.isGold
    };
  }
  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };

  render() {
    return (
      <section className="banner-main ">
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Customer Name")}
          {this.renderInput("phone", "Phone Number", "number")}
          {/* {this.renderInput("isGold", "Previlege level")} */}
          {this.renderButton("Save")}
        </form>
      </div>
      </section>
    );
  }
}

export default CustomerForm;
