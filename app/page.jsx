"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginRegisterChat from "./components/chats/loginRegisterChat/loginRegisterChat";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
    const { data: session, status } = useSession();
    const [recommendedUsers, setRecommendedUsers] = useState(null);

    const getAll = async () => {
        const res = await fetch("/api/user/getAll", {
            cache: "no-store",
            method: "GET",
        });

        const users = await res.json();

        const recommended = users.users.filter(
            (user) =>
                user.email !== session.user.email &&
                user.lang === session.user.lang &&
                user.city === session.user.city
        );

        setRecommendedUsers(recommended);
    };

    useEffect(() => {
        if (session?.user && session?.user?.langs && session?.user?.city) {
            getAll();
        }
    }, [session]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session?.user && !session?.user?.langs && !session?.user?.city) {
        redirect("/profile");
    }

    return (
        <div style={{ overflow: "initial" }} className="h-full">
            <Head>
                <title>LangFriends - Homepage</title>
                <meta
                    name="description"
                    content="Making the world a friendlier place, one language at a time."
                />
            </Head>

            {session?.user && recommendedUsers ? (
                <ul
                    style={{ overflow: "initial" }}
                    className="flex flex-col gap-[2rem] my-[2rem] mx-[1rem]"
                >
                    {recommendedUsers.map((user) => {
                        return (
                            <li
                                className="p-[1rem] flex justify-between items-center rounded-[35px] neo-main"
                                key={user.email}
                            >
                                {user.email}

                                <Link
                                    className="text-white bg-green-main p-1 rounded-full"
                                    href={`/user/${user.id}`}
                                >
                                    Go
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <>
                    <section className="flex h-[30%] flex-col gap-2 justify-center items-center text-center px-[6rem]">
                        <h1 className="text-[32px] text-green-main font-bold">
                            LangFriends
                        </h1>
                        <p>
                            Making the world a friendlier place, one language at
                            a time.
                        </p>
                    </section>
                    <div className="flex h-[70%] justify-center py-[1rem]">
                        <LoginRegisterChat></LoginRegisterChat>
                    </div>
                </>
            )}
        </div>
    );
}
