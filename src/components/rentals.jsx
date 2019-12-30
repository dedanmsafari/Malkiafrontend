import React, { Component } from "react";
class Rentals extends Component {
  render() {
    const getrent = this.props;
    const { data: rentals } = this;
    console.log(getrent);

    return <h1> Chess Kenya </h1>;
  }
}

export default Rentals;
