import React, { Component } from 'react';
import { getMovies } from "../services/movieService";
class MustSee extends Component {

    state = {
        movies:[]

    }
    
    async componentDidMount() {
        const { data: movies } = await getMovies();
        this.setState({ movies });
    
        
      }
      getPopMovies = () => {
      
const popular = this.state.movies.filter( m => m.dailyRentalRate >= 5)
        return  { liked:popular }
          
      }
    render() { 
        const {liked:popular} = this.getPopMovies();
        console.log(popular);
        
            return ( 
                <React.Fragment>
                    <h5>Our System detect that the following are the most watched shows.
                     Visit your nearest rental shop and grab a copy</h5>
                   { popular.map(p => (
                        <button className="list-group-item list-group-item-action" key={p._id}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{p.title}</h5>
                        </div>
                        <p className="mb-1">numberinStock:{p.numberInStock}</p>
                        <p>description:{p.description}</p>
                        <small>RentalRate:{p.dailyRentalRate}</small>
                      </button>
                ))};

                </React.Fragment>
            )
    }     
}
 
export default MustSee;