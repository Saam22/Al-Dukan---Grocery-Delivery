import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";

const StarRow = ({ rating, size = "size-4" }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((i) => {
      // how much of THIS star should be filled, 0 to 100%
      const fillPercent = Math.max(0, Math.min(1, rating - (i - 1))) * 100;
      return (
        <div key={i} className={`relative ${size} shrink-0`}>
          <Star className={`${size} text-app-border fill-app-border`} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fillPercent}%` }}
          >
            <Star className={`${size} text-app-warning fill-app-warning`} />
          </div>
        </div>
      );
    })}
  </div>
);

const RatingBar = ({ star, count, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-8 text-app-text-light">{star} ★</span>
      <div className="flex-1 h-2 rounded-full bg-app-border overflow-hidden">
        <div
          className="h-full bg-app-warning rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-6 text-right text-app-text-light">{count}</span>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
  const [marked, setMarked] = useState(false);

  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleHelpful = () => {
    setHelpfulCount((c) => (marked ? c - 1 : c + 1));
    setMarked((m) => !m);
  };

  const formattedDate = new Date(review.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="py-4 border-b border-app-border last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="size-9 shrink-0 rounded-full bg-app-green/10 text-app-green font-semibold text-sm flex items-center justify-center">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{review.name}</span>
            <span className="text-xs text-app-text-light">{formattedDate}</span>
          </div>

          <div className="mt-1">
            <StarRow rating={review.rating} size="size-3.5" />
          </div>

          <p className="text-sm text-app-text-light mt-2">{review.comment}</p>

          <button
            onClick={handleHelpful}
            className={`flex items-center gap-1 text-xs mt-2 transition-colors ${
              marked ? "text-app-green" : "text-app-text-light hover:text-app-green"
            }`}
          >
            <ThumbsUp className={`size-3.5 ${marked ? "fill-app-green" : ""}`} />
            Helpful ({helpfulCount})
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * DummyReviewsSection
 * @param {object} product - full product object, expects product.rating and product.reviews (array)
 */
const DummyReviewsSection = ({ product }) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const reviews = product?.reviews || [];
  const total = reviews.length;

  if (total === 0) return null;

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>

      {/* summary card */}
      <div className="bg-white rounded-2xl border border-app-border p-6 mb-6">
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="text-center sm:text-left sm:border-r sm:border-app-border sm:pr-6">
            <p className="text-4xl font-bold">{product.rating.toFixed(1)}</p>
            <div className="flex justify-center sm:justify-start my-1.5">
              <StarRow rating={product.rating} />
            </div>
            <p className="text-sm text-app-text-light">{total} reviews</p>
          </div>

          <div className="space-y-1.5">
            {breakdown.map((b) => (
              <RatingBar key={b.star} star={b.star} count={b.count} total={total} />
            ))}
          </div>
        </div>
      </div>

      {/* review list */}
      <div>
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {visibleCount < total && (
        <button
          onClick={() => setVisibleCount((c) => c + 4)}
          className="mt-4 text-sm font-medium text-app-green hover:underline"
        >
          View all {total} reviews
        </button>
      )}
    </div>
  );
};

export default DummyReviewsSection;