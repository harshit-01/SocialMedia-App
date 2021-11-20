import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Col,Row,Container} from "react-bootstrap"
export default function Topbar() {
        return(
            <div className="container-fluid topbarContainer">
            <Row className="d-flex align-items-center">
                <Col xs={12} md={3} className="pt-1">
                <div className="topbarLeft">
                    <span className="logo ms-1 fw-bold">Social Media App</span>
                </div>
                </Col>
                <Col xs={12} md={5} className="pt-1">
                <div className="topbarCenter">
                    <div className="searchbar">
                        <div class="input-group flex-nowrap">
                        <input type="text" className="form-control searchInput" placeholder="Search for friends , posts or video" aria-label="search" aria-describedby="addon-wrapping" />
                        <span class="input-group-text" id="addon-wrapping"><SearchIcon /></span>
                        </div>
                    </div>
                </div>
                </Col>
                <Col xs={12} md={4} className="pt-1">
                <div className="topbarRight d-flex justify-content-around align-items-center">
                    <div className="topbarLinks">
                        <span className="topbarLink me-2" role="button" >Home</span>
                        <span className="topbarLink me-1" role="button" >Timeline</span>
                    </div>
                    <div className="topbarIcons d-flex">
                        <div className="topbarIconItem me-3" role="button">
                            <PersonIcon />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem me-3" role="button">
                            <ChatIcon />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItem me-3" role="button">
                            <NotificationsIcon />
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <img src="/assets/Person/7.jpeg" alt="" className="topbarImg img-fluid mb-1" role="button"></img>
                </div>
                </Col>
            </Row>
            </div>
        )
}