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
    content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
  }
  // linkButton = {
  //   key:"button",
  //   path: "title",
  //   label: "Title",
  //   content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
  // }
  columns = [
    {
      path: "title",
      label: "Title",
     content: movie => <a>{movie.title}</a>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
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
      className="btn btn-danger btn-sm"
    >
      Delete
    </button>
  )
}

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin){
      this.columns.push(this.linkColumn);
      this.columns.push(this.deleteColumn);
    }else{
     // this.columns.push(this.linkButton);
    }
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
