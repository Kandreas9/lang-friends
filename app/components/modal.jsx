import { createPortal } from "react-dom";

export default function Modal({ children, closeModal }) {
    return (
        <>
            {createPortal(
                <>
                    <div
                        onClick={closeModal}
                        className="absolute z-50 h-screen w-screen top-0 left-0 bg-black opacity-40"
                    ></div>

                    {children}
                </>,
                document.getElementById("modal")
            )}
        </>
    );
}
