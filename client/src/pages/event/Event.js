import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css"
// import events from "./events"
import {Modal,Form,Button} from 'react-bootstrap';
import axios from "axios"
import {AuthContext} from "./../../context/AuthContext"
import {Link} from "react-router-dom"
const localizer = momentLocalizer(moment)


const events = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(),
    'end': new Date()
  },
  {
    'title': 'Long Event',
    'start': new Date(2021, 3, 7),
    'end': new Date(2021, 3, 10)
  },
]

export default function Events (props){
  const [isOpen,setIsOpen] = React.useState(false)
  const [start,setStart] = React.useState("");
  const [end,setEnd] = React.useState("");
  const [title,setTitle] = React.useState("");
  const {user,dispatch} = React.useContext(AuthContext);
  const onSubmit = () => {
    console.log(title,start,end);
  };
  const [ev,setEv] =React.useState([]);
  const [Users,setUsers] = React.useState({});
  const url = "http://localhost:5000/api";
  const updUser = async()=>{
    const res = await axios.put(url +`/users/6196897fe7209080cd5bce71/events`,
    {'title':title,"start":start,"end":end})
    return res;
  }
    useEffect(()=>{
        const fetchUser = async(title,start,end)=>{
        const res = await axios.get(url +`/users?userId=6196897fe7209080cd5bce71`)
        setUsers(res.data);
        // console.log(res.data,Users._id)
        return res;
    }
      fetchUser()

  },[])
  React.useEffect(()=>{
      if(Users && Users.title && Users.title.length>0){
        events.push({'title':Users.title[Users.title.length-1],'allDay': true,"start":new Date(Users.start[Users.start.length-1]),"end":new Date (Users.end[Users.end.length-1])});
        setEv(events)
      }
      setEv(events)
  },[Users,Users.title,ev])
  // console.log(ev)
  return (
  <div>
    <h3 className="text-center text-primary fw-bold">Event Calender</h3>
    <Button className="m-2" variant="primary" style={{
                color:"white",textDecoration:"none"
            }}>
            <Link to="/" style={{
                color:"white",textDecoration:"none"
        }}>Move Back to Home Page </Link></Button>
    <Button variant="primary" className="m-2" onClick={()=>{
      setIsOpen(true)
    }}>Add Event</Button>
    {isOpen? <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title}
          onChange={e => { setTitle(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStart">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" placeholder="Enter start time" value={start}
          onChange={e => {setStart(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEnd">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" placeholder="Enter end time" value={end}
          onChange={e => {setEnd(e.target.value) }}/>
          </Form.Group>

          <Button variant="primary" type="submit"  onClick={(e)=>{
            // debugger;
            if(title){
              updUser(title,start,end);
            }
            onSubmit()}}>
            Submit
          </Button>
        </Form>
        </Modal.Body>
      </Modal.Dialog>:null}
    <Calendar
      localizer={localizer}
      events={ev}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      tooltipAccessor={"day"}
      defaultView={"day"}
    />
  </div>
  )
}

