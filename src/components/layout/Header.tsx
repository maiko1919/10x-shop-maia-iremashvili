import { Link, NavLink } from "react-router";
import { useCart } from "../../hooks/useCart";

function navClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
    : "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700";
}

function Header() {
  const { totalQuantity } = useCart();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-600 px-2 py-1 text-sm font-bold text-white">
            10X
          </span>
          <span className="text-lg font-bold text-gray-900">Shop</span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navClass}>
            Catalog
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Cart
            {totalQuantity > 0 && (
              <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-gray-900">
                {totalQuantity}
              </span>
            )}
          </NavLink>
          <NavLink to="/login" className={navClass}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;