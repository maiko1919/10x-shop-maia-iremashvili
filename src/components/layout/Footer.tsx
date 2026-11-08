import { Link } from "react-router";
import Logo from "./Logo";

const shopLinks = [
  { to: "/", label: "Catalog" },
  { to: "/premium", label: "Premium" },
  { to: "/?sort=rating-desc", label: "Top rated" },
  { to: "/?sort=newest", label: "New arrivals" },
  { to: "/?sort=discount-desc", label: "Sale" },
  { to: "/cart", label: "Cart" },
];

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link to="/" aria-label="10X Shop — home" className="inline-block">
            <Logo />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Everyday products in one place — beauty, tech, home, fashion and more.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Shop</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-600 hover:text-emerald-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
            About this project
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Graduation project for the 10X Front-end course. Product data comes from the DummyJSON
            API. Orders and login are simulated — no real payments.
          </p>
          <a
            href="https://github.com/maiko1919/10x-shop-maia-iremashvili"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © 2026 10X Shop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;