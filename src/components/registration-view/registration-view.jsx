import React, { useState } from 'react';
    //login stylesheet
    import './login-view.scss'

export function RegisterView(props) {
    const [username, setUsername] = userState('');
    const [password, setPassword] = userState('');
    const [email, setEmail] = userState('');
    const [birthday, setBirthday] = userState('');


    const handleSubmit = (e) => {
     e.preventDefault();
        console.log(username, password, email, birthday);
    //Send a request to the server for authentication
    //Then call props.onRegistration(username);
        props.onRegistration(username);
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            
            <div class="coc-form">
                <div className="coc-block-row"></div>
            </div>
        </form>
    )
 }
    