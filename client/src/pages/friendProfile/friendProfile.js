import React from 'react';
import './../profile/profile.css';
import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import {Col,Row,Button} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useParams,useHistory,Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import Sidebar from "../../components/sidebar/Sidebar"
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PostContent from "./../../components/posts/Posts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FriendProfile({setIsLoggedIn}){
    const [text,setText] = useState(false);
    const [Users,setUsers] = React.useState({});
    const [dataPost,setDataPost] = useState([]);
    const params = useParams();
    const url = "http://localhost:5000/api";
    const uname = params.username ?params.username:null;
    const currentUser = sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
    React.useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get(url +`/users?username=${params.username}`)
            setUsers(res.data);
            // console.log(res.data)
            return res;
        }
        fetchUser()
    },[params.username])
    React.useEffect(()=>{
        const fetchPosts = async()=>{
            const res = await axios.get(url +`/posts/profile/${params.username}`)
            if(res.data.length>0){
                const arr = res.data.sort(function(a,b){
                    const x= new Date(a.createdAt);
                    const y = new Date(b.createdAt);
                    return y-x;
                })
               // console.log(arr)
                setDataPost(arr);
            }
            else{
            console.log(res)
            }
            // console.log(dataPost)
            return res;
        }
        fetchPosts()
    },[params.username])
    const history = useHistory();
    const [isFollowed,setIsFollowed] = React.useState(false)
    const inpRef = React.useRef();
    const submitHandler = (value)=>{
            window.open(`/friendProfile/${inpRef.current.value}`,'_blank', );
    }
    const onDelete  = async (val,id)=>{
        // await axios.delete(url +`/posts/${val}/${id}`)
        toast.error('You cannot delete this post.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"colored"
        });
    }
    return(
        <> 
             {/* Topbar */}
            <div className="container-fluid topbarContainer">
            <Row className="d-flex align-items-center ">
                <Col xs={6} md={3} className="pt-1 d-flex" >
                    <div className="topbarLeft d-flex">
                        <span className="logo ms-1 fw-bolder fs-2"><Link to="/" style={{
                                color:"white",textDecoration:"none"
                            }}>TieUp</Link>
                        </span>
                    </div>
                </Col>
                <Col xs={6} className="d-flex d-md-none justify-content-end mt-2">
                    <div className="topbarIcons d-flex">
                            <div className="topbarIconItem me-3 mt-2" role="button"
                            onClick={()=>{
                                setText(!text);
                            }}>
                                <Tooltip title="Click here to check online friends down below">
                                <PersonIcon />
                                </Tooltip>
                                <span className="topbarIconBadge">1</span>
                            </div>
                        </div>
                    <span className="d-flex">
                            <Link to={`/friendProfile/${params.username}`} style={{
                                    color:"white",textDecoration:"none"
                            }} className="mb-1">
                            {Users.profilePicture ?
                            <img src={Users.profilePicture} alt="" className="topbarImg img-fluid" role="button"></img>: uname ?
                            <Avatar sx={{ bgcolor: deepOrange[700] }}>{uname[0].toUpperCase()}</Avatar>:
                            <img src="https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png" alt="" className="topbarImg img-fluid" role="button"></img>}
                            </Link>
                    </span>
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
                    <div className="topbarRight d-none d-md-flex justify-content-end align-items-center">
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
                        </div>
                        <Link to={`/friendProfile/${params.username}`} style={{
                                color:"white",textDecoration:"none"
                        }} className="mb-1">
                        {Users.profilePicture ?
                        <img src={Users.profilePicture} alt="" className="topbarImg img-fluid" role="button"></img>: uname ?
                        <Avatar sx={{ bgcolor: deepOrange[700] }}>{uname[0].toUpperCase()}</Avatar>:
                        <img src="https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png" alt="" className="topbarImg img-fluid" role="button"></img>}</Link>
                    </div>
                </Col>
            </Row>
            </div>

            <Row className="d-flex justify-content-start mt-2 profile profRow">
                <img className="profileImg2 pb-2 ms-2" src="https://img5.goodfon.com/wallpaper/nbig/a/93/shveitsariia-gshtaad-gstaad-priroda-peizazh-derevnia-gory-al.jpg" alt="image" />
                {!Users.coverPicture ?
                <img className="profileUser pb-2 mt-1" src="https://i.pinimg.com/564x/5b/6c/ee/5b6cee1b913d46e4cbc8e2a45b651889.jpg" alt="image" />:
                <img className="profileUser pb-2 mt-1" src={Users.coverPicture} alt="image" />}
                <div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>
                <div className="d-flex justify-content-center fs-4 fw-bold">{Users.username}
                <span className="ms-2 mb-2"><Button size="sm" variant={isFollowed ?"outline-danger":"outline-primary"} onClick={async()=>{
                    setIsFollowed(!isFollowed);
                    if(!isFollowed){
                        await axios.put(url+`/users/${Users._id}/follow`,{username:currentUser})
                    }
                    else{
                        await axios.put(url+`/users/${Users._id}/unfollow`,{username:currentUser})
                    }
                }}>{!isFollowed?"Follow":"Unfollow"}</Button></span></div>
                <div className="d-flex justify-content-center text-muted">{Users.desc}</div>
            </Row> 
            <Row className="profile d-flex mt-2">
                <Col xs={12} md={8} className="feedHome">
                    <div className="feedWrapper mb-2">
                    <h4 className="fw-bolder ms-4" >
                        Posts
                    </h4>
                    {dataPost.length>0 ? dataPost.map((d,index)=>{
                        return(
                        <PostContent  val={d} onDelete={onDelete}/>
                        )
                    }):<div className="ms-4 mb-3">No post yet.</div>}
                </div>
                </Col>
                <Col xs={12} md={4} className="d-flex mt-2">
                    <Rightbar className="feedRightbar" text={text} profile="profile"
                    setText={setText} user={Users}/>
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
        </>
    )
}