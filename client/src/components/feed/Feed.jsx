import "./feed.css";
import Post from "./../shared/Post";
import PostContent from "./../posts/Posts";
// import {data} from "./../../dummyData"
import {useState,useEffect} from "react"
import axios from "axios"
import { compose } from "@mui/system";

export default function Feed({username,id,location}){
    const [dataPost,setDataPost] = useState([]);
    const url = "http://localhost:5000/api";
    useEffect(()=>{
        const fetchPosts = async()=>{
            const res = username ? await axios.get(url +`/posts/profile/${username}`):await axios.get(url +`/posts/timeline/${id}`)
            setDataPost(res.data);
            console.log(dataPost)
            return res;
        }
        fetchPosts()
    },[username,id])
    return(
        <div className="feed">
            <div className="feedWrapper mb-5 mb-md-5">
                <Post />
            </div>
            <div className="feedWrapper">
                <h4 className="fw-bolder ms-4">Posts</h4>
                {dataPost.length>0 ? dataPost.map((d,index)=>{
                    return(
                    <PostContent key={index} val={d}/>
                    )
                }):<div className="ms-4">No post yet.</div>}
            </div>
        </div>
    )
}