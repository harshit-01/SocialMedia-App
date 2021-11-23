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

export default function PostContent(){
    const [expanded, setExpanded] = React.useState(false);
    const avatar = "/assets/Person/1.jpeg";
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return(
        <Container className="mt-2 post mb-3">
            <Row className="postWrapper">
                <Col>
                   <Card>
                   {avatar ?
                        <div className="d-flex justify-content-start align-items-center">
                         <CardMedia
                         component="img"
                         height="194"
                         image="/assets/Person/1.jpeg"
                         src={avatar}
                         alt={avatar}
                         style={{ width: "45px", height: "45px", objectFit: "cover",borderRadius: "50%"}}
                         className="my-2 mx-2"
                        /> 
                        <span className="fw-bold fs-5">Yo</span>
                        </div>:
                        <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="5 mins ago"
                    />}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="194"
                        image="/assets/Post/1.jpeg"
                        alt="Paella dish"
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="thumbs">
                            <ThumbUpIcon />
                            <span className="ms-2">1</span>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            <span className="ms-2">1</span>
                        </IconButton>
                        {/* <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton> */}
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
                        <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                        </Typography>
                        </CardContent>
                    </Collapse>
                   </Card>
                </Col>
            </Row>
        </Container>
    )
}


