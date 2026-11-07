import { Routes, Route } from "react-router";
import Layout from "../components/layout/Layout";
import CatalogPage from "../pages/CatalogPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import CheckoutPage from "../pages/CheckoutPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;