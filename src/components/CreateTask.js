import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";

const CreateTask = (props) => {
    const [desc, setDesc] = useState('');

    function handleDescChange(e){
        setDesc(e.target.value)
    }

    function addHandler(e) {
        props.addTask({
            desc: desc,
            status: false,
            key: props.arrLength + 1
        })
        setDesc('')
    }

    return (
        <div>
            <TextField id="outlined-basic" label="New Task" value={desc} onChange={handleDescChange}/>
            <Button variant="contained" color="primary" onClick={addHandler}>Add Task</Button>
        </div>
    );
};

export default CreateTask;