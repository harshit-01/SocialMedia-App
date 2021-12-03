import React from 'react';
import "./feed.css";
import Post from "./../shared/Post";
import PostContent from "./../posts/Posts";
// import {data} from "./../../dummyData"
import {useState,useEffect,useRef} from "react"
import axios from "axios"
import { compose } from "@mui/system";
import {AuthContext} from "./../../context/AuthContext"
import {Button} from "react-bootstrap";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Feed({username,id,location,User}){
    const [dataPost,setDataPost] = useState([]);
    const {user} = React.useContext(AuthContext)
    const url = "http://localhost:5000/api";
    const moveToAddPost = useRef(null);
    const moveToTop = useRef(null);
    const uname = sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
    // console.log(user)
    useEffect(()=>{
        const fetchPosts = async()=>{
            const res = location == "profile" ? await axios.get(url +`/posts/profile/${uname}`):await axios.get(url +`/posts/timeline/${uname}`)
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
    },[uname])
    const onDelete  = async (val,id)=>{
        await axios.delete(url +`/posts/${val}/${id}`)
        toast.error('Data successfully deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"colored"
        });
        setTimeout(()=>{
            window.location.reload();
        },3000)
    }
    return(
        <div className="feed">
            <div className="feedWrapper mb-2">
                <h4 className="fw-bolder ms-4" ref={moveToTop}>
                    Posts
                    <Button className="float-end border-none" color="white" variant="outlined"
                    data-toggle="tooltip" title="Move to add Post" onClick ={()=>{
                        moveToAddPost.current.scrollIntoView({block: "end"})
                    }}><ArrowDownwardIcon sx={{ fontSize: 25 }} /></Button>
                </h4>
                {dataPost.length>0 ? dataPost.map((d,index)=>{
                    return(
                    <PostContent  val={d} onDelete={onDelete}/>
                    )
                }):<div className="ms-4 mb-3">No post yet.</div>}
            </div>
            <div className="feedWrapper mb-5 mb-md-5">
                <h4 className="fw-bolder ms-4 mb-4" ref={moveToAddPost}>
                    Add Post
                    <Button className="float-end border-none" color="white" variant="outlined"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Move to top"
                     onClick ={()=>{
                        moveToTop.current.scrollIntoView({block: "end"})
                    }}><ArrowUpwardIcon sx={{ fontSize: 25 }}/>
                    </Button>
                </h4>
                <Post user={User}/>
            </div>
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