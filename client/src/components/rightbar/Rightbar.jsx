import "./rightbar.css";
import {Users} from "./../../dummyData";
import {useWindowSize} from 'react-use';
import {useEffect} from "react"
import CakeIcon from '@mui/icons-material/Cake';
import Example from "./../shared/Modal";
import {useState} from "react"
import Confetti from 'react-confetti'



export default function RightBar({text,profile}){
    const { width, height } = useWindowSize();
    const [show, setShow] = useState(false);
    const [conf,setConf] = useState(false);
    const handleClose = () => {
        setShow(false);
        setConf(false);
        window.location.reload();
    }
    const handleShow = () => {
        setShow(true);
        setConf(true);
    }
    const HomeRightBar = ()=>{
        return(
            <>
                 <div className="birthdayContainer ">
                    <img className="birthdayImg mb-2 " src="/assets/gift.png" alt="" 
                    role="button"/>
                    <span> Alex and 3 others have birthday today .</span>
                    {conf?
                    <Confetti
                    width={width-12}
                    height={height}
                    run={conf} 
                    numberOffset={280}  
                    />:null}
                    </div>
                        <h4 className="rightbarTitle mt-1">Online Friends</h4>
                        <ul className="rightbarFriendList">
                            {text? Users.map((val)=>{
                            return(
                            <li className="rightbarFriend mb-1" style={{listStyleType: "numeric"}}>
                                <div className="rightbarProfileImgConatiner ms-1">
                                    <img className="rightbarProfileImg" src={val.profilePicture} alt=""></img>
                                    <span className="ms-2">{val.username}</span>
                                </div>
                            </li>)}): "1. None"}
                        </ul>
                        <div className="mb-2">
                            <CakeIcon htmlColor="pink" size="large" onClick={handleShow}role="button"/>
                            <span className="shareOptionText ms-2 me-2" onClick={handleShow} role="button" fontSize="large">Is it your birthday today?</span>
                            {show?<Example show={show} handleShow={handleShow} handleClose={handleClose} />:null}
                        </div>
                        <div>
                            <span className="ps-2 me-2 pe-2" style={{backgroundColor:"goldenrod",width:"15%"}}>AD</span><span>Have a doubt, try Solutionists !</span>
                            <img src="/assets/ad1.png" alt="ad" className="ad mt-3"/>
                        </div>
                        <div className="video-responsive mt-2">
                                <iframe
                                width="853"
                                height="480"
                                src="https://www.youtube.com/embed/wneMN_N3__0"
                                frameBorder="0"
                                
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                        />
                    </div>
            </>

        )
    }
    const ProfileRightBar = ()=>{
        return(
            <>
                    <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue ms-2">New York</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue ms-2">Madrid</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue ms-2">Single</span>
                </div>
                </div>
                <h4 className="rightbarTitle mt-1">Online Friends</h4>
                        <ul className="rightbarFriendList">
                            {text? Users.map((val)=>{
                            return(
                            <li className="rightbarFriend mb-1" style={{listStyleType: "numeric"}}>
                                <div className="rightbarProfileImgConatiner ms-1">
                                    <img className="rightbarProfileImg" src={val.profilePicture} alt=""></img>
                                    <span className="ms-2">{val.username}</span>
                                </div>
                            </li>)}): "1. None"}
                        </ul>
                <div>
                    <span className="ps-2 me-2 pe-2" style={{backgroundColor:"goldenrod",width:"15%"}}>AD</span><span>Have a doubt, try Solutionists !</span>
                    <img src="/assets/ad1.png" alt="ad" className="ad mt-3"/>
                </div>
                <div className="video-responsive mt-2">
                    <iframe
                    width="853"
                    height="480"
                    src="https://www.youtube.com/embed/wneMN_N3__0"
                    frameBorder="0"
                                
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    />
                </div>
                <h4 className="rightbarTitle mt-2">User friends</h4>
                    <div className="rightbarFollowings d-flex flex-wrap">
                        <div className="rightbarFollowing mt-2 me-2">
                            <img
                            src="assets/person/1.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName ms-2">John Carter</span>
                        </div>
                        <div className="rightbarFollowing mt-2">
                            <img
                            src="assets/person/2.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName ms-2">John Carter</span>
                        </div>
                        <div className="rightbarFollowing mt-2 me-2">
                            <img
                            src="assets/person/3.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName ms-2">John Carter</span>
                        </div>
                        <div className="rightbarFollowing mt-2">
                            <img
                            src="assets/person/4.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName ms-2">John Carter</span>
                        </div>
                        <div className="rightbarFollowing mt-2 me-2">
                            <img
                            src="assets/person/5.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName ms-2">John Carter</span>
                        </div>
                        <div className="rightbarFollowing mt-2">
                            <img
                            src="assets/person/6.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName ms-2">John Carter</span>
                        </div>
                        
                </div>
    
            </>
        )
    }
    return(
        <div className="rightbar ms-2" >
            <div className="rightbarWrapper">
                {profile === "profile" ? <ProfileRightBar /> :<HomeRightBar />}
            </div>
        </div>
    )
}