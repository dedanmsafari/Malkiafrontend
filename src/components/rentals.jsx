import React, { Component } from "react";
import { getRentals } from "../services/rentalService";
class Rentals extends Component {
  state = { 
    rentals:[]

   }
   
   async componentDidMount() {
    const {data:rentals} = await getRentals();
    this.setState = {rentals:rentals};
    console.log(rentals);
    
  }
  
  render() { 
    return (

      <p>hello</p>
    );
  }
}
 
export default Rentals;