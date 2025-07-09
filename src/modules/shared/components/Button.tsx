import React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: String;
};

export default function Button({
    children,
    onClick,
    type = "button",
    className = "",
}: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className} py-3 flex gap-2 items-center cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-500 text-white text-lg font-semibold w-auto px-5 rounded-lg transition-colors `}
        >
            {children}
        </button>
    );
}
