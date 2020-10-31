import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { getCustomers } from "../services/customerService";
import Tour from "../components/tourCustomers";
class Customers extends Component {
  state = {
    customers: [],
    searchQuery: ""
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
    console.log(customers);
  }
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  getPagedData = () => {
    const {
      searchQuery,
      customers: allCustomers
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter(r =>
        r.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    
    return { totalCount: filtered.length, data: filtered };
  };
  
  render() {
    const { searchQuery} = this.state;
    const { data:filtered } = this.getPagedData();
    return (
      <React.Fragment>
        <br/>
             <Tour/>

           <section className="banner-main">
         { <Link
            to="/customers/new"
            className="btn btn-primary tour-customer"
            style={{ marginBottom: 20 }}
          >
            Add Customer
          </Link> }
          <SearchBox value={searchQuery} tour='tour-customersearch' onChange={this.handleSearch} />
    {filtered.map(c => (
      <Link to={`/customers/${c._id}`} className="list-group-item list-group-item-action tour-customerbaredit" key={c._id}>
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
