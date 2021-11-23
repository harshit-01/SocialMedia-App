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

export default function SwipeableTemporaryDrawer() {
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
          <ListItem button key={"Feed"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <RssFeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Feed"} />
          </ListItem>
          <ListItem button key={"Chat"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={"Chat"} />
          </ListItem>
          <ListItem button key={"Videos"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <VideoCallIcon />
            </ListItemIcon>
            <ListItemText primary={"Videos"} />
          </ListItem>
          <ListItem button key={"Groups"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary={"Groups"} />
          </ListItem>
          <ListItem button key={"Work"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <Work />
            </ListItemIcon>
            <ListItemText primary={"Work"} />
          </ListItem>
          <ListItem button key={"Questions"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <Question />
            </ListItemIcon>
            <ListItemText primary={"Questions"} />
          </ListItem>
          <ListItem button key={"Events"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <Event />
            </ListItemIcon>
            <ListItemText primary={"Events"} />
          </ListItem>
          <ListItem button key={"Bookmarks"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <Bookmark />
            </ListItemIcon>
            <ListItemText primary={"Bookmarks"} />
          </ListItem>
          <ListItem button key={"Courses"} style={{borderBottom:"1px solid lightgray"}} 
          sx={{
            '&:hover': {
              backgroundColor: 'info.light',
            },
          }}>
            <ListItemIcon>
                <LocalLibrary />
            </ListItemIcon>
            <ListItemText primary={"Courses"} />
          </ListItem>
          <Divider />
          {/* <Button onClick={()=>{
              setOpenBtn(!openBtn)
          }}>Show more</Button>
          {openBtn?
                <ul>
                    <li>
                        <img></img>
                        <span></span>
                    </li>
                </ul>:
          null} */}
      </List>
    </Box>
  );

  return (
    <div className="sidebar me-3">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Tooltip title="Open sidebar" arrow>
                <Button onClick={toggleDrawer(anchor, true)} style={{color:"black",textDecoration:"none"}} variant="outlined" className="my-1 mx-1" size="small">
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
        </React.Fragment>
      ))}
    </div>
  );
}
