import type { Review } from "../../types/product";

interface ReviewListProps {
  reviews: Review[];
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className="text-amber-400">
      {"★".repeat(full)}
      <span className="text-gray-300">{"★".repeat(5 - full)}</span>
    </span>
  );
}

function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet. Be the first to write one!</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li
          key={`${review.date}-${review.reviewerName}-${review.comment}`}
          className="rounded-2xl border border-gray-200 bg-white p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-gray-900">{review.reviewerName}</span>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <Stars rating={review.rating} />
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;