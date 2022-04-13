import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";
import "./movies-list.scss";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Row>
        <Col md={10} style={{ margin: "1em" }}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      {filteredMovies.map((m) => (
        <Container>
          <Row className="view-port">
            <Col md={4} style={{ padding: "1em" }} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
