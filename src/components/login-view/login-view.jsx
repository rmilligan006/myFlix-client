import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row, } from "react-bootstrap";

import axios from 'axios';

//stylesheet for login-view
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  // validate user inputs
  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  }


  //Validate user input

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //Sends a request to the server for authentication
      axios.post('https://rmilligansmovieapp.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(error => {
          console.log(error, 'no such user');
        });
    }
  };




  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card style={{ marginTop: 100, marginBottom: 50, width: "30" }}>
              <Card.Body>
                <Card.Title>Please log in!</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter your username"
                    />
                    {/* code added here to display validation error */}
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      required
                      placeholder="Enter your password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}

                    />
                    {/* code added here to display validation error */}
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Button
                    variant="Primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginView;
