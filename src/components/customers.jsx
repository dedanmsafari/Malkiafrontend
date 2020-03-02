import React, { Component } from 'react';
import { getCustomers } from "../services/customerService";
class Customers extends Component {
  state = { 
    customers:[]
   }

   async componentDidMount() {
    const {data:customers} = await getCustomers();
    this.setState({customers});
    console.log(customers);
    
    
  }
  render() { 
    return ( 
      <p>Customers</p>
     );
  }
}
 
export default  Customers;