const express = require('express');
const http = require('http');
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

var socketholder = {};

app.use(require('cors'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../build/index.html');
});

server.listen(port, () => {
    console.log('listening on *' + port);
});

io.on('connection', (socket) => {
    socket.on('id socket', (u) => {
        socket.onit = u.attributes.email;
        socketholder[u.attributes.email] = socket.id;
        io.emit('whoco', socketholder);
        console.log(`${u.attributes.email} connected`);
    });
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log(`${socket.onit} disconnected`);
        delete socketholder[socket.onit]
        io.emit('whoco', socketholder);
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(`${socket.onit} to ${msg.to}: ${msg.content}`);
        if (socketholder[msg.to]) io.to(socketholder[msg.to]).emit('new msg', { from: socket.onit, content: msg.content });
        // save db
    });
});

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets