import { useState } from "react";
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

function CartBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span
      key={count}
      className="animate-pop rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-neutral-900"
    >
      {count}
    </span>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

function Header() {
  const { totalQuantity } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="10X Shop — home"
          className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Logo />
        </Link>

        {/* კომპიუტერი და ტაბლეტი: ძველებურად */}
        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end className={navClass}>
            <GridIcon />
            <span>Catalog</span>
          </NavLink>

          <NavLink to="/premium" className={premiumClass}>
            <span aria-hidden="true">✦</span>
            <span>Premium</span>
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            <CartIcon />
            <span>Cart</span>
            <CartBadge count={totalQuantity} />
          </NavLink>

          {user.isLoggedIn ? (
            <>
              <NavLink to="/orders" className={navClass}>
                <BoxIcon />
                <span>Orders</span>
              </NavLink>
              <NavLink to="/profile" className={navClass}>
                <UserIcon />
                <span className="sr-only lg:not-sr-only">{user.username}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                <LogoutIcon />
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navClass}>
              <UserIcon />
              <span>Log in</span>
            </NavLink>
          )}

          <ThemeToggle />
        </nav>

        {/* ტელეფონი: კალათა, თემა და ბურგერი */}
        <div className="flex items-center gap-1 sm:hidden">
          <NavLink to="/cart" onClick={closeMenu} aria-label="Cart" className={navClass}>
            <CartIcon />
            <CartBadge count={totalQuantity} />
          </NavLink>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* ტელეფონის ჩამოსაშლელი მენიუ */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-gray-200 px-4 py-3 sm:hidden"
        >
          <NavLink to="/" end onClick={closeMenu} className={navClass}>
            <GridIcon />
            <span>Catalog</span>
          </NavLink>

          <NavLink to="/premium" onClick={closeMenu} className={premiumClass}>
            <span aria-hidden="true">✦</span>
            <span>Premium</span>
          </NavLink>

          {user.isLoggedIn ? (
            <>
              <NavLink to="/orders" onClick={closeMenu} className={navClass}>
                <BoxIcon />
                <span>Orders</span>
              </NavLink>
              <NavLink to="/profile" onClick={closeMenu} className={navClass}>
                <UserIcon />
                <span>{user.username}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                <LogoutIcon />
                <span>Log out</span>
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={closeMenu} className={navClass}>
              <UserIcon />
              <span>Log in</span>
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;