import React from "react";
import TableHeader from "../components/common/tableHeader";
import RentalTableBody from "./rentalTableBody";
const RentalTable = ({ columns, sortColumn, onSort, data }) => {
  const rentalTour='tour-sortorder'
  return (
    <table className="table table-striped ">
      <TableHeader columns={columns} sortColumn={sortColumn} tour={rentalTour} onSort={onSort} />
      <RentalTableBody columns={columns} data={data} />
    </table>
  );
};

export default RentalTable;
