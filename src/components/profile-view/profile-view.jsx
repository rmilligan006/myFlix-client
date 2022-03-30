import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

import { UserData } from './user-data';
import { UpdateUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';

export function ProfileView(props) {
    //constant that will hold the userdata loaded from the server
    const [userdata, setUserdata] = useState({});
    //constant that will hold the data the user updates through forms
    const [updatedUser, setUpdatedUser] = useState({});
    //constant to hold the favorite movies list
    const [favoriteMovieList, setFavoriteMovieList] = useState({});

    //this will set the default Authorization from axios
    let token = localStorage.getItem('token');
    axios.defaults.headers.commmon['Authorization'] = `Bearer ${token}`

    //Create a function to get the user data from the server, and assign to userdata variable
    const getUserData = (cancelToken, username) => {
        axios.get(`https://rmilligansmovieapp.herokuapp.com/users/${username}`, {
            cancelToken: cancelToken
        })
            .then(response => {
                //This will assign the result to the user Data
                setUserdata(response.data);
                //This will set the favorite movie list with values such as FavoriteMovies in userdata
                setFavoriteMovieList(props.movies.filter(m => response.data.FavoriteMovies.includes(m._id)));
            })
            .catch(err => {
                console.log(err);
            });
    }
    //Getting the user data with the useEffect hook
    /* Get the user data in useEffect hook */
    useEffect(() => {
        let source = axios.CancelToken.source();

        // Load user data
        if (token !== null) {
            getUserData(source.token, props.user);
        } else {
            console.log('Not authorized');
        }

        // Cleanup effect
        return () => {
            source.cancel();
        }
    }, []);

    //Update user data through the Api
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page

        // Sending request to server, if successful, update userdata
        axios.put(`https://femmovies.herokuapp.com/users/${userdata.Username}`,
            updatedUser
        )
            .then(response => {
                // Update userdata with the new userdata from the server
                setUserdata(response.data);
                alert('Profile successfully updated');
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleUpdate = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
    }

    const deleteProfile = (e) => {
        axios.delete(`https://femmovies.herokuapp.com/users/${userdata.Username}`)
            .then(response => {
                alert('Your profile was deleted!');
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                window.open('/', '_self');
            })
            .catch(e => {
                console.log(e);
            });
    }

    const removeFav = (id) => {
        axios.delete(`https://femmovies.herokuapp.com/users/${userdata.Username}/movies/${id}`)
            .then(() => {
                // Change state of favoriteMovieList to rerender component
                setFavoriteMovieList(favoriteMovieList.filter(movie => movie._id != id));
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            {/*displays the user data*/}
            <UserData userdata={userdata} />

            {/*A Form to update the user data*/}
            <UpdateUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

            {/*A button to delete the user*/}
            <div>
                <Button className="mb-3" variant="danger" type="submit" onClick={deleteProfile}>
                    Delete Profile
                </Button>
            </div>

            {/*A list of Favorite Movies */}
            <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} />

            <div>
                <Button variant="outline-light" onClick={() => { props.onBackClick() }}>Back to Full List</Button>
            </div>
        </>
    )

}
