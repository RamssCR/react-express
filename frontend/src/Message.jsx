import { useState } from "react"
import { socket } from './Socket';

// eslint-disable-next-line react/prop-types
function Message({id, body, user, time, reference}) {
    const [opacity, setOpacity] = useState('0')
    return (
        <div ref={reference} id={id} className={`message-template ${user == "Me" ? user : "users"}`} onMouseOut={() => {setOpacity('0')}} onMouseOver={() => {setOpacity('1')}}>
            <div className="user-options">
                <span className="username">{user}</span>
                <button className="delete" style={{opacity: opacity}} onClick={() => {
                    console.log(id)
                    socket.emit('delete message')
                }}>x</button>
            </div>
            <span className="message">{body}</span>
            <span className="hour">{time}</span>
        </div>
    )
}

export default Message