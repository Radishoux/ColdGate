const express = require('express');
const http = require('http');
const path = require('path');
const port = 3001;
const bapp = express();
const fapp = express();


const server = http.createServer(bapp);
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });
var ddb = new AWS.DynamoDB();

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

var socketholder = {};

bapp.use(require('cors'))

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
            Item: { 'fromto': { S: `${socket.onit}€${msg.to}` }, 'when': { N: Date.now().toString() }, 'body': { S: msg.content } }
        }, function(err, data) { if (err) console.log("Error", err); });
        if (socketholder[msg.to]) io.to(socketholder[msg.to]).emit('new msg', { from: socket.onit, content: msg.content });
    });
});

io.on('connection', (socket) => {
    socket.on('histo', (msg) => {
        console.log(`${socket.onit} wants histo with ${msg.with} from ${msg.from} to ${msg.to}`);
        // db get

        var pft = {
            ExpressionAttributeValues: { ':ft': { S: `${socket.onit}€${msg.with}` } },
            KeyConditionExpression: "fromto = :ft",
            TableName: 'Coldgate'
        };

        ddb.query(pft, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("il a recu " + `${socket.onit}€${msg.with}`)
                socket.emit('histofrom', { msgs: data.Items })

                data.Items.forEach(function(element, index, array) {
                    console.log(element.body.S + " (" + element.when.N + ")");
                });
            }
        });

        var ptf = {
            ExpressionAttributeValues: { ':ft': { S: `${msg.with}€${socket.onit}` } },
            KeyConditionExpression: "fromto = :ft",
            TableName: 'Coldgate'
        };

        ddb.query(ptf, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("il a envoyé " + `${msg.with}€${socket.onit}`);
                socket.emit('histoto', { msgs: data.Items })
                data.Items.forEach(function(element, index, array) {
                    console.log(element.body.S + " (" + element.when.N + ")");
                });
            }
        });

    });
});

fapp.use(express.static(path.join(__dirname, '../build')));


fapp.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

fapp.listen(8080);