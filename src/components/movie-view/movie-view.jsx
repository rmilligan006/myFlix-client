import React from "react";
import propTypes from "prop-types";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { link } from "react-router-dom";
import axios from "axios";
//MovieView stylesheet
import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  addFavorite = (e, movie) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://rmilligansmovieapp.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Favorite has been added!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        {movie && (
          <Row>
            <Col>
              <Card id="movie-view">
                <Card.Body>
                  <Card.Img
                    id="movie-view-image"
                    variant="top"
                    src={movie.ImagePath}
                  />
                  <Card.Title id="movie-Title" className="movie-title">
                    {movie.Title}
                  </Card.Title>
                  <Card.Text
                    id="movie-description"
                    className="movie-description"
                  >
                    {movie.Description}
                  </Card.Text>
                  <Card.Text id="movie-director" className="movie-director">
                    Director: {movie.Director.Name}
                  </Card.Text>
                  <Card.Text id="movie-genre" className="movie-genre">
                    Genre: {movie.Genre.Name}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Button
                id="return-button"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
              <Button
                id="movie-view-button"
                onClick={(e) => {
                  this.addFavorite(e, movie);
                }}
              >
                Add to Favorites
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}