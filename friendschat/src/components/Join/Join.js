import React from 'react'
import "./Join.css"
import logo from "../../images/logo.png"
const Join = () => {
  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt='logo' />
        <h1>Friendz Chat</h1>
        <input placeholder='Enter Your Name' type='text' id='joinInput' />
        <button className='btn'>Log in</button>
      </div>

    </div>
  )
}

export default Join