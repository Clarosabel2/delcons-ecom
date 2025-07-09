import React from "react";
import NumberFlow from "@number-flow/react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

export default function QuantitySelector({
    value,
    onChange,
    min = 1,
    max = 10,
    className = "",
}: QuantitySelectorProps) {
    const handleIncrement = () => {
        if (value < max) {
            console.log(value);
            onChange(value + 1);
            console.log(value);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className="flex items-center gap-2 lg:gap-0">
            <button
                onClick={handleDecrement}
                disabled={value <= min}
                className={`flex items-center justify-center w-8 h-8 lg:w-4 lg:h-4 text-sm border rounded-full
                    ${
                        value <= min
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-blue-600 border-blue-600 hover:bg-blue-50 active:bg-blue-100"
                    } ${className}`}
                aria-label="Disminuir cantidad"
            >
                <FaMinus className="w-3 h-3" />
            </button>

            <span className="w-8 font-medium text-center">
                <NumberFlow value={value} />
            </span>

            <button
                onClick={handleIncrement}
                disabled={value >= max}
                className={`flex items-center justify-center w-8 h-8 lg:w-4 lg:h-4 text-sm border rounded-full
                    ${
                        value >= max
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-blue-600 border-blue-600 hover:bg-blue-50 active:bg-blue-100"
                    } ${className}`}
                aria-label="Aumentar cantidad"
            >
                <FaPlus className="w-3 h-3" />
            </button>
        </div>
    );
}
