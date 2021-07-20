import React from 'react';
import {Button} from "@material-ui/core";

const ClearTasks = (props) => {
    return (
        <div>
            <Button onClick={props.clearTasks} color="secondary" variant="contained">Clear</Button>
        </div>
    );
};

export default ClearTasks;