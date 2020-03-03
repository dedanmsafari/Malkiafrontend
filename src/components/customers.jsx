import React, { Component } from "react";
import { getCustomers } from "../services/customerService";
class Customers extends Component {
  state = {
    customers: []
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
    console.log(customers);
  }
  render() {
    const { customers } = this.state;
    return customers.map(c => (
      
      <button className="list-group-item list-group-item-action" key={c._id}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{c.name}</h5>
        </div>
        <p className="mb-1">Phone No:{c.phone}</p>
        <small>Status:{c.isGold}</small>
      </button>
    ));
  }
}

export default Customers;
