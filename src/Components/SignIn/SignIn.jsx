import React, { useState } from 'react'
import {NavLink} from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import './SignIn.css'
import {
  FaUser,
  FaLock,
} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

const SignIn = () => {
  const history=useNavigate()
  const [userMail,setUserMail]=useState('')
  const [password,serPassword]=useState('')
const handleSignIn=async()=>{
  try{
    if(userMail && password) {
      await signInWithEmailAndPassword(auth,userMail,password);
      history('/home')
    }
  }
  catch(err){
    console.log(err)
  }

}
  return (
    <div className="signup-div">
      <div className='signup-heading-div'>
        <h2>Sign In</h2>
      </div>
      <div className="SignDiv">
          <span className="span">
            <FaUser size={15} />
          </span>
          <input className="SignIn-input" type="text" placeholder="Email" onChange={(e)=>setUserMail(e.target.value)} />
        </div>
        <div className="SignDiv-Password">
          <span className="span">
            <FaLock />
          </span>
          <input type="text" className="SignIn-password" placeholder="Password" onChange={(e)=>serPassword(e.target.value)}  />
        </div>
        <div className='forgot-password-div'>
          <NavLink className='forgot-password-link'>Forgot Password?</NavLink>
        </div>
        <button onClick={()=>handleSignIn()} className="SignIn-btn" >Sign In</button><br/>
       
        <span className="Or-SignUp">Or Sign Up Using</span><br/>
        <br/>
        <NavLink to={'/'} className="NavLink">Sign Up</NavLink>
    </div>
  )}

export default SignIn
