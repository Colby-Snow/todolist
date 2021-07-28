import React, {useState} from 'react';
import {useHistory} from "react-router";

const UserContext = React.createContext({})

const validUsers = [
  {
    id: 0,
    name: 'Sampada',
    state: 'IA'
  },
  {
    id: 1,
    name: 'Adis',
    state: 'IA',
  },
  {
    id: 2,
    name: 'Colby',
    state: 'IA',
  },
  {
    id: 3,
    name: 'Luke',
    state: 'IA',
  }
]

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null)

  const history = useHistory();
  const login = (username) => {
    const user = validUsers.find(u => u.name === username)
    if (user) {
      setLoggedInUser(user)
      history.push(`/todolist/${user.id}`)
    }
  }

  const logout = () => {
    setLoggedInUser(null)
    history.push(`/`)
  }

  const value = {
    actions: {
      login: login,
      logout: logout
    },
    user: loggedInUser
  }

  return (<UserContext.Provider value={value}>
    {props.children}
  </UserContext.Provider>)
}


export const UserConsumer = UserContext.Consumer
export default UserContext