import React from "react";
import { OrbitProgress } from "react-loading-indicators";

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <OrbitProgress color="#2896b9" size="large" />
        </div>
    );
}
