import React from "react";
import { Outlet } from "react-router";
import StoreHeader from "../components/StoreHeader";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";

export default function StoreLayout() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full">
                <StoreHeader />
                <Outlet />
            </main>
        </div>
    );
}
