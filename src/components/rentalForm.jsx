import React  from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getRental, saveRental } from "../services/rentalService";
class RentalForm extends Form {
  state = {
    data: {
      customerId: "",
      movieId: ""
    },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    customerId: Joi.string()
      .required()
      .label("Customer identity"),
    movieId: Joi.string()
      .required()
      .label("Movie Reference")
  };
  async populateRental() {
    try {
      const rentalId = this.props.match.params.id;
      if (rentalId === "new") return;
     const { data: rental } = await getRental(rentalId);
      this.setState({ data: this.mapToViewModel(rental) });
     console.log(rental);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateRental();
    
  }
  mapToViewModel(rental) {
    return {
      _id: rental._id,
      customerId: rental.customer._id,
      movieId:rental.movie._id
    };
  }
  doSubmit = async () => {
    await saveRental(this.state.data);
    this.props.history.push("/rentals");
  };

  render() {
    return (
      <div>
        <h1>Rental Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("customerId", "Customer ID")}
          {this.renderInput("movieId", "Movie ID")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RentalForm;
