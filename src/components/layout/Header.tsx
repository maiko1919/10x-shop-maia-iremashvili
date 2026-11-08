import { Link, NavLink, useNavigate } from "react-router";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { CartIcon, GridIcon, LogoutIcon, UserIcon } from "../ui/Icons";

function navClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
    : "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700";
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
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-600 px-2 py-1 text-sm font-bold text-white">
            10X
          </span>
          <span className="text-lg font-bold text-gray-900">Shop</span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navClass}>
            <GridIcon />
            <span className="sr-only sm:not-sr-only">Catalog</span>
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            <CartIcon />
            <span className="sr-only sm:not-sr-only">Cart</span>
            {totalQuantity > 0 && (
              <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-gray-900">
                {totalQuantity}
              </span>
            )}
          </NavLink>

          {user.isLoggedIn ? (
            <>
              <span className="hidden px-2 text-sm text-gray-600 md:inline">
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
        </nav>
      </div>
    </header>
  );
}

export default Header;