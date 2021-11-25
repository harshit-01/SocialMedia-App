import React from "react";
import './profile.css';
import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import {Col,Row} from "react-bootstrap";
import {useState} from "react";

export default function Profile(){
    const [text,setText] = useState(false);
    return(
        <>
            <Topbar text={text} setText={setText} />
            <Row className="d-flex justify-content-start mt-2 profile profRow">
                <img className="profileImg2 pb-2 ms-2" src="/assets/Post/3.jpeg" alt="image" />
                <img className="profileUser pb-2 mt-1" src="https://i.pinimg.com/564x/5b/6c/ee/5b6cee1b913d46e4cbc8e2a45b651889.jpg" alt="image" />
                <div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>
                <div className="d-flex justify-content-center fs-4 fw-bold">Ben Stone</div>
                <div className="d-flex justify-content-center text-muted">Professor at MIT</div>
            </Row> 
            <Row className="profile d-flex mt-2">
                <Col xs={12} md={8} className="feedHome">
                    <Feed />
                </Col>
                <Col xs={12} md={4} className="d-flex mt-2">
                    <Rightbar className="feedRightbar" text={text} profile="profile"
                    setText={setText}/>
                </Col>
            </Row>
        </>
    )
}