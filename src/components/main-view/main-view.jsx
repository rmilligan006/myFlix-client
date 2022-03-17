import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar-view';

import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
//stylesheet for main-view
import "./main-view.scss"


export class Mainview extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      //Sets SelectedMovie to null in the beginning, will be used to open the MovieView component
      selectedMovie: null
    };
  }
  
  componentDidMount(){
    axios.get('https://rmilligansmovieapp.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
    /* When the selected movie is clicked, this function is started and updates the state of the 'SelectedMovie' property */
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    //When a user successfully registers
    onRegistration(register) {
      this.state({
        register,
      });
    }

    //When a user successfully logs in, this function updates the 'user' property in state of the particular user.
    onLoggedIn(user) {
      this.setState({
        user
      });
    }
  
    render() {
      const { movies, selectedMovie, user } = this.state;

      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
      
      //Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
     
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
        </Row>
      
      );
  }

}


export default Mainview
