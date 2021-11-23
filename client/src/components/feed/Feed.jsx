import "./feed.css";
import Post from "./../shared/Post";
import PostContent from "./../posts/Posts";
export default function Feed(){
    return(
        <div className="feed">
            <div className="feedWrapper mb-5 mb-md-5">
                <Post />
            </div>
            <div className="feedWrapper">
                <PostContent />
                <PostContent />
                <PostContent />
                <PostContent />
                <PostContent />
            </div>
        </div>
    )
}