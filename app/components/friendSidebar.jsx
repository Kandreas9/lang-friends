import { useState, useEffect } from "react";

export default function FriendSidebar({
    friend,
    toggleFriendSidebar,
    handleFriendId,
}) {
    const [friendInfo, setFriendInfo] = useState(null);

    const getFriendInfo = async () => {
        const res = await fetch(`/api/user/getById/${friend.friend_id}`, {
            cache: "no-store",
            method: "GET",
        });

        const obj = await res.json();

        setFriendInfo(obj.user);
    };

    useEffect(() => {
        getFriendInfo();
    }, []);

    const handleMessage = () => {
        toggleFriendSidebar(false);
        handleFriendId(friendInfo);
    };
    return (
        <>
            {friendInfo && (
                <li className="flex px-[2rem] justify-between items-center border rounded-[35px]">
                    {friendInfo.email}

                    <button
                        onClick={() => handleMessage()}
                        className="p-[.5rem] text-white bg-green-main rounded"
                    >
                        Message
                    </button>
                </li>
            )}
        </>
    );
}
