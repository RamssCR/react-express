// Packages imports
import express from "express"
import { Server } from "socket.io"
import { createServer } from "node:http"
import { randomUUID } from 'node:crypto';

// Configurating the Socket server
//mongodb+srv://ramsscr:mQwEgIYrC8amoyns@messages.0xtcudo.mongodb.net/?retryWrites=true&w=majority&appName=messages
const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

let counter = 0

io.on('connection', socket => {
    // An user just connected (+1)
    io.emit('counter', ++counter)
    
    socket.on('chat message', (msg) => {
        // Broadcasting the message sent by the client
        const newMessage = {
            id: randomUUID(),
            ...msg,
            user: `user_${socket.id.slice(0, 6)}`
        }
        socket.broadcast.emit('chat message', newMessage)
    })

    socket.on('delete message', (id) => {
        io.emit('delete message', id)
    })

    socket.on('disconnect', () => {
        // An user just left (-1)
        io.emit('counter', counter < 1 ? 0 : --counter)
    })
})

// Declaring ports through enviroment process variables
const port = process.env.PORT ?? 2500

server.listen(port, () => console.log(`Server running on port http://localhost:${port}`))