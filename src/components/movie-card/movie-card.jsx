// src/components/movie-card/movie-card.jsx
import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
//stylesheet for movie card
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card id="movie-card-body">
        <Card.Img id="movie-card-top" variant="top" src={movie.ImagePath} />
        <Card.Body id="movie-card-body">
          <Card.Title id="movie-card-body">{movie.Title}</Card.Title>
          <Card.Text id="movie-card-body">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
