function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-200">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-amber-400 ring-2 ring-white" />
      </span>

      <span className="leading-none">
        <span className="block text-xl font-extrabold tracking-tight text-gray-900">
          10X<span className="text-emerald-600">Shop</span>
        </span>
        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
          Everyday store
        </span>
      </span>
    </span>
  );
}

export default Logo;