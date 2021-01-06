import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import Base from './components/layouts/Base';
import User from "./components/User";
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/actions/session';

function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(setLoaded(true))
      .catch(error => console.error(error))
    setAuthenticated(false)
  }, [dispatch]);

  return loaded && (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <Route path="/" exact={true} component={Base} />
    </BrowserRouter>
  );
}

export default App;
