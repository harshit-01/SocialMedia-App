import "./post.css";
import Divider from '@mui/material/Divider';
import {Container,Row,Col,Card} from "react-bootstrap";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import Sidebar from "../../components/sidebar/Sidebar"
import Button from '@mui/material/Button';
import React from 'react';
import {AuthContext} from './../../context/AuthContext';
import InputEmoji from "react-input-emoji";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase from 'react-file-base64';



export default function Post({user}){
    // const {user} = React.useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = React.useRef();
    const [file,setFile] = React.useState(null);
    const [text, setText] = React.useState("");
    const url = "https://tieup-project.herokuapp.com/api";
    let dataUrl ="";
    function handleOnEnter(text) {
      console.log("enter", text);
    }
    const imgRef = React.useRef();
    const [image, setImage] = React.useState(null)
    const onImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                setImage(URL.createObjectURL(event.target.files[0]));
            }
            // if (event.target.files && event.target.files[0]) {
            //     let reader = new FileReader();
            //     var fileByteArray = [];
            //     reader.onload = (e) => {
            //         setImage({image: e.target.result});
            //         // if (e.target.readyState == FileReader.DONE) {
            //         //     var arrayBuffer = e.target.result,
            //         //         array = new Uint8Array(arrayBuffer);
            //         //     for (var i = 0; i < array.length; i++) {
            //         //         fileByteArray.push(array[i]);
            //         //     }
            //         //     setImage({image: fileByteArray});
            //         // }
            //     };
            //     reader.readAsBinaryString(event.target.files[0])
            //     // reader.readAsDataURL(event.target.files[0]);
            //     // reader.readAsArrayBuffer(event.target.files[0]); 
            // }
    }
    // console.log(image)
    const submitHandler = async(e)=>{
        // debugger;
        e.preventDefault();
        const newPost = {
            userId:user._id,
            username:user.username,
            desc:text,
            img:image
        }
        // console.log("post", newPost);
        // if(file){
        //     const data = new FormData();
        //     const fileName = Date.now() + file.name;
        //     data.append("name", fileName);
        //     data.append("file", file);
        //     //newPost.img = fileName;
        //     try{
        //         await axios.post(url+'/upload',data)
        //     }
        //     catch(err){
        //         console.log(err);
        //     }
        // }
        try{
            await axios.post(url+'/posts',newPost)
            toast.info('Post successfully created', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"colored"
                });
        }
        catch(err){
            console.log(err)
            toast.error('Sorry! something went wrong', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"colored"
                });
        }

        setTimeout(()=>{
        window.location.reload();
        },3000)
    }
    const [isDisabled,setIsDisabled] = React.useState(false);
    return(
        <Container className="share">
            <Row className="shareWrapper">
                <Col className="shareTop">
                    <Card border="info shadow" style={{minWidth:"16rem"}}>
                        <Card.Header className="d-flex">
                            <img src={user.profilePicture? PF+ user.profilePicture:"https://i.pinimg.com/564x/5b/6c/ee/5b6cee1b913d46e4cbc8e2a45b651889.jpg"} alt="person" className="shareProfileImg me-2 mb-2" />
                            {/* <input className="shareInput me-1" placeholder="What's in your mind?" ref={desc}></input> */}
                            <InputEmoji
                            value={text}
                            onChange={setText}
                            cleanOnEnter
                            onEnter={handleOnEnter}
                            placeholder="What's in your mind?"
                            ref={desc}
                            fontSize={17}
                            />
                            
                        </Card.Header>
                        <Card.Body>
                        <Card.Title>Share with everyone</Card.Title>
                        <Card.Text className="shareOptions">
                            <form onSubmit={submitHandler} enctype="multipart/form-data" method="post">
                            <div className="shareOption">
                                <label htmlFor="file" className="shareOption" role="button" data-toggle="tooltip" title="Attach File">
                                <PermMediaIcon className="shareIcon" htmlColor="tomato"/>
                                <span className="shareOptionText ms-2 me-2">Photo or video</span>
                                    {/* <input type="file" id="file" name="file" accept="image/*"
                                    onChange ={(e)=>{
                                        console.log(e.target.files)
                                        onImageChange(e);
                                        setFile(e.target.files[0])
                                    }} className="my-2 d-none" ref={imgRef}/> */} 
                                </label>
                                <LabelIcon className="labelIcon" htmlColor="blue"/>
                                <span className="shareOptionText ms-2 me-2">Tag</span>
                                <RoomIcon className="shareIcon" htmlColor="green"/>
                                <span className="shareOptionText ms-2 me-2">Location</span>
                                <EmojiEmotionsIcon className="shareIcon" color="secondary"/>
                                <span className="shareOptionText ms-2 me-2">Feelings</span>
                                <FileBase type="file" multiple={false} onDone={({base64}) => setImage(base64)} />
                                <Button size="small" type="submit" style={{float: 'right'}}
                                disabled={isDisabled} onClick={(e)=>{
                                    submitHandler(e)
                                    setIsDisabled(true);
                                }}>Share</Button>
                            </div>
                            </form>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
            </Row>
        </Container>
    )
}