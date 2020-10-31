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
        { path: "producer", label: "Producer", content: rental => <strong className={`badge badge-success ${this.props.tourProducer}`} >{rental.producer}</strong> },
        { path: "year", label: "Year",content: rental => <strong className={`badge badge-info ${this.props.tourYear}`} >{rental.year}</strong> },
        { path: "dailyRentalRate", label: "Rate", },
        {path:"starActor", label:"Star Actor",content: rental => <strong className={`badge badge-info ${this.props.tourActor}`} >{rental.starActor}</strong>  },
        {path:"numberInStock", label:"Stock"},
        {path:"description", label:"Description",content: rental => <strong className={`badge badge-basic ${this.props.tourDescription}`} >{rental.description}</strong> },
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