"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function UserPage({ params }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);
    const [isFriends, setIsFriends] = useState(false);

    const getById = async () => {
        const res = await fetch(`/api/user/getById/${params.id}`, {
            cache: "no-store",
            method: "GET",
        });

        const obj = await res.json();
        setUser(obj.user);

        const res2 = await fetch(`/api/user/checkFriends`, {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify({
                userId: session.user.id,
                potentialFriendsId: obj.user.id,
            }),
        });

        const json = await res2.json();

        if (json.result) {
            setIsFriends(true);
        } else {
            console.log(json);
        }
    };

    useEffect(() => {
        if (session?.user) {
            getById();
        }
    }, [session]);

    const handleLike = async () => {
        const res = await fetch(`/api/user/like`, {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify({ original: session.user, user }),
        });

        const json = await res.json();

        if (json.result) {
            setIsFriends(true);
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Head>
                <title>LangFriends - User Profile</title>
                <meta
                    name="description"
                    content="Like friends so you can chat."
                />
            </Head>

            {user && (
                <div className="flex justify-between">
                    <div>{user.email}</div>
                    {isFriends ? (
                        <div className="bg-green-main p-1 rounded-[10px] text-white">
                            Already Liked
                        </div>
                    ) : (
                        <button
                            className="bg-green-main p-1 rounded-[10px] text-white"
                            onClick={handleLike}
                        >
                            Like
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
