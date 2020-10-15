import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
// import auth from "../services/authService";
//<p>Created at:&nbsp;{new Date(todo.createdAt).toLocaleDateString()}</p>
class RentalsTable extends Component {
  columns = [
    {
      path: "customer.name",
      label: "Name",
      content: (rental) => (
        <Link className="badge badge-success"  to={`/rentals/${rental._id}`}>{rental.customer.name}</Link>
      ),
    },
    { path: "movie.title", label: "Title" },
    { path: "movie.dailyRentalRate", label: "Rate" },
    {
      path: "dateOut",
      label: "DateOut",
      content: (rental) => new Date(rental.dateOut).toLocaleDateString(),
    },
    {
      path: "dateReturned",
      label: "DateReturned",
      content: (rental) => new Date(rental.dateReturned).toLocaleDateString(),
    },
    { path: "rentalFee", label: "RentalFee (Ksh)" },
  ];

  // deleteColumn = {
  //   key: "delete",
  //   content: rental => (
  //     <button
  //       onClick={() => this.props.onDelete(rental)}
  //       className="btn btn-danger btn-sm"
  //     >
  //       Delete
  //     </button>
  //   )
  // }

  //   constructor() {
  //     super();
  //     const user = auth.getCurrentUser();
  //     if (user && user.isAdmin)
  //       this.columns.push(this.deleteColumn);

  //   }
  render() {
    const { rents, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={rents}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RentalsTable;
