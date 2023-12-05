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
import './Chat.css'

const Chat = ({ room, displayName, displayImage }) => {
  //new msg
  const [newMessage, setNewMessage] = useState("");
  //message ref for addDoc(ref,{data})
  const messageRef = collection(db, "chats");

  //all messages
  const [messages, setMessages] = useState([]);

  //scroll to down
  const scroll=useRef()
  
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
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage === "") return alert("Enter a message");
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: displayName,
      room,
      displayImage,
      uid:auth.currentUser.uid

    
      
    });
    setNewMessage("");
    scroll.current.scrollIntoView({behaviour:'smooth'})
  };

  return (
    <>
        <h2 className="roomName">Welcome To :{room.toUpperCase()}</h2>
      {/* total messages */}

        <div className="msgs">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div
              key={msg.id}
              className={`msg ${msg.uid === auth.currentUser.uid ? "sent" : "received"}`}>
              <img alt="" src={msg.displayImage} />
              <p className="text"> {msg.text}</p>
            </div>
          </div>
        ))}
        </div>
       
       {/* scroll default */}
      <div ref={scroll}></div>

      {/* send message  */}
      <div className="send-msg-div">
        <form onSubmit={handleSendMessage}>
          <input
            className="send-msg"
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="msg-send-btn" type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default Chat;
