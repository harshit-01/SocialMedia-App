import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Col,Row} from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import React from "react";
import {Link,useHistory} from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Topbar({text,setText,location,Users,setIsLoggedIn}) {
        const history = useHistory()
        const uname = sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
        const inpRef = React.useRef();
        const submitHandler = (e)=>{
            e.preventDefault();
            if(Users.username !== inpRef.current.value){
                history.push(`/friendProfile/${inpRef.current.value}`);
            }
            else{
                toast.info("You can't search yourself", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"colored"
                    });
            }
        }
        return(
            <div className="container-fluid topbarContainer">
            <Row className="d-flex align-items-center">
                <Col xs={12} md={3} className="pt-1">
                <div className="topbarLeft">
                    <span className="logo ms-1 fw-bolder fs-2"><Link to="/" style={{
                            color:"white",textDecoration:"none"
                        }}>TieUp</Link></span>
                </div>
                </Col>
                <Col xs={12} md={4} className="pt-1 pb-2">
                <div className="topbarCenter">
                <form onSubmit={submitHandler}>
                    <div className="searchbar">
                        <div className="input-group flex-nowrap">
                        <input type="text" className="form-control searchInput" placeholder="Search for friends/posts and press enter" aria-label="search" aria-describedby="addon-wrapping" ref={inpRef}/>
                        <span className="input-group-text" id="addon-wrapping"><SearchIcon /></span>
                        </div>
                    </div>
                    </form>
                </div>
                </Col>
                <Col xs={12} md={5} className="pt-1">
                <div className="topbarRight d-flex justify-content-around align-items-center">
                    <div className="topbarLinks">
                        <span className="topbarLink me-2" role="button" ><Link to="/" style={{
                            color:"white",textDecoration:"none"
                        }}>Home</Link></span>
                        <span className="topbarLink me-1" role="button" onClick ={()=>{
                            sessionStorage.removeItem("user");
                            sessionStorage.removeItem('name')
                            setIsLoggedIn(false)
                            history.push('/login')
                        }}>Logout</span>
                    </div>
                    <div className="topbarIcons d-flex">
                        <div className="topbarIconItem me-3 mt-1" role="button"
                        onClick={()=>{
                            setText(!text);
                        }}>
                            <Tooltip title="Click here to check online friends down below">
                            <PersonIcon />
                            </Tooltip>
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem me-3 mt-1" role="button">
                            <ChatIcon />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItem mt-1 ms-2" role="button">
                            <Sidebar/>
                        </div>
                    </div>
                    <Link to={`/profile/${uname}`} style={{
                            color:"white",textDecoration:"none"
                     }} className="mb-1">
                    {Users.profilePicture ?
                    <img src={Users.profilePicture} alt="" className="topbarImg img-fluid" role="button"></img>: uname ?
                    <Avatar sx={{ bgcolor: deepOrange[700] }}>{uname[0].toUpperCase()}</Avatar>:
                    <img src="https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png" alt="" className="topbarImg img-fluid" role="button"></img>}</Link>
                </div>
                </Col>
            </Row>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
            </div>
        )
}