import React from 'react'
import './message.css'

export default function Message({own}) {
  return (
    <div className={ own ? "message own" : "message"}>
      <div className="messageTop">
        <img className='messageImg' src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
        <p className='messageText'>Hello this is a message</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  )
}
