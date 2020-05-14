import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    return (
      <React.Fragment>
           <section className="banner-main">
         { <Link
            to="/customers/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Add Customer
          </Link> }
    {customers.map(c => (
      <Link to={`/customers/${c._id}`} className="list-group-item list-group-item-action" key={c._id}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{c.name}</h5>
        </div>
        <p className="mb-1">Phone No:{c.phone}</p>
        <p className="mb-1">Customer ID:   <strong>{c._id}</strong></p>
  
      </Link>
    ))}
    </section>
    </React.Fragment>
    );
  }
}

export default Customers;
