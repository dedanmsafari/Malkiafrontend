import React,{Component} from 'react';
import { getRentals } from '../services/rentalService';
import generatePDF from "../services/reportGenerator";
import RentalReportsComponent from './rentalReportsComponent';

class RentalsReport extends Component {
    state = {
        rentals: [], 
         sortColumn: { path: "name",order: "asc" }
      }

    async componentDidMount() {
        const { data: rentals } = await getRentals();
        this.setState({ rentals });
        console.log(rentals);
      }
    
    render() { 
        const rentals = this.state.rentals;
        const rentalReports = rentals.filter(rental => rental.dateReturned);

        return ( 
            <div>
            <div className="container mb-4 mt-4 p-3">
              <div className="row">
                  <button
                    className="btn btn-primary"
                    onClick={() => generatePDF(rentalReports)}
                  >
                    Generate monthly report
                  </button>
              </div>
            </div>
            <br/>
          <RentalReportsComponent rentalsReports={rentals} />
          
          </div>
         );
    }
}
 
export default RentalsReport;