import { socket } from './Socket'
import Message from './Message'
import InputMessage from './InputMessage'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {
  //id: mQwEgIYrC8amoyns
  //name: ramsscr

  // Declaring state vars to storage the messages
  const [messages, setMessages] = useState([])
  const [counter, setCounter] = useState(0)
  const scrollDown = useRef(null)
        
  const changeScroll = () => scrollDown.current && scrollDown.current.scrollIntoView({ behavior: 'smooth'})

  // Receiving information from the server's emission
  useEffect(() => {
    // storaging messages received from 'chat message' emission
    socket.on('chat message', (msg) => {
      setMessages(prevState => [...prevState, msg])
    })

    // storaging amount of people connected from 'counter' emission
    socket.on('counter', (number) => {
      setCounter(number)
    })

    socket.on('delete message', (id) => {
      setMessages([...messages.filter(msg => msg.id === id)])
    })

    // preventing messages duplication
    return () => socket.off('chat message')
  }, [messages])

  return <>
      <div className="user-counter">
        <i><FontAwesomeIcon icon={faUser} /></i>
        <span className="counter">{counter}</span>
      </div>
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((msg, index) => <Message key={index} id={msg.id} body={msg.body} time={msg.time} user={msg.user === 'Me' ? 'Me' : msg.user} reference={scrollDown} />)}
        </div>
        <InputMessage setMessages={setMessages} changeScroll={changeScroll}/>
      </div>
  </>
}

export default App
