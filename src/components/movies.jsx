import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Paginational from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import Tour from '../components/tour';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 10,
    likes:null,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
   
   const { data: movies } = await getMovies();
    this.setState({ movies , genres });
  }
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });

   try {
     await deleteMovie(movie._id);
     
   } catch (ex) {
     if(ex.response && ex.response.status === 404)
     toast.error('This movie has already been deleted.Reload the page');

     this.setState({ movies: originalMovies});
   }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
 const {user} = this.props;
    if (count === 0) return  <Typography variant='h4' color='textSecondary' display = 'block'>There are no movies in the database.</Typography>;
const { totalCount, data: movies } = this.getPagedData();
    return (
      <React.Fragment>
      <section className="banner-main tour-intro">
    
      <div className="row">
        <div className="col-3">
          <Tour/>
          <br/>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
             
        </div>
        <div className="col">
          {user && user.isAdmin ? <Link
            to="/movies/new"
            className="btn btn-primary tour-newmoviebutton"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link> : null }
          <Typography variant='h4' color='textSecondary' display = 'block'>Currently {totalCount} available shows.Check your nearest rental.</Typography>
          <SearchBox  value={searchQuery} tour='tour-searchshows' onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            tour='tour-sortorder'
            tourStock='tour-stock'
            tourRate='tour-rate'
            tourEdit='tour-editmovie'
          />
          <Paginational
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
      <br/>
 
      </section>
      </React.Fragment>

    );
  }
}

export default Movies;
