const express = require("express");
const cors = require("cors");

const { authRouter } = require("./routes/userRoutes");
const { bugRouter } = require("./routes/bugRoutes");
require("./db/connection");
const socketIO = require("socket.io");
const socketServer = socketIO(8080, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/users", authRouter);
app.use("/api", bugRouter);

socketServer.on("connection", socket => {
    socket.on("addUser", userId => {
        socket.userId = userId;
    });

    socketServer.emit("getUsers", socket.userId);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
