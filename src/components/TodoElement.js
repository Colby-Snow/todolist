import React from 'react';
import './TodoElement.css';
import {
    Checkbox,
    FormControlLabel,
    IconButton,
} from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';

const TodoElement = (props) => {

    //Handlers that call methods from Todo.js where values are changed.
    function handleDeletion(e) {
        props.removeTask(props.tasksIndex);
    }

    function handleStatus(e){
        props.reverseStatus(props.tasksIndex)
    }

    //JSX where we build our Checkbox and Deletion elements
    return (
        <div>
            <FormControlLabel
                control={<Checkbox checked={props.task.status} onClick={handleStatus}/>}
                label={props.task.desc}
                className="checkBoxLabel"
            />
            <IconButton aria-label='delete' display="inline" onClick={handleDeletion} className="delete-icon">
                    <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default TodoElement;