import "./rightbar.css";
import {Container,Row,Col} from "react-bootstrap";

export default function RightBar(){
    return(
        <div className="rightbar ms-2">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span> Alex and 3 others have birthday today .</span>
                </div>
                <div className="mt-1 ps-2" style={{backgroundColor:"goldenrod",width:"10%"}}>AD</div>
                    <img src="/assets/ad1.png" alt="ad" className="ad mt-3"/>
                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightbarFriendList">
                        <li className="rightbarFriend" style={{listStyleType: "numeric"}}>
                            <div className="rightbarProfileImgConatiner ms-1">
                                <img className="rightbarProfileImg" src="assets/Person/3.jpeg" alt=""></img>
                                <span className="ms-2">Julie</span>
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
    )
}