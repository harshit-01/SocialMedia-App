import React from 'react';
import "./posts.css"
import {Container,Row,Col} from'react-bootstrap';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import {Users} from "./../../dummyData";
import {Form,FloatingLabel,Button} from "react-bootstrap";
import axios from "axios"
import { deepOrange, deepPurple } from '@mui/material/colors';
import moment from 'moment';
import {Link} from "react-router-dom"
import {AuthContext} from "./../../context/AuthContext"
import DeleteIcon from '@mui/icons-material/Delete';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children:name.indexOf(' ') >= 0?`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`:name[0],
  };
}

export default function PostContent({val,onDelete}){
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [likeCount, setLikeCount] = React.useState(val.likes.length>0?val.likes.length:0)
    const [heartCount, setHeartCount] = React.useState(val.heart.length>0 ? val.heart:0)
    const [isLiked,setIsLiked] = React.useState(false);
    const [isHeartCounted,setIsHeartCounted] = React.useState(false);
    const [comment,setComment] = React.useState(false);
    const {user} = React.useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [Users,setUsers] = React.useState({});
    const url = "https://tieup-project.herokuapp.com/api";
    //const url = "http://localhost:5000/api"
    const uname = sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
    React.useEffect(()=>{
        const fetchUser = async()=>{
            const res = uname? await axios.get(url +`/users?username=${uname}`):await axios.get(url +`/users?userId=${val.userId}`)
            
            setUsers(res.data);
            // console.log(res.data,Users.username)
            return res;
        }
        fetchUser()
    },[val.userId,uname])
    const [reaction,setReaction] = React.useState(null);
    const commentRef = React.useRef(null);
    return(
        <Container className="post mb-3">
            <Row className="postWrapper">
                <Col>
                   <Card className="mt-3 card-width">
                    <Link to={`/profile/${val.username}`} style={{textDecoration:"none",color:"black"}}>
                    {Users.profilePicture ?
                        <div className="d-flex justify-content-start align-items-center">
                         <CardMedia
                         component="img"
                         height="194"
                         image={Users.profilePicture}
                         src={Users.profilePicture}
                         alt={Users.profilePicture}
                         style={{ width: "45px", height: "45px", objectFit: "cover",borderRadius: "50%",fontWeight:"bold"}}
                         className="my-2 mx-2"
                        /> 
                        <span className="fw-bold fs-5 me-2">{val.username?val.username:null}</span>
                        <div className="text-muted">{moment(val.createdAt).fromNow()}</div>
                        </div>:
                        <CardHeader
                        avatar={
                        <Avatar {...stringAvatar(val.username?val.username.toUpperCase() : "N A")}>
                        </Avatar>
                        //<Avatar sx={{ bgcolor: deepPurple[500] }}>{Users.username[0]}</Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={val.username}
                        subheader={moment(val.createdAt).fromNow()}
                    />}
                    </Link>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {val.desc}
                        </Typography>
                    </CardContent>
                    {val.img?
                    <CardMedia
                        component="img"
                        className="w-100 image"
                        // min-height="194"
                        image={val.img}
                        alt={val.img}
                    />:  
                    <CardMedia
                    component="img"
                    height="194"
                    image={"https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg"}
                    alt="Paella dish"
                    />}
                    <CardActions disableSpacing>
                        <IconButton aria-label="thumbs" onClick={()=>{
                                 try{
                                    axios.patch(url+`/posts/${val._id}/like`,{userId:uname})
                                }
                                catch(err){
                                    console.log(err)
                                }
                                isLiked ? setLikeCount(likeCount-1):setLikeCount(likeCount+1);
                                setIsLiked(!isLiked);
                            }}>
                            {isLiked?<ThumbUpIcon htmlColor="blue"/>:<ThumbUpIcon />}
                            <span className="ms-2">{likeCount ?likeCount :0}</span>
                        </IconButton>
                        <IconButton aria-label="add to favorites" onClick={()=>{
                                try{
                                    axios.patch(url+`/posts/${val._id}/heart`,{userId:uname})
                                }
                                catch(err){
                                    console.log(err)
                                }
                                isHeartCounted? setHeartCount(heartCount-1):setHeartCount(heartCount+1);
                                setIsHeartCounted(!isHeartCounted)
                            }}>
                            {isHeartCounted ? <FavoriteIcon htmlColor="red"/> : <FavoriteIcon />}
                            <span className="ms-2">{heartCount?heartCount:0}</span>
                        </IconButton>
                        <IconButton aria-label="add to favorites" onClick={()=>{
                            onDelete(val._id,Users._id);
                        }}>
                           <DeleteIcon />
                        </IconButton>
                        <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon /> 
                        </ExpandMore>
                    </CardActions>
                    {/* {console.log(val.comments)} */}
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {comment || val.comments.length>0? 
                            <>
                            <p className="ms-3">Comments</p>
                            <ul>

                                <li style={{listStyleType:"numeric"}}>{val.comments?val.comments:""}</li>
                            </ul>
                            </>
                            :
                        <CardContent>
                            <Typography paragraph className="fw-bolder ms-1">Add Comment</Typography>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                ref={commentRef}
                                />
                                <Button className="mt-2 mb-2" onClick={async(e)=>{
                                    setComment(true)
                                    try{
                                        await axios.patch(url+`/posts/${val._id}/comment`,{userId:Users._id,comments:commentRef.current.value})
                                        window.location.reload()
                                    }
                                    catch(err){
                                        console.log(err)
                                    }
                                }}>Submit</Button>
                            </FloatingLabel>
                        </CardContent>
                        }       
                    </Collapse> 
                   </Card>
                </Col>
            </Row>
        </Container>
    )
}




