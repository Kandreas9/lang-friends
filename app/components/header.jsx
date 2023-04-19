"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

import america from "../../public/america.svg";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Header() {
    const { push } = useRouter();
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = (bool) => {
        setIsMenuOpen(bool);
    };

    return (
        <header className="flex max-w-[1440px] mx-auto w-full h-[100px] p-[20px] justify-between">
            {session?.user ? (
                <>
                    <h1
                        onClick={() => push("/")}
                        className="text-[32px] text-green-main font-bold"
                    >
                        LangFriends
                    </h1>

                    <button
                        onClick={() => handleToggleMenu(true)}
                        className="w-[50px] h-[50px] rounded-full neo-secondary flex flex-col justify-center items-center gap-[1px]"
                    >
                        <div className="w-[20px] h-[6px] rounded-[10px] neo-icon-inner"></div>
                        <div className="w-[20px] h-[6px] rounded-[10px] neo-icon-inner"></div>
                        <div className="w-[20px] h-[6px] rounded-[10px] neo-icon-inner"></div>
                    </button>
                </>
            ) : (
                <Image
                    className="h-[18px] w-[35px] ml-auto"
                    src={america}
                    alt="american flag"
                ></Image>
            )}

            {isMenuOpen && (
                <>
                    <div
                        onClick={() => handleToggleMenu(false)}
                        className="bg-black top-0 left-0 opacity-[.4] w-screen h-screen absolute z-[200]"
                    ></div>
                    <div className="h-screen text-center flex flex-col gap-[2rem] p-[4rem] w-[70%] absolute top-0 right-0 bg-neo z-[250]">
                        <h2 className="text-[2rem] font-bold">Menu</h2>

                        <ul className="flex flex-col gap-[2rem]">
                            <li>
                                <Link
                                    onClick={() => handleToggleMenu(false)}
                                    href="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => handleToggleMenu(false)}
                                    href={`/friend-chat`}
                                >
                                    Chat
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-green-main px-[1rem] py-[.5rem] text-white rounded"
                                >
                                    LogOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </header>
    );
}
