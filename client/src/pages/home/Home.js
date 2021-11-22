import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css"
import {Col} from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar"

const Home = ()=>{
    return(
        <>
            <Topbar />
            <div className="homeContainer d-flex">
                <Col md={8} className="d-flex">
                    <Sidebar/>
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