import React, { Component } from 'react';
import { getMovies } from "../services/movieService";
class MustSee extends Component {

    state = {
        movies:[]
    }
    
    async componentDidMount() {
        const { data: movies } = await getMovies();
        this.setState({ movies });
        console.log(movies);
        
      }
      getPopMovies = () => {
          const {movies} = this.state;
          if (movies.some(movie => movie.dailyRentalRate <= 5))
          this.setState({movies});
          console.log(movies);
          
      }
    render() { 
        const {movies} = this.state;
            return movies.map(m => (
                    <h1>{m.title}</h1>
            ))
    }     
}
 
export default MustSee;