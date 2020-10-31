import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      starActor: "",
      producer: "",
      year: "",
      numberInStock: "",
      dailyRentalRate: "",
      description: "",
      // profileImg: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    starActor: Joi.string()
      .max(10)
      .required()
      .label("starActor"),
    producer: Joi.string()
      .max(10)
      .required()
      .label("producer"),
    year: Joi.number()
      .min(1900)
      .max(2020)
      .required()
      .label("Year"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(50)
      .label("Daily Rental Rate"),
    description: Joi.string()
      .required()
      .min(20)
      .max(100)
      .label("Description"),
    // profileImg: Joi.required().label(" Uploads")
  };

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
     // console.log(movie);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      starActor: movie.starActor,
      producer: movie.producer,
      year: movie.year,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      description: movie.description,
      // profileImg: movie.file.filename
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <section className="banner-main ">
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("starActor", "starActor")}
          {this.renderInput("producer", "Producer")}
          {this.renderInput("year", "Year of Release", "number")}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderText("description", "Description")}
          {/* {this.renderUpload("profileImg", "Image Upload")} */}
          {this.renderButton("Save")}
        </form>
      </div>
      </section>
    );
  }
}

export default MovieForm;
