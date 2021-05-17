const express = require('express');
const http = require('http');
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });
var ddb = new AWS.DynamoDB();

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

var socketholder = {};

app.use(require('cors'))

server.listen(port, () => {
    console.log('socket listening on *' + port);
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
        ddb.putItem({
            TableName: 'Coldgate',
            Item: { 'from:to': { S: `${socket.onit}€${msg.to}` }, 'when': { N: Date.now().toString() }, 'body': { S: msg.content } }
        }, function(err, data) { if (err) console.log("Error", err); });
        if (socketholder[msg.to]) io.to(socketholder[msg.to]).emit('new msg', { from: socket.onit, content: msg.content });
    });
});

io.on('connection', (socket) => {
    socket.on('histo', (msg) => {
        console.log(`${socket.onit} wants histo with ${msg.with} from ${msg.from} to ${msg.to}`);
        // db get
    });
});