"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/modal";
import CustomInput from "@/components/customInput";
import { signIn, signOut } from "next-auth/react";

export default function Profile() {
    const { push } = useRouter();
    const { data: session, status } = useSession();
    const [values, setValues] = useState({
        email: "",
        city: "",
        lang: "",
    });

    useEffect(() => {
        if (session?.user) {
            setValues({
                email: session.user.email,
                city: session.user.city ? session.user.city : "",
                lang: "",
            });
        }
    }, [session]);

    const handleInputChange = (e, value) => {
        setValues({ ...values, [value]: e.target.value });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
        console.log("dispatched");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/user/update", {
                cache: "no-store",
                method: "POST",
                body: JSON.stringify({
                    email: values.email,
                    city: values.city,
                    langs: values.lang,
                }),
            });
            const json = await res.json();

            closeModal();
            signOut();
            push("/");
        } catch (err) {
            console.log(err.message);
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session?.user) {
        return (
            <div>
                <div className="flex justify-between">
                    <div>{session.user.email}</div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-main text-white p-1 rounded-[10px]"
                    >
                        Edit
                    </button>
                </div>

                {isModalOpen && (
                    <Modal closeModal={closeModal}>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white flex flex-col items-center gap-[1rem] p-[2rem] rounded-[10px] absolute z-[100] w-[250px] h-[450px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                        >
                            <h2 className="text-green-main text-[1.5rem] font-bold">
                                Edit Profile
                            </h2>

                            <CustomInput
                                type="text"
                                value={values.email}
                                handleInputChange={(e) =>
                                    handleInputChange(e, "email")
                                }
                            >
                                Email
                            </CustomInput>

                            <CustomInput
                                type="text"
                                value={values.lang}
                                handleInputChange={(e) =>
                                    handleInputChange(e, "lang")
                                }
                            >
                                Language
                            </CustomInput>

                            <CustomInput
                                type="text"
                                value={values.city}
                                handleInputChange={(e) =>
                                    handleInputChange(e, "city")
                                }
                            >
                                City
                            </CustomInput>

                            <button
                                type="submit"
                                className="bg-green-main p-[1rem] rounded-[10px]"
                            >
                                Submit
                            </button>
                        </form>
                    </Modal>
                )}
            </div>
        );
    }
}
