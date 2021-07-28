import React, {useContext, useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import './Heading.css';
import UserContext from './UserContext'
import {useHistory} from "react-router";

function HeadingElement(props) {
    const context = useContext(UserContext)

    const [entryButton, setEntryButton] = useState()
    const [entryButtonText, setEntryButtonText] = useState();
    const history = useHistory();

    const handleSignOut = function (e){
        context.actions.logout();
        console.log("signout")
    }

    const handleSignIn = function (e){
        history.push(`/`)
    }

    //
    // useEffect(() => {
    //     if(context.user == null){
    //         setEntryButton(handleSignIn)
    //         setEntryButtonText("Sign In")
    //     }
    //     else{
    //         setEntryButton(handleSignOut)
    //         setEntryButtonText("Sign out")
    //     }
    // }, [context.user])

    return (
        <div className='login-container'>
            <Button variant='contained' color="primary" onClick={entryButton}>{entryButtonText}</Button>
        </div>
    );
}

export default HeadingElement;