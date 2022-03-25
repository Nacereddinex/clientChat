
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from "./Chat"


const socket = io.connect("http://localhost:3001")

function App() {

  const [name,setName] = useState("")
  const [room,setRoom] = useState("")
  const [showChat,setShowChat]=useState(false)
  const join =()=>{
    if(name !== "" && room !==""){
      socket.emit("join_room",room)
      setShowChat(!showChat)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainer'>
      <h1> Join A Chat </h1>
      <input type="text" placeholder='Tim...' onChange={(e)=>(setName(e.target.value))}/>
      <input type="text" placeholder='Room ID .. ' onChange={(e)=>(setRoom(e.target.value))}/>
      <button onClick={join}> Join a Room</button>
    </div>) :

       (<Chat socket={socket} name={name} room={room}/>)
      }
    </div>


  );
}

export default App;
