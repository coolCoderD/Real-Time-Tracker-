const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("send-location", (data) => {
        const locationData = { id: socket.id, ...data };
        console.log("Location data received:", locationData); // Log received data
        io.emit("receive-location", locationData);
    
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
        console.log("user disconnected")
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => { 
    console.log("Listening on port 3000"); 
});
