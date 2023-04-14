import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join"
import socketIo from "socket.io-client"
import "./Chat.css"
import sendLogo from "../../images/send.png"
import closeIcon from "../../images/closeIcon.png"
import Message from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"


const ENDPOINT="http://localhost:8080"
let socket
const Chat = () => {
    const [id,setId]=useState("")
    const [messages,setMessages]=useState([])
const send=()=>{
   const message= document.getElementById("chatInput").value
    socket.emit('message',{message,id})
    document.getElementById("chatInput").value=""
}

useEffect(()=>{
    socket=socketIo(ENDPOINT,{transports:["websocket"]})
    socket.on('connect',()=>{
        alert('connected')
        setId(socket.id)
    })
    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
        setMessages([...messages,data])
console.log(data.user,data.message)
    })
    socket.on("userJoined",(data)=>{
        setMessages([...messages,data])
        console.log(data.user,data.message)
    })
    socket.on('leave',(data)=>{
        setMessages([...messages,data])
        console.log(data.user,data.message)
    })
    return()=>{
        socket.emit('disconnect')
        
        socket.off()
    }
},[])

useEffect(()=>{
    socket.on('sendMessage',(data)=>{
setMessages([...messages,data])
        console.log(data.user,data.message,data.id)
    })
    return ()=>{
        socket.off()
    }
},[messages])



  return (
    <div className='chatPage'>
    <div className='chatContainer'>
    <div className='header'>
        <h2>Friendz Chat</h2>
      <a href="/"> <img src={closeIcon} alt="close" /></a> 
    </div>
    <ReactScrollToBottom className='chatBox'>
    {messages.map((el,i)=>(
<Message message={el.message} classs={el.id===id?"right":"left"} user={el.id===id?'':el.user}  />
    ))}
    </ReactScrollToBottom>
    <div className='inputBox'>
        <input onKeyPress={(e)=>e.key==="Enter"?send():null} type='text' id='chatInput' />
        <button onClick={send} className='sendBtn'><img src={sendLogo} alt="send" /></button>
    </div>
    </div>
    
    </div>
  )
}

export default Chat