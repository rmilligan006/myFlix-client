import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../navbar-view/navbar-view";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
//stylesheet for main-view
import "./main-view.scss";
import { Redirect } from "react-router-dom";

export class Mainview extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      //Sets SelectedMovie to null in the beginning, will be used to open the MovieView component
      selectedMovie: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }
  /* When the selected movie is clicked, this function is started and updates the state of the 'SelectedMovie' property */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  //When a user successfully logs in, this function updates the 'user' property in state of the particular user.
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://rmilligansmovieapp.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Navbar user={user} />
        <Route
          path="/movies/:movieID"
          render={({ match }) => {
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map((m) => (
              <Col md={10} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
          }}
        />
        <Route
          path="/register"
          render={() => {
            if (user) return <Redirect to="/" />;
            return (
              <Col>
                <RegistrationView />
              </Col>
            );
          }}
        />

        <Route
          exact
          path="/movies/:movieId"
          render={({ match, history }) => {
            if (!user)
              return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._Id === match.params.MovieId)}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/genres/:name"
          render={({ match }) => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/directors/:name"
          render={({ match, history }) => {
            if (!user)
              return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          path="/users/:username"
          render={({ history, match }) => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={4}>
                <ProfileView
                  history={history}
                  movies={movies}
                  user={user === match.params.username}
                />
              </Col>
            );
          }}
        />
      </Router>
    );
  }
}

export default Mainview;