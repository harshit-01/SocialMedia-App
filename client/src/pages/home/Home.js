import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css"
import {Col,Row} from "react-bootstrap";
import React,{useState} from "react";
import axios from "axios"
import {useParams} from "react-router-dom"
import {AuthContext} from "./../../context/AuthContext"

const Home = ({setIsLoggedIn})=>{
    const [text,setText] = useState(false);
    const [Users,setUsers] = React.useState({});
    const params = useParams();
    const url = "http://localhost:5000/api";
    const user = React.useContext(AuthContext)
    const uname = sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
    React.useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get(url +`/users?username=${uname}`)
            setUsers(res.data);
            //console.log(res.data)
            return res;
        }
            fetchUser()
    },[uname])
    // console.log(Users)
    return(
        <>  
            <Topbar text={text} setText={setText} location="home" Users={Users} setIsLoggedIn={setIsLoggedIn}/>
            <Row className="homeContainer d-flex mt-2">
                <Col xs={12} md={8} className="feedHome">
                    <Feed username="" id={Users._id} location="home" User={Users}/>
                </Col>
                <Col xs={12} md={4} className="d-flex mt-2">
                    <Rightbar className="feedRightbar" text={text} 
                    profile="home" setText={setText}  user={Users}/>
                </Col>
            </Row>
        </>
    )
}
export default Home;