import React from "react";
import { Link } from "react-router-dom";

const RentalReportsComponent = ({rentalsReports}) => {

    const assignColorToTicketStatus = rentalsReport => {
        if ( rentalsReport.dateReturned) {
          return "p-3 mb-2 bg-success text-white";
        } else if ( !rentalsReport.dateReturned) {
          return "p-3 mb-2 bg-warning text-white";
      };
    }
    return ( 
        <div className="container">
      {rentalsReports.length === 0 ? (
        "You currently have no Rentals Placed"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Rate</th>
              <th scope="col">RentalFee</th>
              <th scope="col">Date Returned</th>
            </tr>
          </thead>
          <tbody>
            {rentalsReports.map(r => (
              <tr key={r._id}>
                <td>{r.customer.name}</td>
                <td>{r.movie.title}</td>
                <td>{r.movie.dailyRentalRate}</td>
                <td>{r.rentalFee}</td>
                <td className={assignColorToTicketStatus(r)}>
                 { new Date(r.dateReturned).toLocaleDateString()}
                </td>
                {/* <td>
                  <Link to={`/ticket/${ticket.id}`}>See comments</Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
     );
}
 
export default RentalReportsComponent;