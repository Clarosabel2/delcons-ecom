import { BrowserRouter, Route, Routes } from "react-router";
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<ProductsPage />} />
                    <Route
                        path="/products/:id"
                        element={<ProductDetailPage />}
                    />
                    <Route path="/cart" element={<CartDetailPage />} />
                </Route>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
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
