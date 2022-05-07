import React from 'react'
import './conversation.css'

export default function Conversation() {
  return (
    <div className='conversation'>
        <img 
            className='conversationImg' 
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" 
            alt="mibjacket" />
        <span className='conversationName'>John Doe</span>
    </div>
  )
}
