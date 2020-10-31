import React, { Component } from "react";
import SearchBox from "./searchBox";
import _ from "lodash";
import MustseeTable from "./mustseeTable"
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/movieService";
import Tour from "./tourMustSee";
class MustSee extends Component {
  state = {
    movies: [],
    searchQuery: "",
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path:"title", order: "asc" }
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  
  getPagedData = () => {
    const {
      searchQuery,
      sortColumn,
      pageSize,
      currentPage,
      movies: allmovies
    } = this.state;

    let filtered = allmovies;
    console.log(filtered);//all the aavailable movies
      const best = filtered.filter(m => m.dailyRentalRate >= 13);
console.log(best);//the ones that are the favourites


const sorted = _.orderBy(best, [sortColumn.path], [sortColumn.order]);
console.log(sorted);//sorting our favourite best


let popular = paginate(sorted, currentPage, pageSize)//paginate our popular ones rename them to popular
console.log(popular);


if (searchQuery)
  popular = popular.filter(p =>
    p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  

    
    return { totalCount: sorted.length, data: popular };
  };
  // getPopMovies = () => {
  //   const popular = this.state.movies.filter(m => m.dailyRentalRate >= 5);
  //   return { liked: popular };
  // };

  
  render() {
    const {totalCount ,  data: popular } = this.getPagedData();
    console.log(totalCount);
    const { searchQuery, pageSize, currentPage,sortColumn} = this.state;
    
    return (
      <React.Fragment>
        <br/>
        <Tour/>
        <section className="banner-main tour-mustsee">
          <h5>
            Our System detect that the following are the most watched shows.
            Visit your nearest rental shop and grab a copy
          </h5>
          <SearchBox value={searchQuery} tour='tour-mustseeSearch' onChange={this.handleSearch} />
          <MustseeTable
            popular={popular}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            tourProducer='tour-mustseeProducer'
            tourYear='tour-mustseeYear'
            tourActor='tour-mustseeStarActor'
            tourDescription='tour-mustseeDescription'
          />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        </section>
      </React.Fragment>
    );
  }
}

export default MustSee;
