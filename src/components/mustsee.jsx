import React, { Component } from "react";
import { getMovies } from "../services/movieService";
class MustSee extends Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }
  getPopMovies = () => {
    const popular = this.state.movies.filter(m => m.dailyRentalRate >= 5);
    return { liked: popular };
  };
  render() {
    const { liked: popular } = this.getPopMovies();
    console.log(popular);

    return (
      <React.Fragment>
        <section className="banner-main">
          <h5>
            Our System detect that the following are the most watched shows.
            Visit your nearest rental shop and grab a copy
          </h5>
          {popular.map(p => (
            <a className="list-group-item list-group-item-action" key={p._id}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{p.title}</h5>
              </div>
              <p className="mb-1">Description:{p.description}</p>
              <p className="mb-1">Producer:{p.producer}</p>
              <p className="mb-1">Star Actor:{p.starActor}</p>
              <p className="mb-1"> Year Released:{p.year}</p>
              <p className="mb-1">Number In Stock:{p.numberInStock}</p>
              <small>RentalRate:{p.dailyRentalRate}</small>
            </a>
          ))}
          ;
        </section>
      </React.Fragment>
    );
  }
}

export default MustSee;
