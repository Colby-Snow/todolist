import React, {useContext, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom"
import {useHistory} from 'react-router';
import UserContext from './UserContext'

const validUsers = {
    'David' : 0,
    'Sampada': 1,
    'Colby' : 2,
    'Keifer': 3,
    'Luke' : 4,
    'Adis' : 5
}

function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userContext = useContext(UserContext)

    function handleLogin(e){
        // if (Object.keys(validUsers).includes(username)){
            console.log("MADE IT IN lOGIN BUTTON")
            userContext.actions.login(username)
        // }
    }

    return (
        <div>
            <h1>Welcome to Todo App</h1>
            <div>
                <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)}></TextField>
            </div>
            <div>
                <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)}></TextField>
            </div>
            <div>
                <Button color="primary" variant="contained" onClick={handleLogin}>Submit</Button>
            </div>
            <Link to="/create-account">New here? Click me to create an account!</Link>
        </div>
    );
}

export default Login;