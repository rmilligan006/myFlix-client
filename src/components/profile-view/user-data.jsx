import React from 'react';

export function UserData({ userdata }) {
    return (
        <>
            <h3>{userdata.Username}</h3>
            <p>Email: {userdata.Email}</p>
            <p>Birthday: {userdata.Birthday}</p>
        </>
    )
}