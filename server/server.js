const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));
    // socket.emit('event', {}); // Emits an event to a single connection
    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);

        // Emits an event to every single connection
        io.emit('newMessage', generateMessage(message.from, message.text)); 
        // socket.broadcast.emit('newMessage', { // Emits the event to everyone but this
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        callback('this is the data inside our callback');
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

io.on('disconnection', (socket) => {
    console.log('user disconnected');
});

server.listen(port, () => {
    console.log('server is up on port ' + port);
});

console.log(__dirname + '/../public');
console.log(publicPath);