import React from 'react'
import {useNavigate} from 'react-router-dom'
import './MailSended.css'
const MailSended = () => {
    const history=useNavigate()
    const handleBackToSignIn=()=>{
        history('/')
    }
  return (
    <div className='mailDiv'>
        <div className='mailContent'>
        <h2 style={{color:"green",margin:"0px"}}>Mail Sended Successfully</h2>
        <p className='paragraph'>Check Your Entered Mail Address</p>
        <button className='BackTo-SignIn-btn' onClick={()=>handleBackToSignIn()}>Back to Sign In</button>
        </div>
      
    </div>
  )
}

export default MailSended
