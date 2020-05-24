import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import Table from "./common/table";
class MustseeTable extends Component {
    columns = [
        {
          path: "title",
          label: "Title",
        //   content: rental => <Link to={`/rentals/${rental._id}`}>{rental.customer.name}</Link>
        },
        { path: "producer", label: "Producer" },
        { path: "year", label: "Year" },
        { path: "dailyRentalRate", label: "Rate" },
        {path:"starActor", label:"Star Actor"},
        {path:"numberInStock", label:"Stock"},
      ];
    state = {  }
    render() { 
        const { popular, onSort, sortColumn } = this.props;
        return ( 
            <Table
        columns={this.columns}
        data={popular}
        sortColumn={sortColumn}
        onSort={onSort}
      />
         );
    }
}
 
export default MustseeTable;