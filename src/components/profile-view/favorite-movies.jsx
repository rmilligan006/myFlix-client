import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { link } from 'react-router-dom'

export function FavoriteMovies({ favoriteMovieList, removeFav }) {
    return (
        <>
            <Row>
                <Col md={3}>
                    <h3>Favourite movies</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {favoriteMovieList.map(movie => {
                    return (
                        <Col md={3} sm={5} xs={5} className="d-flex" key={movie._id}>
                            <Card text="dark" border="dark" className="mb-3">
                                <Card.img variant="top" src={movie.ImagePath} className="Img-responsive" />
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>\
                                    <Button variant="outline-danger" onClick={() => removeFav(movie._id)}>Remove From Favorites</Button>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button variant="link">More Info</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}