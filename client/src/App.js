import React from "react";
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const App = ()=>{
    return (
        <>
        <Router>
            <Switch>
                <Route path="/profile/:username">
                    <Profile /> 
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register /> 
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
        </>
    )
}
export default App;