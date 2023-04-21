import { Server } from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        // adapt Next's net Server to http Server
        const httpServer = res.socket.server;
        const io = new Server(httpServer, {
            path: "/api/socketio",
            cors: {
                origin: process.env.ORIGIN,
                methods: ["GET", "POST"],
            },
        });

        // server side code
        io.sockets.on("connection", function (socket) {
            socket.on("room", function (room) {
                socket.join(room);
            });
        });

        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;
    }
    res.end();
};
