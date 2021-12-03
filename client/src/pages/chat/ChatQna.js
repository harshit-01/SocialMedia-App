import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import {Link} from "react-router-dom"
import {Button} from "react-bootstrap"
import 'react-chat-widget/lib/styles.css';
import "./chat.css"


export default function Chat(){
    React.useEffect(() => {
        addResponseMessage('Welcome to this **awesome** chat! hello');
        addResponseMessage('This is a paid service. Only premium user can access it.');
      }, []);
    
      const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
      };
    
        return (
          <div >
            <Button className="m-1" variant="link" size="sm" style={{
                color:"white",textDecoration:"none"
            }}>
            <Link to="/" style={{
                color:"blue",textDecoration:"none"
            }}>Move Back to Home Page </Link></Button>
            <Widget
              handleNewUserMessage={handleNewUserMessage}
              // profileAvatar="A"
              title="Chat functionality"
              subtitle="QNA"
              // fullScreenMode="true"
            />
          </div>
        );
}