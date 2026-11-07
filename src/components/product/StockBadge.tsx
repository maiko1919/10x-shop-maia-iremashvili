interface StockBadgeProps {
  stock: number;
}

function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0) {
    return <span className="text-xs font-medium text-red-600">Out of stock</span>;
  }

  if (stock <= 5) {
    return <span className="text-xs font-medium text-orange-500">Only {stock} left!</span>;
  }

  return <span className="text-xs font-medium text-emerald-600">In stock</span>;
}

export default StockBadge;