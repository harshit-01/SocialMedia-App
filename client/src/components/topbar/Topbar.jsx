import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Col,Row} from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import React from "react";
import {Link} from "react-router-dom"

export default function Topbar({text,setText,location,Users}) {
        // const [dataPost,setDataPost] = useState([]);
        // const url = "http://localhost:5000/api";
        // React.useEffect(()=>{
        //     const fetchPosts = async()=>{
        //         const res = await axios.get(url +'/posts/timeline/619fdc5067929e38b047921e')
        //         setDataPost(res.data);
        //         return res;
        //     }
        //     fetchPosts()
        // },[])
        // {dataPost.map((val)=>{
        //     return(
            
        // )})}
        return(
            <div className="container-fluid topbarContainer">
            <Row className="d-flex align-items-center">
                <Col xs={12} md={3} className="pt-1">
                <div className="topbarLeft">
                    <span className="logo ms-1 fw-bold"><Link to="/" style={{
                            color:"white",textDecoration:"none"
                        }}>TieUp</Link></span>
                </div>
                </Col>
                <Col xs={12} md={5} className="pt-1">
                <div className="topbarCenter">
                    <div className="searchbar">
                        <div class="input-group flex-nowrap">
                        <input type="text" className="form-control searchInput" placeholder="Search for friends , posts or video" aria-label="search" aria-describedby="addon-wrapping" />
                        <span class="input-group-text" id="addon-wrapping"><SearchIcon /></span>
                        </div>
                    </div>
                </div>
                </Col>
                <Col xs={12} md={4} className="pt-1">
                <div className="topbarRight d-flex justify-content-around align-items-center">
                    <div className="topbarLinks">
                        <span className="topbarLink me-2" role="button" ><Link to="/" style={{
                            color:"white",textDecoration:"none"
                        }}>Home</Link></span>
                        <span className="topbarLink me-1" role="button" >Timeline</span>
                    </div>
                    <div className="topbarIcons d-flex">
                        <div className="topbarIconItem me-3" role="button"
                        onClick={()=>{
                            setText(!text);
                        }}>
                            <Tooltip title="Click here to check online friends down below">
                            <PersonIcon />
                            </Tooltip>
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem me-3" role="button">
                            <ChatIcon />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItem me-3" role="button">
                            <NotificationsIcon />
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <Link to={`/profile/${Users.username}`} style={{
                            color:"white",textDecoration:"none"
                     }}>
                    <img src="/assets/Person/7.jpeg" alt="" className="topbarImg img-fluid mb-1" role="button"></img></Link>
                </div>
                </Col>
            </Row>
            </div>
        )
}