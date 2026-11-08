import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ProductGallery from "./ProductGallery";
import StockBadge from "./StockBadge";
import AddToCart from "./AddToCart";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import RelatedProducts from "./RelatedProducts";
import { useAuth } from "../../hooks/useAuth";
import { discountedPrice, formatPrice } from "../../utils/format";
import { loadReviews, saveReview } from "../../utils/reviewsStorage";
import type { Product, Review } from "../../types/product";

type Tab = "description" | "reviews";

interface ProductDetailsProps {
  product: Product;
}

function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [localReviews, setLocalReviews] = useState<Review[]>(() => loadReviews(product.id));

  // ჯერ ჩვენი რევიუები, მერე API-ის
  const allReviews = [...localReviews, ...product.reviews];
  const averageRating =
    allReviews.length > 0
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length
      : product.rating;

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage >= 1;

  function handleAddReview(rating: number, comment: string) {
    const review: Review = {
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerName: user.isLoggedIn ? user.username : "Guest",
    };
    saveReview(product.id, review);
    setLocalReviews((prev) => [review, ...prev]);
  }

  function tabClass(tab: Tab) {
    return `-mb-px border-b-2 px-4 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
      activeTab === tab
        ? "border-emerald-600 text-emerald-700"
        : "border-transparent text-gray-500 hover:text-gray-800"
    }`;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-medium text-gray-600 hover:text-emerald-700"
      >
        ← Back to catalog
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-wide text-gray-500">
            <Link
              to={`/?category=${encodeURIComponent(product.category)}`}
              className="hover:text-emerald-700 hover:underline"
            >
              {product.category}
            </Link>
            {product.brand && ` · ${product.brand}`}
          </p>

          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <p className="text-amber-500">
            ★ {averageRating.toFixed(1)}{" "}
            <span className="text-gray-500">· {allReviews.length} reviews</span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-emerald-700">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  −{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <StockBadge stock={product.stock} />
          <AddToCart product={product} />
        </div>
      </div>

      <section className="mt-12">
        <div role="tablist" className="flex border-b border-gray-200">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "description"}
            onClick={() => setActiveTab("description")}
            className={tabClass("description")}
          >
            Description
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
            className={tabClass("reviews")}
          >
            Reviews ({allReviews.length})
          </button>
        </div>

        <div className="py-6">
          {activeTab === "description" ? (
            <p className="max-w-3xl leading-relaxed text-gray-700">{product.description}</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              <ReviewList reviews={allReviews} />
              <ReviewForm onSubmit={handleAddReview} />
            </div>
          )}
        </div>
      </section>

      <RelatedProducts product={product} />
    </>
  );
}

export default ProductDetails;