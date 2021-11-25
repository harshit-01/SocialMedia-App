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
import {Users} from "./../../dummyData";
import {Form,FloatingLabel,Button} from "react-bootstrap";

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
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function PostContent({val}){
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [likeCount, setLikeCount] = React.useState(val.like)
    const [heartCount, setHeartCount] = React.useState(val.comment)
    const [isLiked,setIsLiked] = React.useState(false);
    const [isHeartCounted,setIsHeartCounted] = React.useState(false);
    const [comment,setComment] = React.useState(false);
    return(
        <Container className="post mb-3">
            <Row className="postWrapper">
                <Col>
                   <Card className="mt-3">
                   {Users.filter((u) => u.id === val.userId)[0].profilePicture ?
                        <div className="d-flex justify-content-start align-items-center">
                         <CardMedia
                         component="img"
                         height="194"
                         image={Users.filter((u) => u.id === val.userId)[0].profilePicture}
                         src={Users.filter((u) => u.id === val.userId)[0].profilePicture}
                         alt={Users.filter((u) => u.id === val.userId)[0].profilePicture}
                         style={{ width: "45px", height: "45px", objectFit: "cover",borderRadius: "50%"}}
                         className="my-2 mx-2"
                        /> 
                        <span className="fw-bold fs-5 me-2">{Users.filter((u) => u.id === val.userId)[0].username}</span>
                        <div className="text-muted">{val.date}</div>
                        </div>:
                        <CardHeader
                        avatar={
                        <Avatar {...stringAvatar(Users.filter((u) => u.id === val.userId)[0].username)}>
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={Users.filter((u) => u.id === val.userId)[0].username}
                        subheader={val.date}
                    />}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {val.desc}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="194"
                        image={val.photo}
                        alt="Paella dish"
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="thumbs" onClick={()=>{
                                isLiked ? setLikeCount(likeCount-1):setLikeCount(likeCount+1);
                                setIsLiked(!isLiked);
                            }}>
                            {isLiked?<ThumbUpIcon htmlColor="blue"/>:<ThumbUpIcon />}
                            <span className="ms-2">{likeCount}</span>
                        </IconButton>
                        <IconButton aria-label="add to favorites" onClick={()=>{
                                isHeartCounted? setHeartCount(heartCount-1):setHeartCount(heartCount+1);
                                setIsHeartCounted(!isHeartCounted)
                            }}>
                            {isHeartCounted ? <FavoriteIcon htmlColor="red"/> : <FavoriteIcon />}
                            <span className="ms-2">{heartCount}</span>
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

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {comment ? 
                            <>
                            <p className="ms-3">Comments</p>
                            <ul>
                                <li style={{listStyleType:"numeric"}}>Hello</li>
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
                                />
                                <Button className="mt-2 mb-2" onClick={(e)=>{
                                    setComment(true)
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




