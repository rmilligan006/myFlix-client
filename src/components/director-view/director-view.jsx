import React from "react";
import axios from "axios";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row } from "react-bootstrap";
import "./director-view.scss";
export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movie } = this.props;

    return (
      <Container fluid>
        <Card id="director-view-body">
          <Card.Body id="director-view-body">
            <Card.Title id="director-view-body-name">Director</Card.Title>
            <Card.Text id="director-view-body">
              <span id="director-view-body">Name:</span>
              <span id="director-view-body">{director.Name}</span>
            </Card.Text>
            <Card.Text id="director-view-body">
              <span id="director-view-body">Bio:</span>
              <span id="director-view-body">{director.Bio}</span>
            </Card.Text>
            <Card.Text id="director-view-body">
              <span id="director-view-body">Birth:</span>
              <span id="director-view-body">{director.Birth}</span>
            </Card.Text>
            <Card.Text id="director-view-body">
              <span id="director-view-body">Death:</span>
              <span id="director-view-body">{director.Death}</span>
            </Card.Text>

            <Button
              id="director-view-button"
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
