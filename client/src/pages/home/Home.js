import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css"
import {Col} from "react-bootstrap";
const Home = ()=>{
    return(
        <>
            <Topbar />
            <div className="homeContainer d-flex mt-2">
                <Col md={8} className="feedHome">
                    <Feed />
                </Col>
                <Col md={4} className="d-flex mt-2">
                    <Rightbar className="feedRightbar"/>
                </Col>
            </div>
        </>
    )
}
export default Home;