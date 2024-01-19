const path = require("path");
const socket = require("socket.io");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const server = app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log(`socket connected ${socket.id}`);

  socket.on("chat", (data) => {
    console.log(data);
    io.sockets.emit('chat2', data);
  });
  
  socket.on('writing', (data) => {
    socket.broadcast.emit('writing2', data);
  });

});
