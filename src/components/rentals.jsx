import React, { Component } from "react";
import SearchBox from "./searchBox";
import _ from "lodash";
import RentalsTable from "./rentalsTable";
import Pagination from "./common/pagination";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import { getRentals } from "../services/rentalService";
class Rentals extends Component {
  state = {
    rentals: [],
    searchQuery: "",
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "dateOut",order: "asc" }
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
  }
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  
  getPagedData = () => {
    const {
      searchQuery,
      sortColumn,
      pageSize,
      currentPage,
      rentals: allRentals
    } = this.state;

    let filtered = allRentals;
    if (searchQuery)
      filtered = allRentals.filter(r =>
        r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);
    const rents = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: rents };
  };

  handlefee(rental) {
    let rentalCharge = rental.rentalFee;
    if (rentalCharge) {
      return rentalCharge;
    } else {
      return <p>Not available</p>;
    }
  }
  render() {
    const { searchQuery, pageSize, currentPage,sortColumn} = this.state;
    const { totalCount, data: rents } = this.getPagedData();
    return (
      <React.Fragment>
        <p>Showing {totalCount} Rental Count(s)</p>
        { <Link
            to="/rentals/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Place Rental
          </Link> }
        <p>
          <strong>NB:</strong>Rental price is calculated as a product of the
          daily rental rate and the days it took to watch the movie plus a
          surcharge of Ksh150 as a service fee
        </p>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
         <RentalsTable
            rents={rents}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Rentals;
