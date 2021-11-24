import {Modal,Button,Badge} from "react-bootstrap"
import CelebrationIcon from '@mui/icons-material/Celebration';
const Example = ({show,handleShow,handleClose})=>{
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">Happy Birthday <CelebrationIcon htmlColor="goldenrod" fontSize="large"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            May God bless you with health,wealth and prosperity in life. We hope you achieve everything you desire for. Here is a small gift from our side too. 
            <div>Enjoy <Badge bg="success" className="fs-6">Free</Badge> lunch/dinner at 5 star Hotel Divein. Its on us 😊 . Coupon details will be sent to you soon via SMS.<br />
            Hotel <a href="https://harshit-01.github.io/Multipage-Website-using-Bootstrap"
            style={{textDecoration: 'none'}}>Divein</a></div>
            <p className="text-danger fs-6">*Please keep in mind that this coupon is only valid till today.</p>
          </Modal.Body>
        </Modal>
      </>
    )};
export default Example;
  
