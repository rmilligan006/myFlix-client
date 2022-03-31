import React, { useState } from "react";
import axios from 'axios';
import propTypes from 'prop-types';
//registration stylesheet
import "./registration-view.scss";
import { Form, Button } from 'react-bootstrap'

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //Declaring a Hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!Username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least two characters long');
      isReq = false;
    }
    if (!Password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }
    if (!Email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmail('Email must be valid');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //send a request to the server for authentication
      axios.post('https://rmilligansmovieapp.herokuapp.com/register', {
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
        .catch(e => {
          console.log('Could not Register');
          alert('Unable to register');
        });
    }
  };

  return (
    <>
      <h1>Registration</h1>
      <Form className="mb-3">
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username*:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          {usernameErr && <p className="font-italic">{usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password*:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          {passwordErr && <p className="font-italic">{passwordErr}</p>}
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email:*</Form.Label>
          <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
          {emailErr && <p className="font-italic">{emailErr}</p>}
        </Form.Group>

        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handlesubmit}>
          Register
        </Button>
      </Form>
      <p>
        Already have an account?{' '}
        <link to={'/'}>
          <Button variant="link">Login!</Button>
        </link>
      </p>
    </>
  );
}



