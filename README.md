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

- Search with debounce (400 ms) — one request instead of one per letter
- Category filter, sorting (price, rating, name, newest, biggest discount) and pagination
- Products per page: 12 / 24 / 48
- All filters live in the URL — refresh, back button and sharing a link keep the filters
- Quick filters: ⭐ Top rated, ✨ New arrivals, 🔥 Sale
- Category sidebar and top bar with icons
- AbortController cancels old requests; Retry button when loading fails
- Product page tabs: Description / Reviews
- Reviews from the API + write your own review (saved in `localStorage`), average rating updates
- Similar products from the same category
- Category link on the product page opens the filtered catalog

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
│   ├── catalog/    # CatalogToolbar, CategoryNav, QuickFilters, Pagination
│   ├── layout/     # Header, Footer, Layout
│   ├── product/    # ProductCard, ProductGrid, ProductDetails, ProductGallery,
│   │               # AddToCart, StockBadge, ReviewList, ReviewForm, RelatedProducts
│   ├── ui/         # QuantityStepper, FormField
│   ├── Container.tsx
│   ├── ErrorBoundary.tsx
│   └── ScrollToTop.tsx
├── context/        # AuthContext, AuthProvider, CartContext, CartProvider
├── hooks/          # useAuth, useCart, useDebounce
├── pages/          # Catalog, Product, Cart, Login, Checkout, NotFound
├── routes/         # AppRoutes, ProtectedRoute
├── types/          # Product, Cart, User, Order types
└── utils/          # price helpers, catalog options, category icons, reviews storage
```

**Data flow:** Catalog filters (search, category, sort, page, per page) are read from the URL with `useSearchParams`.
Pages load products from the API inside `useEffect` and keep them in `useState`.
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
