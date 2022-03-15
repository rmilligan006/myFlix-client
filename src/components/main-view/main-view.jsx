import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class Mainview extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'The Departed', Description: 'desc1...', ImagePath: '...'},
        { _id: 2, Title: 'Blues Brothers', Description: 'desc2...', ImagePath: '...'},
        { _id: 3, Title: 'RoBocop', Description: 'desc3...', ImagePath: '...'}
      ],
      //Sets SelectedMovie to null in the beginning, will be used to open the MovieView component
      selectedMovie: null
    };
  }
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }
  
     render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }

}


export default Mainview
