import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

type Props = {
    rate: number;
    className?: string;
};

export default function ProductRatingStar({ rate, className }: Props) {
    return (
        <div className={`flex ${className}`}>
            {Array.from({ length: 5 }).map((_, i) => {
                const full = i + 1 <= Math.floor(rate);
                const half = i + 0.5 <= rate && i + 1 > rate;

                return full ? (
                    <Star key={i} className="text-yellow-400" />
                ) : half ? (
                    <Star key={i} className="text-yellow-300" />
                ) : (
                    <StarOff key={i} className="text-gray-100" />
                );
            })}
        </div>
    );
}
