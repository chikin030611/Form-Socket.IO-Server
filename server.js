const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Header"],
      credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on("sendMsg", (msg) => {
        console.log(msg);
    });
    socket.on("log-response", data => {
        console.log("Name: " + data.name);
        console.log("Email: " + data.email);
        console.log("Age: " + data.age);
        console.log("Phone Number: " + data.phone_num);
        console.log("Date of Birth: " + data.dob);
        console.log("Address: " + data.address);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
