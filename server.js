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
    console.log('current number of users: ' + io.engine.clientsCount)
    io.emit('user connection', io.engine.clientsCount)

    socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log('current number of users: ' + io.engine.clientsCount)
        io.emit('user connection', io.engine.clientsCount)
    });

    socket.on("log-response", data => {
        console.log("Name: " + data.name);
        console.log("Phone Number: " + data.phoneNum);
        console.log("Email: " + data.email);
        console.log("Number of Persons: " + data.numOfPersons);
        console.log("Date: " + data.date);
        console.log("Time: " + data.time);
        console.log();
        io.emit("confirmation", data);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
