import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import auth from "../services/authService";
class MoviesTable extends Component {
  linkColumn = {
    key:"link",
    path: "title",
    label: "Edit Movie",
    content: movie => <Link className={`badge badge-info ${this.props.tourEdit}`}  to={`/movies/${movie._id}`}>{movie.title}</Link>
  }

  columns = [
    {
      key:"link",
      path: "title",
      label: "Title",
     content: movie => <strong className="badge badge-success" >{movie.title}</strong>
    // content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre", content: movie => <i>{movie.genre.name}</i>},
    { path: "numberInStock", label: "Stock",  content: movie => <strong className={`badge badge-success ${this.props.tourStock}`} >{movie.numberInStock}</strong>},
    { path: "dailyRentalRate", label: "Rate", content: movie => <strong className={`badge badge-success ${this.props.tourRate}`} >{movie.dailyRentalRate}</strong> },
    {
      key: "like",
      path:"likes",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];
deleteColumn = {
  key: "delete",
  content: movie => (
    <button
      onClick={() => this.props.onDelete(movie)}
      className="btn btn-danger btn-sm tour-deletemovie"
    >
      Delete
    </button>
  )
}

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if (user && user.isAdmin){
      this.columns.push(this.linkColumn);
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    const { movies, onSort, sortColumn,tour,tourStock} = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        tour={tour}
      />
    );
  }
}

export default MoviesTable;
