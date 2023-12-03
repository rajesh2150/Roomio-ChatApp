import React from 'react'
import { auth } from '../../Firebase/Firebase'
const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>{auth?.currentUser?.email}</p>
    </div>
  )
}

export default Home
