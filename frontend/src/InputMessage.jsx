import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { socket } from './Socket'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
function InputMessage({setMessages, changeScroll}) {
    const [message, setMessage] = useState('')
    const [randomId, setRandomId] = useState(0)
    
    const HandleSubmit = (e) => {
        e.preventDefault()
        if (!message) return
        const date = new Date()
        const hour = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
        const newMessage = {
            id: randomId,
            body: message,
            user: 'Me',
            time: hour
        }
        setMessages(state => [...state, newMessage])
        socket.emit('chat message', {
            body: message, 
            time: hour
        })
        setMessage('')
        changeScroll()
        setRandomId(randomId => randomId + 1)
    }
    return (
        <form className='message-input-container' onSubmit={HandleSubmit}>
            <input type="text" placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className='btn-send'>{<FontAwesomeIcon icon={faShare} />}</button>
        </form>
    )
}

export default InputMessage;