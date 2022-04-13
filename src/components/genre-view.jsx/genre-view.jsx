import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import "./genre-view.scss";
import { Link } from "react-router-dom";
import { Container, Col, Card, Button, Row } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, movie } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Body id="genre-view-body">
            <Card.Title id="genre-view-body-name">Genre</Card.Title>
            <Card.Text id="genre-view-body">
              <span id="genre-view-body">Name:</span>
              <span id="genre-view-body">{genre.Name}</span>
            </Card.Text>
            <Card.Text id="genre-view-body">
              <span id="genre-view-body">Description:</span>
              <span id="genre-view-body">{genre.Description}</span>
            </Card.Text>

            <Button
              id="genre-view-button"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
