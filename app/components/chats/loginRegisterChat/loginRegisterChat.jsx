"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

import ChatMessage from "@/components/chats/chatMessage";
import Send from "@/components/images/send";

export default function LoginRegisterChat() {
    const [type, setType] = useState("login");
    const [inputOrder, setInputOrder] = useState([
        "loginRegister",
        "email",
        "password",
        "terms",
    ]);
    const [orderIndex, setOrderIndex] = useState(0);
    const [messages, setMessages] = useState([
        {
            side: "left",
            text: "Do you wanna login or register (input login or register)",
        },
    ]);
    const [values, setValues] = useState({
        email: "",
        password: "",
        terms: false,
    });

    // useEffect(() => {
    //     console.log("test");
    // });

    const handleInputChange = (e, inputType) => {
        switch (inputType) {
            case "loginRegister":
                setType(e.target.value);
                break;
            case "email":
                setValues({ ...values, email: e.target.value });
                break;
            case "password":
                setValues({ ...values, password: e.target.value });
                break;
            case "terms":
                setValues({ ...values, terms: e.target.checked });
                break;
        }
    };

    const handleSubmit = async () => {
        switch (inputOrder[orderIndex]) {
            case "loginRegister":
                setMessages([
                    ...messages,
                    { side: "right", text: `Login please.` },
                    { side: "left", text: "Please input your email." },
                ]);
                break;
            case "email":
                setMessages([
                    ...messages,
                    { side: "right", text: `${values.email}` },
                    { side: "left", text: "Please input your password." },
                ]);
                break;
            case "password":
                setMessages([
                    ...messages,
                    {
                        side: "right",
                        text: `${"*".repeat(values.password.length)}`,
                    },
                    {
                        side: "left",
                        text: "You can only use this app if you are over 18. Do you agree with our terms?",
                    },
                ]);
        }

        if (inputOrder.length - 1 === orderIndex) {
            if (type === "login" && values.terms) {
                const result = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });
            } else if (type === "register" && values.terms) {
                const res = await fetch("/api/register", {
                    cache: "no-store",
                    method: "POST",
                    body: JSON.stringify(values),
                });
                const json = await res.json();

                if (json.result?.email) {
                    const result = await signIn("credentials", {
                        redirect: false,
                        email: json.result.email,
                        password: values.password,
                    });
                } else {
                    setMessages([
                        ...messages,
                        { side: "left", text: json.message },
                    ]);
                }
            }
        } else {
            setOrderIndex(orderIndex + 1);
        }
    };

    return (
        <div className="mx-auto pb-[15px] px-[25px] flex flex-col pt-[35px] neo-main rounded-[35px]">
            <div className="w-[280px] flex-none h-[80%] gap-[1rem] flex flex-col overflow-y-auto p-[1rem]">
                {messages.map((el) => {
                    return (
                        <ChatMessage key={el.text} side={el.side}>
                            {el.text}
                        </ChatMessage>
                    );
                })}
            </div>
            <label className="relative flex-1 h-[100%]">
                {inputOrder[orderIndex] != "terms" ? (
                    <input
                        value={
                            inputOrder[orderIndex] === "email"
                                ? values.email
                                : inputOrder[orderIndex] === "password"
                                ? values.password
                                : type
                        }
                        onChange={(e) =>
                            handleInputChange(e, inputOrder[orderIndex])
                        }
                        className="py-[4px] px-[8px] w-full h-full rounded-[55px] neo-inner"
                        type={`${
                            inputOrder[orderIndex] === "loginRegister"
                                ? "text"
                                : inputOrder[orderIndex] === "email"
                                ? "email"
                                : inputOrder[orderIndex] === "password"
                                ? "password"
                                : inputOrder[orderIndex] === "terms"
                                ? "checkbox"
                                : "text"
                        }`}
                    />
                ) : (
                    <input
                        checked={values.terms}
                        onChange={(e) =>
                            handleInputChange(e, inputOrder[orderIndex])
                        }
                        className="py-[4px] px-[8px] w-full h-full rounded-[55px] neo-inner"
                        type={`${
                            inputOrder[orderIndex] === "loginRegister"
                                ? "text"
                                : inputOrder[orderIndex] === "email"
                                ? "email"
                                : inputOrder[orderIndex] === "password"
                                ? "password"
                                : inputOrder[orderIndex] === "terms"
                                ? "checkbox"
                                : "text"
                        }`}
                    />
                )}
                <button
                    onClick={handleSubmit}
                    className="flex justify-center items-center w-[30px] h-[30px] rounded-full absolute right-[20px] top-1/2 translate-y-[-50%] neo-secondary"
                >
                    <Send></Send>
                </button>
            </label>
        </div>
    );
}
