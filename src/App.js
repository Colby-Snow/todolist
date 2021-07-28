import './App.css';
import TodoList from "./components/TodoList";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import {UserProvider} from "./components/UserContext";
import HeadingElement from "./components/HeadingElement";

function App() {
  return (

      <BrowserRouter>
        <UserProvider>
          <Switch>
                <div>
                  <header className="App-header">
                      <Route path="/todolist/:user_id" exact>
                        <TodoList/>
                      </Route>
                      <Route path="/create-account">
                          <CreateAccount/>
                      </Route>
                      <Route path="/" exact>
                          <Login/>
                      </Route>
                  </header>
                </div>
          </Switch>
        </UserProvider>
      </BrowserRouter>

  );
}

export default App;
