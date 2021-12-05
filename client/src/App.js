import React ,{useContext} from "react";
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Chat from "./pages/chat/ChatQna"
import Courses from "./pages/courses/Courses"
import Events from "./pages/event/Event"
import FriendProfile from "./pages/friendProfile/friendProfile"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  import {AuthContext} from "./context/AuthContext"
import {axios} from 'axios'
const App = ()=>{
    const { user } = useContext(AuthContext);
    const [isLoggedIn,setIsLoggedIn] = React.useState(false)
    const User = sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
    // console.log(user,isLoggedIn)
    return (
        <>
        <Router>
            <Switch>
                <Route path="/profile/:username">
                    <Profile setIsLoggedIn={setIsLoggedIn}/> 
                </Route>
                <Route path="/login">
                    {User && isLoggedIn? <Redirect to="/" />:<Login setIsLoggedIn={setIsLoggedIn}/>}
                </Route>
                <Route path="/signup">
                    {User && isLoggedIn?<Redirect to="/" />:<Register />} 
                </Route>
                <Route path="/qna">
                    <Chat />
                </Route>
                <Route path="/courses">
                    <Courses />
                </Route>
                <Route path="/event/">
                    <Events />
                </Route>
                <Route path="/friendProfile/:username">
                    <FriendProfile setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route path="/">
                    {/* Only authenticate users will land on home page */}
                    {User || isLoggedIn?<Home setIsLoggedIn={setIsLoggedIn} User={User}/>:<Register />} 
                </Route>
            </Switch>
        </Router>
        </>
    )
}
export default App;