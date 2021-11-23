import "./feed.css";
import Post from "./../shared/Post";
import PostContent from "./../posts/Posts";
export default function Feed(){
    return(
        <div className="feed">
            <div className="feedWrapper">
                <Post />
                <PostContent />
            </div>
        </div>
    )
}