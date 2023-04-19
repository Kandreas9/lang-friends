export default (req, res) => {
    if (req.method === "POST") {
        // get message
        const { message, rooms } = req.body;

        // dispatch to channel "message"
        // res?.sockets?.in(rooms[0])?.emit("message", message);

        res?.socket?.server?.io
            ?.to(rooms[0])
            ?.to(rooms[1])
            ?.emit("message", message);

        // return message
        res.status(201).json(message);
    }
};
