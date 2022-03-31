import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import './genre-view.scss';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'react-bootstrap';


export function GenreView(props) {
    return (
        <>
            <div>
                <Button variant="outline-light" onClick={() => { props.onBackClick() }}>Back</Button>
            </div>
            <div>
                <h1 className="display-4">{props.genre.Name}</h1>
            </div>
            <div>
                <span className="value">{props.genre.Description}</span>
            </div>
            <div>
                <span className="value">{props.genre.Description}</span>
            </div>

            <div>
                <h3>Some movies in this Genre:</h3>
            </div>

            <Row className="justify-content-md-center">
                {props.movies.filter(m => m.Genre.Name === props.genre.Name).map(m => {
                    <Col xs={12} sm={6} md={4} className="d-flex" key={m._id}>
                        <MovieCard movie={m} />
                    </Col>
                })}

            </Row>
        </>
    )
}