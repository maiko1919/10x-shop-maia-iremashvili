# 10X Shop

An online shop built as my graduation project for the 10X Front-end course.
Users can browse products, view product details, add items to the cart, log in and place an order.
Product data comes from the [DummyJSON](https://dummyjson.com) API.

**Live demo:** https://10x-shop-maia-iremashvili.vercel.app/

## Features

### CORE

- Catalog with products loaded from the API (loading, error and empty states)
- Product page with image gallery, price with discount, stock status
- Choose quantity and add to cart (cannot add more than in stock)
- Cart page: change quantity, remove item, clear cart, total price
- Cart is saved in `localStorage` and stays after page refresh
- Simple login (React Context) — checkout is available only after login
- Checkout form with validation and order confirmation
- 404 page for unknown pages and products
- Error Boundary with a "Reload" button
- Responsive design (mobile, tablet, desktop)

### FULL

_In progress — will be updated._

## Tech Stack

- React 19
- TypeScript (strict mode)
- Vite
- React Router
- Tailwind CSS v4
- DummyJSON API
- ESLint
- Vercel (deploy)

## Architecture

```
src/
├── api/            # API requests (products.api.ts)
├── components/
│   ├── cart/       # CartItemRow
│   ├── layout/     # Header, Footer, Layout
│   ├── product/    # ProductCard, ProductGrid, ProductGallery, AddToCart, StockBadge
│   ├── ui/         # QuantityStepper, FormField
│   ├── Container.tsx
│   ├── ErrorBoundary.tsx
│   └── ScrollToTop.tsx
├── context/        # AuthContext, AuthProvider, CartContext, CartProvider
├── hooks/          # useAuth, useCart
├── pages/          # Catalog, Product, Cart, Login, Checkout, NotFound
├── routes/         # AppRoutes, ProtectedRoute
├── types/          # Product, Cart, User, Order types
└── utils/          # price helpers (discountedPrice, formatPrice)
```

**Data flow:** Pages load products from the API inside `useEffect` and keep them in `useState`.
The cart and the logged-in user live in React Context (`CartProvider`, `AuthProvider`), so any component can read them with the `useCart()` and `useAuth()` hooks.
User actions call context functions (for example `addItem`), which create a new state with immutable updates, and React re-renders the UI.
The cart is also written to `localStorage` (key `shop_cart`) on every change.

## How to Run

```bash
git clone https://github.com/maiko1919/10x-shop-maia-iremashvili.git
cd 10x-shop-maia-iremashvili
npm install
npm run dev
```

Then open http://localhost:5173

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type check and build for production |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Check TypeScript types (no output files) |
| `npm run lint` | Check code with ESLint |

## Test Account

Login is a simulation — any username works, password must be at least 6 characters.

Example: `maia` / `123456`

## Credits

- Product data: [DummyJSON](https://dummyjson.com)
- 10X Front-end course lecturers
- AI assistant (Claude) was used for explanations and code suggestions. All code was reviewed, tested and committed by me.
