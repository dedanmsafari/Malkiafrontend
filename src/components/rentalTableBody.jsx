import React, { Component } from "react";
import _ from "lodash";

class RentalTableBody extends Component {

 
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const assignColorToTicketStatus = rentalsReport => {
        if ( rentalsReport.dateReturned) {
          return "p-3 mb-2 bg-info text-white  tour-rentalblue";
        } else if ( !rentalsReport.dateReturned) {
          return "p-3 mb-2 bg-danger text-white tour-rentalred";
      };
    }
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td className={assignColorToTicketStatus(item)} key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default RentalTableBody;
