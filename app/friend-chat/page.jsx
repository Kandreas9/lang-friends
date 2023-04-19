"use client";

import { useState, useEffect } from "react";
import Send from "@/components/images/send";
import { useSession } from "next-auth/react";
import FriendSidebar from "@/components/friendSidebar";
import { io } from "socket.io-client";
import ChatMessage from "@/components/chats/chatMessage";

let socket;

export default function FriendChat() {
    const { data: session, status } = useSession();

    const [connected, setConnected] = useState(false);
    const [friend, setFriend] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [friends, setFriends] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const toggleFriendSidebar = (bool) => {
        setIsSidebarOpen(bool);
    };

    const handleFriendId = (friend) => {
        setFriend(friend);
    };

    const getFriends = async () => {
        const res = await fetch(
            `http://localhost:3000/api/user/getFriends/${session.user.id}`,
            {
                cache: "no-store",
                method: "get",
            }
        );

        const obj = await res.json();

        setFriends(obj.friends);
    };

    useEffect(() => {
        if (session?.user && !friend) {
            getFriends();
        }
    }, [session]);

    useEffect(() => {
        if (friend) {
            socketInitializer();
        }
        console.log(friend);
        // socket disconnet onunmount if exists
        if (socket) return () => socket.disconnect();
    }, [friend]);

    const socketInitializer = async () => {
        socket = io(process.env.BASE_URL, {
            path: "/api/socketio",
            cache: "no-store",
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        // log socket connection
        socket.on("connect", () => {
            console.log("socket connected!", socket.id);
            setConnected(true);
            socket.emit("room", session.user.id);
        });

        // update chat on new message dispatched
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
    };

    const sendMessage = async () => {
        if (message && friend && connected) {
            // build message obj
            const msg = {
                message,
                side: "right",
                user_id: session.user.id,
            };

            // dispatch message to other users
            const resp = await fetch("/api/chat", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: msg,
                    rooms: [friend.id, session.user.id],
                }),
            });
            const res = await fetch("/api/messages/send", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: msg,
                }),
            });

            console.log(resp);
            // reset field if OK
            if (resp.ok) setMessage("");
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div className="mx-auto h-full pb-[15px] px-[25px] flex flex-col pt-[35px] neo-main rounded-[35px] relative">
            <div className="w-[280px] flex-none h-[85%] gap-[1rem] flex flex-col overflow-y-auto p-[1rem]">
                {messages.map((el, index) => {
                    return (
                        <ChatMessage key={index} side={el.side}>
                            {el.message}
                        </ChatMessage>
                    );
                })}
            </div>

            <label className="relative h-[10%]">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="py-[4px] px-[8px] w-full h-[60px] rounded-[55px] neo-inner"
                />
                <button
                    onClick={sendMessage}
                    className="flex justify-center items-center w-[30px] h-[30px] rounded-full absolute right-[20px] top-1/2 translate-y-[-50%] neo-secondary"
                >
                    <Send></Send>
                </button>
            </label>

            {isSidebarOpen && friends && (
                <div>
                    <ul className="flex py-[2rem] flex-col absolute top-0 left-0 h-full w-full bg-neo rounded-[35px]">
                        {friends.map((friend) => {
                            return (
                                <FriendSidebar
                                    handleFriendId={handleFriendId}
                                    toggleFriendSidebar={toggleFriendSidebar}
                                    friend={friend}
                                    key={friend.friend_id}
                                ></FriendSidebar>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
