import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import moment from 'moment';
import "./messages.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import EditNoteIcon from '@mui/icons-material/EditNote';
import TextField from "@mui/material/TextField";
import MessageThread from '../../components/messages/MessageThread';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Messages = () => {
    const { currentUser } = useContext(AuthContext);
    const [inputText, setInputText] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(0);
    const [selectedUsername, setSelectedUsername] = useState("");
    const maxLength = 100;

    const { isLoading, error, data } = useQuery({
      queryKey: ["user"],
      queryFn: () => makeRequest.get("/users/").then((res) => res.data),
    });

    const getUserList = () => {
      if (error) {
        // Handle the error case
        console.error("Error fetching user data:", error);
        return null;
      }
    
      if (!isLoading && data) {
        const filteredUsers = data.filter((user) => user.username.includes(inputText));
        
        return (
          filteredUsers.slice(0, 5).map((user) => 
            <div key={user.id} className="user" onClick={() => setSelectedUser(user.id)}>
              <img className="small-img" src={user.profilePic} alt={`${user.username}'s profile`} />
              <div className="info">
                <span className="username">{user.username}</span>
              </div>
            </div>
          )
        );
      }
    
      // Handle the case when isLoading is true or data is not available
      return null;
    };
  
    const { isLoading: isMLoading, error: mError, data: mData } = useQuery({
      queryKey: ["allMessages"],
      queryFn: () => makeRequest.get("/messages/all").then((res) => res.data),
    });

    if (isLoading) {
      return "Loading...";
    }
  
    let inputHandler = (e) => {
      // convert input text to lowercase
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
    
    const handleChange = (id, name) => {
      setSelectedUsername(name);
      setSelectedUser(id);
    };

    return (
      <div className="messages">
        <div className="message-list">
          <div className="top">
            <h3>Messages</h3>
            <button onClick={() => setSearchVisible(!searchVisible)}>
              <EditNoteIcon style={{ color: "white" }} />
            </button>
          </div>
          {searchVisible && (
            <div className = "search-list">
              <div className="search">
                <TextField
                  id="outlined-basic"
                  onChange={inputHandler}
                  variant="outlined"
                  fullWidth
                  label="Search"
                />
              </div>
              { isLoading || !data ? "loading" : getUserList()}
            </div>
          )}
          
          {!mData &&
            <div className="user-msg">
              You have no messages. Click the maroon icon above to start a new conversation!
            </div>
          }
          {!isMLoading && mData &&
            mData.map((thread) => (
              <div key={thread.msg} className="conversation" onClick={() => handleChange(thread.user_id, thread.user_name)}>
                <div style={{display: "flex", gap: 20, alignItems: "center"}}>
                  <img src={thread.user_profile_pic} alt={`${thread.user_username}'s profile`} />
                  <div className="info">
                    <span className="username">{thread.user_username}</span>
                    <div className="preview">
                      <span style={{ fontWeight: (thread.latest_message_read == 0 && thread.latest_message_to == currentUser.id) ? 'bold' : 'normal' }}>{thread.latest_message_content.length > 100 ? `${thread.latest_message_content.substring(0, 100)}...` : thread.latest_message_content}</span>
                      <span className="date">{moment(thread.latest_message_time).fromNow()}</span>
                    </div>
                  </div>
                </div>
                {thread.latest_message_read == 0 && thread.latest_message_to == currentUser.id && <FiberManualRecordIcon style={{color: "red", marginRight: 15}} fontSize="small"/>}
              </div>
            ))}
        </div>
  
        {selectedUser !== 0 && <MessageThread key={selectedUser} user={selectedUser} name={selectedUsername} />}
      </div>
    );
  };
  
  export default Messages;
  
