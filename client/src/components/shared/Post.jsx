import "./post.css";
import Divider from '@mui/material/Divider';
import {Container,Row,Col,Card} from "react-bootstrap";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Sidebar from "../../components/sidebar/Sidebar"
import Button from '@mui/material/Button';


export default function Post(){
    return(
        <Container className="share">
            <Row className="shareWrapper">
                <Col className="shareTop">
                    <Card border="info shadow">
                        <Card.Header className="d-flex">
                            <img src="https://i.pinimg.com/564x/5b/6c/ee/5b6cee1b913d46e4cbc8e2a45b651889.jpg" alt="person" className="shareProfileImg me-2 mb-2" />
                            <input className="shareInput me-1" placeholder="What's in your mind?"></input>
                            <Sidebar/>
                        </Card.Header>
                        <Card.Body>
                        <Card.Title>Share with everyone</Card.Title>
                        <Card.Text className="shareOptions">
                            <div className="shareOption">
                                <PermMediaIcon className="shareIcon" htmlColor="tomato"/>
                                <span className="shareOptionText ms-2 me-2">Photo or video</span>
                                <LabelIcon className="labelIcon" htmlColor="blue"/>
                                <span className="shareOptionText ms-2 me-2">Tag</span>
                                <RoomIcon className="shareIcon" htmlColor="green"/>
                                <span className="shareOptionText ms-2 me-2">Location</span>
                                <EmojiEmotionsIcon className="shareIcon" color="secondary"/>
                                <span className="shareOptionText ms-2 me-2">Feelings</span>
                                <Button size="small" style={{float: 'right'}}>Share</Button>
                            </div>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}