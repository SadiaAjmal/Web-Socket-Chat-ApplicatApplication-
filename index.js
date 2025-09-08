const express = require('express');
const path = require("path")
const http = require("http");
const { Server } = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//handle socket io
io.on("connection", (socket) => {


    //taking message from client

    socket.on("user-message", (message) => {
        console.log("A new msg from user: ", message);

        //giving message of one client to others
        io.emit("message", message);
    });

});

app.use(express.static(path.resolve("./public")));


app.get("/", (req, res) => {
    return res.sendFile("/public/index.html")
});

server.listen(9000, () => {
    console.log(`server running at PORT 9000`);
});