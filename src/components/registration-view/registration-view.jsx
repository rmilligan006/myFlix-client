import React, { useState } from "react";
import axios from 'axios';
import  propTypes  from 'prop-types';
//registration stylesheet
import "./registration-view.scss";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //Declaring a Hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [emailErr, setEmailErr ] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if(!Username) {
      setUsernameErr('Username required');
      isReq= false;
    }else if(username.length < 2){
      setUsernameErr('Username must be at least two characters long');
      isReq = false;
    }
    if(!Password){
      setPasswordErr('Password Required');
      isReq = false;
    }else if(password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }
    if(!Email){
      setEmailErr('Email required');
      isReq = false;
    }else if(email.indexOf('@')=== -1){
      setEmail('Email must be valid');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      //send a request to the server for authentication
      axios.post('https://rmilligansmovieapp.herokuapp.com/login',{
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration sussessful, please login.');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to register');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Register to get Access!</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a Username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Please enter a password!"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address!"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="text"
                      value="{birthday"
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Enter your Birthday"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
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
RegisterView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};

export default RegistrationView;
