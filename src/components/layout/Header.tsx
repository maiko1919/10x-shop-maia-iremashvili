import { Link, NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { BoxIcon, CartIcon, GridIcon, LogoutIcon, UserIcon } from "../ui/Icons";

function navClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
    : "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700";
}

function premiumClass({ isActive }: { isActive: boolean }) {
  return `flex items-center gap-2 rounded-lg border border-gray-900 px-3 py-2 text-sm font-medium tracking-wide transition ${
    isActive
      ? "bg-gray-900 text-gray-50"
      : "text-gray-900 hover:bg-gray-900 hover:text-gray-50"
  }`;
}

function Header() {
  const { totalQuantity } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3">
        <Link
          to="/"
          aria-label="10X Shop — home"
          className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Logo />
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navClass}>
            <GridIcon />
            <span className="sr-only sm:not-sr-only">Catalog</span>
          </NavLink>

          <NavLink to="/premium" className={premiumClass}>
            <span aria-hidden="true">✦</span>
            <span className="sr-only sm:not-sr-only">Premium</span>
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            <CartIcon />
            <span className="sr-only sm:not-sr-only">Cart</span>
            {totalQuantity > 0 && (
              <span
                key={totalQuantity}
                className="animate-pop rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-neutral-900"
              >
                {totalQuantity}
              </span>
            )}
          </NavLink>

          {user.isLoggedIn ? (
            <>
              <NavLink to="/orders" className={navClass}>
                <BoxIcon />
                <span className="sr-only sm:not-sr-only">Orders</span>
              </NavLink>
              <span className="hidden px-2 text-sm text-gray-600 lg:inline">
                Hi, {user.username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                <LogoutIcon />
                <span className="sr-only sm:not-sr-only">Log out</span>
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navClass}>
              <UserIcon />
              <span className="sr-only sm:not-sr-only">Log in</span>
            </NavLink>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Header;