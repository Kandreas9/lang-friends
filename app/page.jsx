export default function Home() {
    const isAuth = false;
    return (
        <div>
            {isAuth ? (
                <div>test</div>
            ) : (
                <section className="flex flex-col gap-2 justify-center items-center text-center my-[30px] px-[6rem]">
                    <h1 className="text-[32px] text-green-main font-bold">
                        LangFriends
                    </h1>
                    <p>
                        Making the world a friendlier place, one language at a
                        time.
                    </p>
                </section>
            )}
        </div>
    );
}
