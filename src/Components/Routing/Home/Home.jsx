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
    localStorage.removeItem("user")
    console.log(localStorage.getItem("user"))
    history("/");
  };
  const roomInputRef=useRef()
  const [roomId,setRoomId]=useState(roomInputRef.current)
  const [room, setRoom] = useState(roomId);

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
 
  const navigate=useNavigate()
  
  if(localStorage.getItem(""))
  window.location.replace('/home')
 
 

  
 
  return (
    <div className="homeDiv">
      <div className="Main-Div">
        <div className="roomio-div">
          
          <h2 className="roomio-h2">Roomio</h2>
        </div>
        <div className="logout-div">
          <p className="p">{user ? user : auth?.currentUser?.email}</p>
          
          <img className="userImage" alt="profile" src={userImg ? userImg : "https://tse2.mm.bing.net/th?id=OIP.sbRjMD2zaP12rWg1bR1PDAHaHa&pid=Api&P=0&h=180}"} />
          <button className="logout-btn" onClick={() => handleSignOut()}>
            Log Out
          </button>
        </div>
      </div>
      {room ? (
        <Chat room={room} setRoom={setRoom}  displayName={displayName} displayImage={displayImage}/>
      ) : (
        // <CreateRoom roomId={roomId} setRoomId={setRoomId} room={room} setRoom={setRoom}/>
        <div className="roomDiv">
      
      <h2>Enter Room ID</h2>
        <input
          className="roomInput"
          type="text"
          placeholder="Enter/Create Room ID"
          ref={setRoomId}
        /><br/>
        <button className="enterChatBtn" onClick={()=>{room=="" ?alert("please Enter A Valid ID"):setRoom(roomId.value)}} type="submit">Enter Chat</button>
      </div>
        
      )}
    </div>
  );
};

export default Home;

export const CreateRoom=({roomId,setRoomId,room,setRoom})=>{
  return(
    <div></div>
  )
}