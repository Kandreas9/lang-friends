import { useEffect, useRef } from "react";

export default function ChatMessage({ children, side }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div
            className={`w-[170px] rounded-t-[20px] rounded-br-[20px] text-white py-[14px] px-[10px] neo-chat-message ${
                side === "left" ? "mr-auto" : "ml-auto"
            }`}
        >
            {children}
            <div ref={messagesEndRef} />
        </div>
    );
}
