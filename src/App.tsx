import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import "./styles/App.css";

import ProductsPage from "./modules/products/pages/ProductsPage";
import ProductDetailPage from "./modules/products/pages/ProductDetailPage";
import MainLayout from "./modules/shared/layouts/public/MainLayout";
import CartDetailPage from "./modules/cart/pages/CartDetailPage";
import CheckoutPage from "./modules/cart/pages/CheckoutPage";
import AuthLayout from "./modules/shared/layouts/auth/AuthLayout";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import LoginPage from "./modules/auth/pages/LoginPage";
import ProtectedRoute from "./modules/shared/components/ProtectedRoute";

import ProductsDashboard from "./modules/products/pages/ProductsDashboard";
import DashboardLayout from "./modules/shared/layouts/private/DashboardLayout";
import AccountPage from "./modules/user/pages/AccountPage";
import SettingsPage from "./modules/user/pages/SettingsPage";
import OrdersPage from "./modules/orders/pages/OrdersPage";

import StoreLayout from "./modules/store/layouts/StoreLayout";
import StorePage from "./modules/store/pages/StorePage";
import StoresListPage from "./modules/store/pages/StoresListPage";

import ScrollToTop from "./modules/shared/components/ScrollToTop";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<StoresListPage />} />
                    <Route path="/cart" element={<CartDetailPage />} />
                </Route>

                {/* Store Routes */}
                <Route path="/:storeId" element={<StoreLayout />}>
                    <Route index element={<StorePage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductDetailPage />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                    </Route>
                    <Route
                        path="/dashboard"
                        element={<DashboardLayout />}
                    >
                        <Route path="my-products" element={<ProductsDashboard></ProductsDashboard>}></Route>
                        <Route path="my-orders" element={<OrdersPage />}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
