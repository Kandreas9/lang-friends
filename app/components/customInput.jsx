export default function CustomInput({
    children,
    type,
    value,
    handleInputChange,
}) {
    return (
        <label className="flex flex-col gap-[.5rem]">
            {children}

            <input
                className="neo-inner"
                type={type}
                value={value}
                onChange={handleInputChange}
            />
        </label>
    );
}
