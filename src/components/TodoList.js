import React, {useContext, useEffect, useState} from 'react';
import TodoElement from "./TodoElement";
import {FormControl, FormLabel} from "@material-ui/core";
import CreateTask from "./CreateTask";
import ClearTasks from "./ClearTasks";
import axios from "axios"
import UserContext from "./UserContext";
import {useParams} from "react-router";

const TodoList = () => {

    const initialElements = [{
                    desc: "Loading...",
                    status: false,
                    key: 1
                }];

    //Creates a state for our array of elements that will be displayed
    const [tasks, setTask] = useState(initialElements);
    const context = useContext(UserContext);
    const {user_id} = useParams();

  useEffect(() => {
    if(!localStorage.getItem('session_token')) {
      context.actions.logout()
    }
  }, [])


    useEffect(() => {
        const axios = require('axios');
        axios.get('http://localhost:5000/api/items', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
            }
        })
        .then(function (response){
            const newArray = response.data.map(task => {
                const newTask = {
                    desc: task.title,
                    status: task.completed,
                    key: task.id,
                }
                return newTask;
            })
            setTask(newArray)
        })
        .catch(function (error){
            console.log(error)
            const newArray =[
                {desc: 'Eat Lunch', status: false, key: 1},
                {desc: 'Commute', status: false, key: 2},
                {desc: 'Create Awesome React App', status: false, key: 3},
                {desc: 'Obey New Machine Overlords', status: false, key: 4}
            ]
            setTask(newArray);
    })
    },[])

    //Receives a new todo Object and adds it into our checkbox array
    //Todo Object Requirements:
    //desc: the description of our todolist item
    //status: whether or not our element has been checked off
    function addTask(todoItem){
        axios.post("http://localhost:5000/api/items", todoItem, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
                }
            })
            .then((result) => {
                const newArray = result.data.map(task => {
                    const newTask = {
                        desc: task.title,
                        status: task.completed,
                        key: task.id,
                    }
                    return newTask
                });
                setTask(newArray);
            })

    }

    //Receives an element's index and searches the array for that element then, removes the element from the array.
    function removeTask(todoItemIndex){
         const newTasks = [...tasks];
        const itemId = newTasks[todoItemIndex].key
        axios.delete("http://localhost:5000/api/items/" + itemId, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
                }
            })
            .then((result) => {
                const newArray = result.data.map(task => {
                    const newTask = {
                        desc: task.title,
                        status: task.completed,
                        key: task.id,
                    }
                    return newTask
                });
                setTask(newArray);
            })

    }

    //Receives an element's index and reverses that element's status
    function reverseStatus(todoItemIndex){
        const newTasks = [...tasks];
        const itemId = newTasks[todoItemIndex].key
        axios.put("http://localhost:5000/api/items/" + itemId, null,{
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
                }
            })
            .then((result) => {
                const newArray = result.data.map(task => {
                    const newTask = {
                        desc: task.title,
                        status: task.completed,
                        key: task.id,
                    }
                    return newTask
                });
                setTask(newArray)
            })
    }

    //Removes all items from the checkbox array
    function clearTasks(){
        const newTasks = [];
        setTask(newTasks);
    }

    return (
        <div>
            <FormControl>
                <FormLabel component="legend">Todo List</FormLabel>
                {tasks.map((todoTask, index) => <TodoElement key={Math.random()} task={todoTask} removeTask={removeTask} tasksIndex={index} reverseStatus={reverseStatus}></TodoElement>)}
                <CreateTask addTask={addTask} arrLength={tasks.length}></CreateTask>
                <ClearTasks clearTasks={clearTasks}></ClearTasks>
            </FormControl>
        </div>
    );
};

export default TodoList;