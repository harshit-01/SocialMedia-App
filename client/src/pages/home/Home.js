import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css"
import {Col,Row} from "react-bootstrap";
import React,{useState} from "react";
import axios from "axios"
import {useParams} from "react-router-dom"

const Home = ()=>{
    const [text,setText] = useState(false);
    const [Users,setUsers] = React.useState({});
    const params = useParams();
    const url = "http://localhost:5000/api";
    React.useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get(url +`/users?username=Harshit Kashyap`)
            setUsers(res.data);
            console.log(res.data,Users._id)
            return res;
        }
            fetchUser()
    },[])
    return(
        <>  
            <Topbar text={text} setText={setText} location="home" Users={Users}/>
            <Row className="homeContainer d-flex mt-2">
                <Col xs={12} md={8} className="feedHome">
                    <Feed username="" id={Users._id} />
                </Col>
                <Col xs={12} md={4} className="d-flex mt-2">
                    <Rightbar className="feedRightbar" text={text} 
                    profile="home" setText={setText}  Users={Users}/>
                </Col>
            </Row>
        </>
    )
}
export default Home;