import React, { Component } from "react";
import Tour from "./tourUsers";
class Me extends Component {
  render() {
    const { user } = this.props;

    return (<React.Fragment>
      <br/>
      <Tour/>
       <section className="banner-main tour-user">
        <div>

  { user &&  <p>Heyy <strong>{user.name}!</strong></p>} 
    <p>This is your user profile.It contains information about you and your status</p>
    
    </div>
    <div className="list-group">
  <button  className="list-group-item list-group-item-action disabled">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Email</h5>
     
    </div>
    <p className="mb-1">{user && user.email}</p>
    
  </button>
  <button  className="list-group-item list-group-item-action disabled">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Name</h5>
    </div>
    <p className="mb-1">{user && user.name}</p>
  </button>
  <button  className="list-group-item list-group-item-action disabled">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Status</h5>
    </div>
    <p className="mb-1">Sorry! Not yet a premium customer. Continue Renting and we will upgrade you to be button premium member</p>
  </button>
</div>
</section>
    </React.Fragment>)
  }
}

export default Me;
