import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import './Chat.css';
import { FaArrowLeft } from 'react-icons/fa';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useNavigate } from "react-router-dom";
import { BsPaperclip } from "react-icons/bs";

const Chat = ({ room,setRoom, displayName, displayImage }) => {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "chats");
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (newMessage === "" && !file) return alert("Enter a message or select a file");

    let fileURL = null;
    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name + Date.now());
      const snapshot = await fileRef.put(file);
      fileURL = await snapshot.ref.getDownloadURL();
      setNewMessage("Click Send")
      }
 


    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: displayName,
      room,
      displayImage,
      uid: auth.currentUser.uid,
      url: fileURL,
    });

    setNewMessage("");
    setFile(null);
    setFileURL(null);
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate=useNavigate()

  const handleLeftArrow2 = () => {
    console.log('clicked');
    // navigate('/create')
    if(localStorage.getItem("user")){
      setRoom(null)
    }
    
    else{
      navigate('/')
    }
    

  };

  const handleFile = (fileEvent) => {
    console.log(fileEvent)
    setNewMessage("Click Send")
    setFile(fileEvent);
    scroll.current.scrollIntoView({behavior:"smooth"})
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // hh:mm format
    } else {
      return date.toLocaleDateString(); // Date format
    }
  };

  return (
    <div className="ChatDiv">
      <div className="roomInfoDiv">
        <FaArrowLeft onClick={handleLeftArrow2} className="backtoRoomID" size={20} />
        <h2 className="roomName"> {room}</h2>
        <div></div>
      </div>

      <div className="msgs">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div
              key={msg.id}
              className={`msg ${msg.uid === auth.currentUser.uid ? "sent" : "received"} ${msg.url ? "imageFile":""}`}>
              <img alt="profile" src={msg.displayImage} />
              <div className="userName-Text-Div">
                <i className={`userName-i ${msg.uid === auth.currentUser.uid ? "sender" : "receiver"}`}>
                  {msg.uid === auth.currentUser.uid ? "You" : msg.user}
                </i>
                {msg.url ? <img className="Imagefile-img" style={{borderRadius:0}} src={msg.url} alt="image" /> : <p className="text"> {msg.text}</p>}
                <i className="msg-time">{formatTimestamp(msg.createdAt)}</i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={scroll}></div>

      <div className="send-msg-div">
        <form onSubmit={handleSendMessage}>
          <input
            className="send-msg"
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <label className="File" htmlFor="file">
            <div className="fileUploadDiv">
              {/* <svg className="file-Label" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512">
                <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
              </svg> */}
              <BsPaperclip className="file-label" style={{paddingTop:5}}  size={25}/>
            </div>
          </label>
          <input onChange={(e) => { handleFile(e.target.files[0]) }} type="file" id="file" />
          <button className="msg-send-btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
