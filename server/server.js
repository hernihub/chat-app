const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', {from: 'admin', text: 'welcome to the chat app'})
    socket.broadcast.emit('newMessage', {from: 'admin', text: 'new user joined', 
                                         createdAt: new Date().getTime()});
    // socket.emit('event', {}); // Emits an event to a single connection
    socket.on('createMessage', (message) => {
        console.log('create message', message);
        io.emit('newMessage', { // Emits an event to every single connection
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', { // Emits the event to everyone but this
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
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