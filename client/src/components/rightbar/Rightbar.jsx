import "./rightbar.css";
import {Users} from "./../../dummyData";
import {useWindowSize} from 'react-use';
import CakeIcon from '@mui/icons-material/Cake';
import Example from "./../shared/Modal";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {useState,useEffect,useContext} from "react"
import Confetti from 'react-confetti'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import axios from "axios"
import {AuthContext} from "../../context/AuthContext"
import{Link} from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import {Modal,Button,Row,Col} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyTextInput = ({ label, ...props }) => {
    
    const [field, meta] = useField(props);
    return (
      <Row>
        <Col xs={4}>
        <label htmlFor={props.id || props.name} className="fw-bold">{label}:</label>
        </Col>
        <Col xs={8}>
        <input className="text-input mb-3 ms-2 rounded inp w-75" {...field} {...props}/>
        </Col>
        <br />
        {meta.touched && meta.error ? (
          <div className="error text-danger">*{meta.error}</div>
        ) : null}
      </Row>
    );
  };
  
  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <Row>
        <Col xs={4}>
        <label htmlFor={props.id || props.name} className="fw-bold">{label}:</label>
        </Col>
        <Col xs={8}>
        <textarea className="textarea ms-2 rounded w-75" {...field} {...props}/>
        </Col>
        <br/>
        {meta.touched && meta.error ? (
          <div className="error text-danger">*{meta.error}</div>
        ) : null}
      </Row>
    );
  };
  


export default function RightBar({text,profile,user}){
    const { width, height } = useWindowSize();
    const [show, setShow] = useState(false);
    const [conf,setConf] = useState(false);
    const [friends,setFriends] = useState(false);
    const handleClose = () => {
        setShow(false);
        setConf(false);
        window.location.reload();
    }
    const handleShow = () => {
        setShow(true);
        setConf(true);
    }
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const url = "http://localhost:5000/api";
    useEffect(() => {
        const getFriends = async()=>{
            const res = await axios.get(url +`/users/${user._id}/friends`);
            setFriends(res.data);
        }
        getFriends();
    },[user._id])
    const [op,setOp] =useState(false);
    const handleCloseModal = () => setShow(false);

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
                            {text? user.followings.length>0 ? user.followings.map((val,i)=>{
                            return(
                            <li className="rightbarFriend mb-1" style={{listStyleType: "numeric"}}>
                                <div className="rightbarProfileImgConatiner ms-1">
                                    {val.profilePicture?
                                    <img className="rightbarProfileImg" src={PF+ val.profilePicture} alt=""></img>:
                                    i%2 ==0 ?
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{val.username[0]}</Avatar>:
                                    <Avatar sx={{ bgcolor: deepPurple[500] }}>{val.username[0]}</Avatar>
                                    }
                                    <span className="ms-2">{val.username}</span>
                                </div>
                            </li>)}):"1. None": ""}
                        </ul>
                        <div className="mb-2">
                            <span data-toggle="tooltip" title="Click me">
                            <CakeIcon htmlColor="pink" size="large" onClick={handleShow}role="button" /></span>
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
                <h4 className="rightbarTitle">User information
                <span  data-toggle="tooltip" title="Update user info">
                <EditIcon className="ms-2 mb-1" role="button" onClick={()=>{
                    setOp(true);
                }}/></span>
                </h4>
                <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue ms-2">{user.city ? user.city:"NA"}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue ms-2">{user.from ? user.from:"NA"}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue ms-2">{user.relationship ? user.relationship === 1? "Single":user.relationship === 2?"Married":"Divorced":"NA"}</span>
                </div>
                </div>
                <h4 className="rightbarTitle mt-1">Online Friends</h4>
                        <ul className="rightbarFriendList">
                            {text? user.followings && user.followings.length>0 ? user.followings.map((val)=>{
                            return(
                            <li className="rightbarFriend mb-1" style={{listStyleType: "numeric"}}>
                                <div className="rightbarProfileImgConatiner ms-1">
                                {val.profilePicture ?
                                    <img className="rightbarProfileImg" src={PF+val.profilePicture} alt=""></img>:
                                    <Avatar sx={{ bgcolor: deepPurple[500] }}>{val.username[0]}
                                    </Avatar>}
                                    <span className="ms-2">{val.username}</span>
                                </div>
                            </li>)}):"1. None": ""}
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
                        {friends && friends.length > 0 ? friends.map((fri)=>{

                        return(
                        <Link to={`/friendProfile/${fri.username}`} style={{textDecoration:"none",color:"black"}}>
                        <div className="rightbarFollowing mt-2 me-2">
                            {fri.profilePicture ?
                            <img
                            src={fri.profilePicture}
                            alt=""
                            className="rightbarFollowingImg"
                            /> :<div className="d-flex">
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>{fri.username[0]}
                            </Avatar> <span className="rightbarFollowingName ms-2 mt-2 me-1">{fri.username}</span></div>}
                        </div> </Link>)}):"None"} 
                    </div>
                <div className="my-2">
                    <span className="fw-bold"># Wanna be a premium user? Call us at <span className="fw-bold text-primary">9992223331</span> for more information.</span>
                </div>
                {op?
                <Modal
                    show={op}
                    onHide={handleCloseModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header >
                    <Modal.Title>User Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Formik
                            initialValues={{
                            city:'',
                            from: '',
                            relationship:'',
                            description:'',
                            }}
                            validationSchema={Yup.object({
                            city:Yup.string().required(),
                            from: Yup.string().required(),
                            relationship:Yup.string().required(), 
                            description:Yup.string()
                                .min(2, 'Description is too short - should be 2 char minimum.')
                                .max(50, 'Description is too long - should be 50 chars maximum.')
                                .required() 
                            })}
                            onSubmit={async(values, { setSubmitting }) => {
                                // console.log(values)
                                const num = values.relationship == "Single" ? 1:2;
                                try{
                                    await axios.put(url+`/users/${user._id}/info`,{userId:user._id
                                    ,city:values.city,from:values.from,relationship:num,desc:values.description})
                                }
                                catch(err){
                                    console.log(err);
                                }
                                toast.success('Data updated successfully', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme:"colored"
                                    });
                                setOp(false);
                                window.location.reload();
                            }}
                        >
                            <Form>
                            <MyTextInput
                                label="City"
                                name="city"
                                type="text"
                                placeholder="New Delhi"
                            />
                            <MyTextInput
                                label="From"
                                name="from"
                                type="text"
                                placeholder="Delhi"
                            />
            
                            <MyTextInput
                                label="Relationship"
                                name="relationship"
                                type="text"
                                placeholder="Single|Married"
                            />

                            <MyTextArea
                                label="Description"
                                name="description"
                                type="textarea"
                                placeholder="Description"
                            />

                             <Modal.Footer>
                                <Button variant="outline-secondary" onClick={()=>{
                                    setOp(false)
                                }}>
                                    Close
                                </Button>
                                <Button variant="outline-primary" type="submit">Update</Button>
                                </Modal.Footer>
                            </Form>
                        </Formik>
                    </Modal.Body>
                </Modal>:null}
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
    return(
        <div className="rightbar ms-2" >
            <div className="rightbarWrapper">
                {profile === "profile" ? <ProfileRightBar /> :<HomeRightBar />}
            </div>
        </div>
    )
}