import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../ScrollToTop";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;