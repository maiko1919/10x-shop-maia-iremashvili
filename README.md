# 10X Shop

An online shop built as my graduation project for the 10X Front-end course.
Users can browse and filter products, view details and reviews, add items to the cart, log in, place an order and follow its status.
Product data comes from the [DummyJSON](https://dummyjson.com) API.

**Live demo:** https://10x-shop-maia-iremashvili.vercel.app/

## Features

### CORE

- Catalog with products loaded from the API (loading, error and empty states)
- Product page with image gallery, price with discount and stock status
- Choose quantity and add to cart (cannot add more than in stock)
- Cart page: change quantity, remove item, clear cart, total price
- Cart is saved in `localStorage` and stays after page refresh
- Simple login (React Context) — checkout is available only after login
- Checkout form with validation and order confirmation
- 404 page for unknown pages and products
- Error Boundary with a "Reload" button
- Responsive design (mobile, tablet, desktop)

### FULL

**Catalog**
- Search with debounce (400 ms) — one request instead of one per letter
- Category filter, sorting (price, rating, name, newest, biggest discount) and pagination
- Products per page: 12 / 24 / 48
- All filters live in the URL — refresh, back button and sharing a link keep the filters
- Quick filters: ⭐ Top rated, ✨ New arrivals, 🔥 Sale
- Category sidebar grouped by Women, Men, Beauty, Home, Tech, Sport — plus a top category bar with icons
- 🔥 Hot deals moving bar
- Quick view modal (native `<dialog>`) — see a product and add it to the cart without leaving the catalog
- Skeleton cards while products load; AbortController cancels old requests; Retry button on error

**Product**
- Tabs: Description / Reviews
- Reviews from the API + write your own review (saved in `localStorage`), average rating updates
- Similar products from the same category

**Cart, checkout and orders**
- Promo code `10X10` (−10%), shipping $10 — free from $100
- Toast notifications ("added to cart", "no more items in stock")
- Orders history with live status: Processing → Shipped → Delivered (updates every 30 s)
- Order details page with timeline and Reorder button

**Account and UI**
- Login form with Formik + Yup validation schema
- Login is kept after refresh (only the username is saved, never the password)
- Profile page: edit name, email and phone; theme switch; clear local data
- Dark mode (saved in `localStorage`, follows system setting on first visit)
- ✦ Premium page in a dark minimal style
- Sticky header with blur, SVG icons, custom logo
- Pages are lazy loaded (code splitting with `React.lazy` + `Suspense`)

## Tech Stack

- React 19
- TypeScript (strict mode)
- Vite
- React Router
- Tailwind CSS v4
- Formik + Yup
- DummyJSON API
- ESLint
- Vercel (deploy)

## Architecture

```
src/
├── api/            # ApiClient (generic get<T>), ApiError, products.api.ts
├── components/
│   ├── cart/       # CartItemRow, PromoCodeForm, SummaryLines
│   ├── catalog/    # CatalogToolbar, CategoryNav, QuickFilters, SaleMarquee, Pagination
│   ├── layout/     # Header, Footer, Layout, Logo, ThemeToggle
│   ├── orders/     # OrderStatusBadge
│   ├── product/    # ProductCard, ProductGrid, ProductDetails, ProductGallery, QuickViewModal,
│   │               # AddToCart, StockBadge, ReviewList, ReviewForm, RelatedProducts, ProductGridSkeleton
│   ├── ui/         # QuantityStepper, FormField, Icons
│   ├── Container.tsx
│   ├── ErrorBoundary.tsx
│   └── ScrollToTop.tsx
├── context/        # Auth, Cart, Theme and Toast contexts + providers
├── hooks/          # useAuth, useCart, useTheme, useToast, useDebounce, useNow
├── models/         # Cart (implements ICart), StorageService<T>
├── pages/          # Catalog, Product, Cart, Login, Checkout, Orders, OrderDetails, Profile, Premium, NotFound
├── routes/         # AppRoutes (lazy pages), ProtectedRoute
├── types/          # Product, Review, Category, Cart, User, Order types
└── utils/          # price helpers, cart rules, catalog options, type guards, storage keys
```

**Data flow:** Catalog filters (search, category, sort, page, per page) are read from the URL with `useSearchParams`.
Pages load data through one `ApiClient` class inside `useEffect` and keep it in `useState`; an `AbortController` cancels old requests.
The cart, user, theme and toasts live in React Context, so any component can use them through custom hooks (`useCart`, `useAuth`, `useTheme`, `useToast`).
User actions call context functions (for example `addItem`), which create a new state with immutable updates, and React re-renders the UI.
All cart totals are calculated in the `Cart` class. Data in `localStorage` is read and written only through `StorageService<T>`, which checks the saved JSON with a type guard.

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

Promo code: `10X10`

## Credits

- Product data: [DummyJSON](https://dummyjson.com)
- 10X Front-end course lecturers
- AI assistant (Claude) was used for explanations and code suggestions. All code was reviewed, tested and committed by me.
