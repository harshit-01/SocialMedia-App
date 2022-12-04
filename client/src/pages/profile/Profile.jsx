import React from "react";
import './profile.css';
import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import {Col,Row} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"


export default function Profile({setIsLoggedIn}){
    const [text,setText] = useState(false);
    const [Users,setUsers] = React.useState({});
    const params = useParams();
    const url = "https://tieup.onrender.com/api";
    const uname = sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
    React.useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get(url +`/users?username=${uname}`)
            setUsers(res.data);
            // console.log(res.data)
            return res;
        }
        fetchUser()
    },[uname])
    return(
        <>
            <Topbar text={text} setText={setText} location="profile" Users={Users} setIsLoggedIn={setIsLoggedIn}/>
            <Row className="d-flex justify-content-start mt-2 profile profRow">
                <img className="profileImg2 pb-2 ms-2" src="https://img5.goodfon.com/wallpaper/nbig/a/93/shveitsariia-gshtaad-gstaad-priroda-peizazh-derevnia-gory-al.jpg" alt="image" />
                {!Users.coverPicture ?
                <img className="profileUser pb-2 mt-1" src="https://i.pinimg.com/564x/5b/6c/ee/5b6cee1b913d46e4cbc8e2a45b651889.jpg" alt="image" />:
                <img className="profileUser pb-2 mt-1" src={Users.coverPicture} alt="image" />}
                <div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>
                <div className="d-flex justify-content-center fs-4 fw-bold">{Users.username}</div>
                <div className="d-flex justify-content-center text-muted">{Users.desc}</div>
            </Row> 
            <Row className="profile d-flex mt-2">
                <Col xs={12} md={8} className="feedHome">
                    <Feed username ={uname} id={Users._id} location="profile" User={Users}/>
                </Col>
                <Col xs={12} md={4} className="d-flex mt-2">
                    <Rightbar className="feedRightbar" text={text} profile="profile"
                    setText={setText} user={Users} isFri ={false}/>
                </Col>
            </Row>
        </>
    )
}