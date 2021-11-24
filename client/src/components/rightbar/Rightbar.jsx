import "./rightbar.css";
import {Users} from "./../../dummyData";
import {useWindowSize} from 'react-use';
import {useEffect} from "react"
import CakeIcon from '@mui/icons-material/Cake';
import Example from "./../shared/Modal";
import {useState} from "react"
import Confetti from 'react-confetti'



export default function RightBar({text}){
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
    return(
        <div className="rightbar ms-2" >
            <div className="rightbarWrapper">
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
                </div>
        </div>
    )
}