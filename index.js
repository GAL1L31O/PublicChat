const express = require('express');
const SocketIO = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/public'))

const server = app.listen(process.env.PORT);

const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('New connection!', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('server:chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('server:chat:typing', data);
    });
});