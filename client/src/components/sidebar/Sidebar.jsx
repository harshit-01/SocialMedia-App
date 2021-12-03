import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import GroupsIcon from '@mui/icons-material/Groups';
import Work from '@mui/icons-material/Work';
import Question from '@mui/icons-material/QuestionAnswer';
import Event from '@mui/icons-material/Event';
import Bookmark from '@mui/icons-material/Bookmark';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link ,useHistory} from "react-router-dom"
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {AuthContext} from "./../../context/AuthContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SwipeableTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const {user,dispatch} = React.useContext(AuthContext);
  const handleClick = () => {
    setOpen(true);
  };
  const username =sessionStorage.getItem('user')?sessionStorage.getItem('user'):null;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const history = useHistory()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    const key = event.button;
    if(key !=undefined && (key == 0 || key == 1 )){
        setState({ ...state, [anchor]: open });
    }
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 300,
        backgroundColor: 'info.dark',
    }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <span className="ms-2 my-2" style={{color:"floralwhite",fontSize:"22px"}}>Sidebar</span>
    <span style={{float: 'right',color:"white"}} className="me-2 mt-1"><CloseIcon role="button"/></span>
    <Divider />
      <List  sx={{
        width: 300,
    }} style={{backgroundColor:"white"}}>
          <ListItem button key={"Posts"} style={{borderBottom:"1px solid lightgray"}} 
          onClick={()=>{
            history.push('/');
          }}
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <RssFeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Posts"} />
          </ListItem>
          <Link to="/qna" className="d-flex" style={{color:"black",textDecoration:"none"}}>
          <ListItem button key={"QNA"} style={{borderBottom:"1px solid lightgray",}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={"QNA"} />
          </ListItem></Link>
          <ListItem button key={"Videos"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }} onClick = {()=>{
            toast.info('This service is only available for premium users', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme:"colored"
              });
        }}>
            <ListItemIcon>
                <VideoCallIcon />
            </ListItemIcon>
            <ListItemText primary={"Videos"} />
          </ListItem>
          <Link to={`/profile/${username}`} className="d-flex" style={{color:"black",textDecoration:"none"}}>
          <ListItem button key={"Groups"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }} >
          {/* onClick={handleClick}> */}
            <ListItemIcon>
                <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary={"Groups(Friends)"} />
          </ListItem></Link>
          <Link to={`/event`} className="d-flex" style={{color:"black",textDecoration:"none"}}>
          <ListItem button key={"Work/Event"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <Work />
            </ListItemIcon>
            <ListItemText primary={"Work/Event"} />
          </ListItem></Link>
          <ListItem button key={"Chat"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }} onClick = {()=>{
            toast.info('This service is only for premium users', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme:"colored"
              });
        }}>
            <ListItemIcon>
                <Question />
            </ListItemIcon>
            <ListItemText primary={"Chat"} />
          </ListItem>
          {/* <ListItem button key={"Events"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <Event />
            </ListItemIcon>
            <ListItemText primary={"Events"} />
          </ListItem> */}
          <Link to="/courses" className="d-flex" style={{color:"black",textDecoration:"none"}}>
          <ListItem button key={"Latest Courses Info"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <LocalLibrary />
            </ListItemIcon>
            <ListItemText primary={"Latest Courses Info"} />
          </ListItem></Link>
          <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
          <Divider />
      </List>
    </Box>
  );

  return (
    <div className="sidebar me-3">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Tooltip title="Open sidebar" arrow>
                <Button onClick={toggleDrawer(anchor, true)} style={{color:"black",textDecoration:"none"}} variant="outlined" className="my-1 mx-1 border border-dark" size="small">
                    <MenuIcon fontSize="inherit"/>
                </Button>
            </Tooltip>
          <SwipeableDrawer
             variant="temporary"
             ModalProps={{
               keepMounted: true,
             }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
          {open ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
          anchorOrigin={{ vertical:"top", horizontal:"right" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Currently, you are not a part of any group.
        </Alert>
      </Snackbar>:null}
        </React.Fragment>
      ))}
    </div>
  );
}
