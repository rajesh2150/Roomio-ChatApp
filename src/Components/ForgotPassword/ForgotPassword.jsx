import React, { useState } from "react";
import "./ForgotPassword.css";
import { auth } from "../Firebase/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const ForgotPassword = () => {
  const history = useNavigate();
  const [userValidMail, setUserValidMail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  //send link function
  const handleSendLink = async () => {
    console.log(userValidMail);
    try {
      if (!userValidMail) {
        setErrorMsg("Enter Valid Mail");
        return alert("Enter Valid Mail");
      }
      alert("Mail Sended");
      history("/mailSended");
      await sendPasswordResetEmail(auth, userValidMail);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLeftArrowBack=()=>{
    history('/')
  }
  return (
    <>
      <div className="leftArrow">
        <FaArrowLeft onClick={()=>handleLeftArrowBack()} />
      </div>
      <div className="forgot-Div">
        <h2>Forgot Your Password</h2>
        <p style={{ marginBottom: "10px" }}>Enter A Valid Email Address </p>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <input
          type="email"
          required
          className="forgot-email"
          placeholder="Enter Email"
          onChange={(e) => setUserValidMail(e.target.value)}
        />
        <br />
        <button className="Send_Link" onClick={() => handleSendLink()}>
          Send Link
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
