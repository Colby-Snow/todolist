import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";

function CreateAccount(props) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleCreate(e){

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
                <Button color="primary" variant="contained" onClick={handleCreate}>Submit</Button>
            </div>
            <Link to="/">Have an account? Click here to login!</Link>
        </div>
    );
}

export default CreateAccount;