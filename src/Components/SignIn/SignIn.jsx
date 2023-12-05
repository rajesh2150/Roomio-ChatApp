import React, { useState } from 'react'
import {NavLink} from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth,faceBookAUth,googleAuth,twitterAuth } from '../Firebase/Firebase';
import './SignIn.css'
import {
  FaUser,
  FaLock,
} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { signInWithPopup} from 'firebase/auth';
const SignIn = () => {
  const history=useNavigate()
  const [userMail,setUserMail]=useState('')
  const [password,serPassword]=useState('')
  const [error,setError]=useState('')

const handleSignIn=async()=>{
  try{
    if(userMail && password) {
      await signInWithEmailAndPassword(auth,userMail,password);
      history('/home')
    }
    else{
      setError('Enter Valid Mail/Password')

    }
  }
  catch(err){
    console.log(err)
    setError(err.code)
  }

}
const handleSignUpUsingGoogleAuth=async()=>{
  try{
    console.log('selected google auth')
    await signInWithPopup(auth,googleAuth)
    history('/home')

  }
  catch(err){
    console.log(err)
  }
}
const handleSignUpUsingTwitterAuth=async()=>{
  try{
    console.log('selected Twitter auth')
    await signInWithPopup(auth,twitterAuth)
    history('/home')

  }
  catch(err){
    console.log(err)
  }
}
const handleSignUpUsingFaceBookAuth=async()=>{
  try{
    console.log('selected FaceBook auth')
    await signInWithPopup(auth,faceBookAUth)
    history('/home')

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
      {error && <p style={{color:"red",margin:"2px"}}>{error}</p>}
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
          <input type="password" className="SignIn-password" placeholder="Password" onChange={(e)=>serPassword(e.target.value)}  />
        </div>
        <div className='forgot-password-div'>
          <NavLink to={'/forgotPassword'} className='forgot-password-link'>Forgot Password?</NavLink>
        </div>
        <button onClick={()=>handleSignIn()} className="SignIn-btn" >Sign In</button><br/>
        <span className="Or-SignIn">Or Sign In Using</span>
        <div className="Login-Apps-Div signIn-Auth">

          {/* FaceBook */}
          <svg
            onClick={()=>handleSignUpUsingFaceBookAuth()}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            viewBox="0 0 48 48">
            <path
              fill="#039be5"
              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
            <path
              fill="#fff"
              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
          </svg>

          {/* Twitter */}
          <svg
          onClick={()=>handleSignUpUsingTwitterAuth()}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="35"
            viewBox="0 0 50 50">
            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
          </svg>

          {/* Google */}
          <svg
          onClick={()=>handleSignUpUsingGoogleAuth()}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="34"
           
            viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
        </div>
        <br/>
        <i>Don't have a account?</i>{' '}
        <NavLink to={'/SignUp'} className="NavLink">Sign Up</NavLink>
    </div>
  )}

export default SignIn
