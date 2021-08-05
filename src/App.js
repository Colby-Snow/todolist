import './App.css';
import TodoList from "./components/TodoList";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import {UserProvider} from "./components/UserContext";

function App() {
  return (

      <BrowserRouter>
        <UserProvider>
          <Switch>
                <div>
                  <div className="App-header">
                      <Route path="/todolist" exact>
                        <TodoList/>
                      </Route>
                      <Route path="/create-account">
                          <CreateAccount/>
                      </Route>
                      <Route path="/" exact>
                          <Login/>
                      </Route>
                  </div>
                </div>
          </Switch>
        </UserProvider>
      </BrowserRouter>

  );
}

export default App;
