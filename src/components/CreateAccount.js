import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function CreateAccount(props) {

        const [formState, setFormState] = useState({
      username: '',
      password: '',
      password2: ''
    })

    const [errors, setErrors] = useState({})

    const history = useHistory()

    const extractError = key => {
      if (errors[key]) {
        return errors[key].join(' ')
      }
      return ''
    }

    const handleCreate = () => {
      axios.post('http://localhost:5000/api/users/', formState)
        .then(() => {
          history.push('/')
        }).catch((e) => {
            console.log(e)
          setErrors(e.response.data)
      })
    }

    const setFormField = field => e => {
      setFormState({...formState, [field]: e.target.value})
    }


    return (
        <div>
            <h1>Welcome to Todo App</h1>
            <div>
                <TextField label="Username" value={formState.username} onChange={setFormField('username')}></TextField>
                <span style={{color: 'red'}}>{extractError('username')}</span>
            </div>
            <div>
                <TextField label="Password" type="password" value={formState.password} onChange={setFormField('password')}></TextField>
                <span style={{color: 'red'}}>{extractError('password')}</span>
            </div>
            <div>
                <TextField label="Re-Enter Password" type="password" value={formState.password2} onChange={setFormField('password2')}></TextField>
                <span style={{color: 'red'}}>{extractError('password2')}</span>
            </div>
            <div>
                <Button color="primary" variant="contained" onClick={handleCreate}>Submit</Button>
            </div>
            <Link to="/">Have an account? Click here to login!</Link>
        </div>
    );
}

export default CreateAccount;