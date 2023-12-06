import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import Chat from "../Chat/Chat";
const Home = () => {
  
  const defaultImg =
    "https://tse1.mm.bing.net/th?id=OIP.c5KXw-wPcnwyyBNayoXfFQAAAA&pid=Api&P=0&h=180";
  const [userImg, setUserImage] = useState(null);

  const displayImage=auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : defaultImg
  const displayName=auth?.currentUser?.displayName ? auth?.currentUser?.displayName :auth?.currentUser?.email.substring(0,10)
  const [user, setUser] = useState("");
  const history = useNavigate();
  const handleSignOut = async () => {
    await signOut(auth);
    history("/");
  };
  const roomInputRef=useRef()
  const [room, setRoom] = useState(null);

  //messsage ref
  // const messageRef = collection(db, "chats");
  useEffect(() => {
    setUser(auth?.currentUser?.displayName);
    setUserImage(auth?.currentUser?.photoURL);
  }, [userImg]);
  // useEffect(()=>{
  //   // onSnapshot(messageRef,(snapshot)=>{
  //   //   console.log("")

  //   })

  // })

  //handle Send Message

 
  return (
    <>
      <div className="Main-Div">
        <div>
          
          <h2>Chat Connect</h2>
        </div>
        <div className="logout-div">
          <p className="p">{user ? user : auth?.currentUser?.email}</p>
          <img className="userImage" alt="profile" src={userImg ? userImg : displayImage} />
          <button className="logout-btn" onClick={() => handleSignOut()}>
            Log Out
          </button>
        </div>
      </div>
      {room ? (
        <Chat room={room} displayName={displayName} displayImage={displayImage}/>
      ) : (
        
        <div className="roomDiv">
        
        <h2>Enter Room ID</h2>
          <input
            className="roomInput"
            type="text"
            placeholder="Enter/Create Room ID"
            ref={roomInputRef}
          /><br/>
          <button className="enterChatBtn" onClick={()=>setRoom(roomInputRef.current.value)} type="submit">Enter Chat</button>
        </div>
      )}
    </>
  );
};

export default Home;
