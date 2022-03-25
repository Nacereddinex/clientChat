import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
function Chat({socket,name,room}) {

    const [message,setMessage]= useState("")
    const [msgSent,setMsgSent]=useState([])
    const [msgrec,setMsgRec]=useState([])
//
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            setMsgRec(list=>[...list,data])
           
        })

    },[socket])
    const sendmsg= async()=>{
        if(message !==""){
            const messageData= {
                room:room,
                name:name,
                message:message,
                time:new Date(Date.now()).getHours()+ ": "+ new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData)
            setMsgRec(list=>[...list,messageData])
            setMessage("")
        }
    }
  return (
    <div className='chat-window'>
        <div className='chat-header'> <p> Live Chat</p></div>
        <div className='chat-body'>
            <ScrollToBottom className="message-container">
            {msgrec.map((content)=>(
               <div className='message' id={name!==content.name? "you":"other"}> 
                    <div>
                    <div className='message-content'>
                        <p> {content.message} </p>
                    </div>
                    <div className='message-meta'>
                        <p id="time">{content.time} </p> <></>
                        <p id="author">{content.name} </p>
                    </div>
                    </div>
               </div>
                 
            ))}
        </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" value={message} placeholder='...' onChange={(e)=>(setMessage(e.target.value)) } onKeyPress={(e)=>{e.key==="Enter" && sendmsg()}} />
            <button onClick={sendmsg}> &#9658; </button>
        </div>

    </div>
  )
}

export default Chat