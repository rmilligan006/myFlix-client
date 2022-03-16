import React, { useState } from 'react';
    //registration stylesheet
    import './registration-view.scss'
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

export function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
     e.preventDefault();
        console.log(username, password, email, birthday);
    //Send a request to the server for authentication
    //Then call props.onRegistration(username);
        props.onRegistration(username);
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
                                   onChange={e => setUsername(e.target.value)}
                                   required
                                   placeholder="Enter a Username"
                                   />
                               </Form.Group>

                               <Form.Group>
                                   <Form.Label>Password</Form.Label>
                                   <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="Please enter a password!"
                                    />
                               </Form.Group>

                               <Form.Group>
                                   <Form.Label>Email</Form.Label>
                                   <Form.Control
                                   type="email"
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
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

                               <Button variant="primary"
                               type="submit"
                               onClick={handleSubmit}>
                                   Register
                               </Button>
                           </Form>
                       </Card.Body>
                   </Card>
               </CardGroup>
               </Col>
           </Row>
       </Container>
    )
 }
 RegisterView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func.isRequired
}; 

export default RegistrationView;