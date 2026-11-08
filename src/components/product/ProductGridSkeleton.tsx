function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="aspect-square bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="h-9 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count: number;
}

function ProductGridSkeleton({ count }: ProductGridSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading products"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductGridSkeleton;