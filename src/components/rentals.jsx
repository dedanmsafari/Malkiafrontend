import React, { Component } from "react";
import { getRentals } from "../services/rentalService";
class Rentals extends Component {
  state = { 
    rentals: []

   }
 
   async componentDidMount() {
    const {data:rentals} = await getRentals();
    this.setState({rentals});
    
  }
  
  handlefee(rental){
     
    let rentalCharge = rental.rentalFee;
    if(rentalCharge){
      return rentalCharge;
    }else{
      return <p>Not available</p>
    }
   
    
  }
  render() { 
    const  {rentals} = this.state;
    
    return (
      <React.Fragment>
      <p><strong>NB:</strong>Rental price is calculated as a product of the daily rental rate and the days it took to watch the movie plus a surcharge of Ksh50 as a service fee</p>
      <div className="list-group">
      {rentals.map(rental =>(

        <button className="list-group-item list-group-item-action" key={rental._id}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{rental.customer.name}</h5>
            <small> <strong>Date Rented:</strong> {rental.dateOut}</small>
          </div>
          <p className="mb-1">Phone No: {rental.customer.phone}</p>
          <p className="mb-1">Movie title:{rental.movie.title}</p>
          <p className="mb-1">dailyRentalRate:{rental.movie.dailyRentalRate}</p>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              Rental fee:{this.handlefee(rental)}</h5>
            <small> <strong>Date Returned:</strong> {rental.dateReturned}</small>
          </div>
        </button>

))}
</div>
</React.Fragment>
    );
  }
}
 
export default Rentals;