import React from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUser, updateUser } from "../../actions/actions";

import "./profile-view.scss";

class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser(null);
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }
  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://rmilligansmovieapp.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //Allows the user to edit their profile
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://rmilligansmovieapp.herokuapp.com/users/${Username}`,
        this.state,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.props.setUser({
          ...response.data,
          Birthday: formattedDate,
        });

        localStorage.setItem("user", response.data.Username);
        alert("Profile updated successfully!");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Deletes a Movie from Favorite Movies List
  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const Username = localStorage.getItem("user");
    axios
      .delete(
        `https://rmilligansmovieapp.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        let formattedDate = null;
        let anyBirthday = response.data.Birthday;
        if (anyBirthday) {
          formattedDate = anyBirthday.slice(0, 10);
        }
        alert("Movie removed");
        this.props.setUser({
          ...response.data,
          Birthday: formattedDate,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Deregister the user
  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://rmilligansmovieapp.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.props.setUser(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }
  render() {
    const { onBackClick, movies, user } = this.props;

    if (!user.Username) {
      return null;
    }

    return (
      <Container align="center">
        {console.log(this.props)}
        <Row>
          <Col>
            <Card id="profile-view">
              <Card.Body id="profile-view">
                <Card.Title id="profile-view">Profile</Card.Title>
                <Form id="profile-view" onSubmit={(e) => this.updateUser(e)}>
                  <Form.Group id="profile-view">
                    <Form.Label id="profile-view">Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={this.state.Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group id="profile-view">
                    <Form.Label id="profile-view">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={this.state.Password}
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group id="profile-view">
                    <Form.Label id="profile-view">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={this.state.Email}
                      onChange={(e) => this.Email(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group id="profile-view">
                    <Form.Label id="profile-view">Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      value={this.state.Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div id="profile-view">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={this.editUser}
                    >
                      Update User
                    </Button>
                    <Button
                      className="ml-3"
                      variant="secondary"
                      onClick={() => this.onDeleteUser()}
                    >
                      Delete User
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h4>{`${user.Username}'s`} Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Body>
              {user.FavoriteMovies.length === 0 && (
                <div className="text-center">No Favorite Movies</div>
              )}
              <Row md={5} className="favorite-container">
                {user.FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      user.FavoriteMovies.find((fav) => fav === movie._id)
                    ) {
                      return (
                        <Card
                          className="favorite-movie card-content"
                          key={movie._id}
                        >
                          <Card.Img
                            id="fav-poster"
                            variant="top"
                            src={movie.ImagePath}
                          />
                          <Card.Body
                            style={{ backgroundColor: "black" }}
                            id="fav-body"
                          >
                            <Card.Title id="profile-view">
                              {movie.Title}
                            </Card.Title>
                            <Button
                              size="sm"
                              variant="danger"
                              value={movie._id}
                              onClick={(e) => this.onRemoveFavorite(e, movie)}
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return { user: state.user, movies: state.movies };
};

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);
