import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './profile-view.scss'
import { link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import reactDom from 'react-dom';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: Null,
            Password: Null,
            Email: Null,
            Birthday: Null,
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getItem(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
        });
        window.open('/', '_self');
    }

    getUser = (token) => {
        const Username = localStorage.getItem('user');
        axios
            .get(`https://rmilligansmovieapp.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Allowing the users to edit or update their profile
    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios
            .put(
                `https://rmilligansmovieapp.herokuapp.com/${Username}`,
                {
                    Username: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    Birthday: this.state.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });

                localStorage.setItem('user', this.state.Username);
                alert("Profile updated");
                window.open('/profile', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Deleting a movie from their favorite movies list
    onRemoveFavorite = (e, movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios
            .delete(
                `https://rmilligansmovieapp.herokuapp.com/${Username}/movies/${movie._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response);
                alert("Movie removed");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    };






}