import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import './genre-view.scss';
import { Link } from 'react-router-dom';
import { Container, Col, Card, Button, Row } from 'react-bootstrap';


export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick, movie } = this.props;


        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>Genre</Card.Title>
                        <Card.Text>
                            <span className="label">Name:</span>
                            <span className="value">{genre.Name}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="label">Description:</span>
                            <span className="value">{genre.Description}</span>
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