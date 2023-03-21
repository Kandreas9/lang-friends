import Image from "next/image";

import america from "../../public/america.svg";

export default function Header() {
    const isAuth = false;

    return (
        <header className="flex p-[20px] justify-between">
            {isAuth ? (
                <>
                    <h1 className="text-[32px] text-green-main font-bold">
                        LangFriends
                    </h1>

                    <button className="w-[50px] h-[50px] rounded-full neo-secondary flex flex-col justify-center items-center gap-[1px]">
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
        </header>
    );
}
