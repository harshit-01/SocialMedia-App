import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css"
import {Col,Row} from "react-bootstrap"
const Home = ()=>{
    return(
        <>
            <Topbar />
            <div className="homeContainer d-flex">
                <Col xs={3}>
                    <Sidebar />
                </Col>
                <Col md={5}>
                    <Feed />
                </Col>
                <Col md={4}>
                    <Rightbar />
                </Col>
            </div>
        </>
    )
}
export default Home;