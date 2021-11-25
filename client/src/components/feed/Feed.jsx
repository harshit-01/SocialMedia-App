import "./feed.css";
import Post from "./../shared/Post";
import PostContent from "./../posts/Posts";
import {data} from "./../../dummyData"

export default function Feed(){
    return(
        <div className="feed">
            <div className="feedWrapper mb-5 mb-md-5">
                <Post />
            </div>
            <div className="feedWrapper">
                <h4 className="fw-bolder ms-4">Posts</h4>
                {data.map((d,index)=>{
                    return(
                    <PostContent key={index} val={d}/>
                    )
                })}
            </div>
        </div>
    )
}