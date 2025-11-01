"use client";
import { useState, useEffect } from "react";
import { Review } from "@/app/lib/reviews";

interface ReviewsPageProps {
  fetchReviews: () => void;
  handleSubmit: () => void;
}

export default function ReviewMain({
  fetchReviews,
  handleSubmit,
}: ReviewsPageProps) {
  const [name, setName] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Reviews</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-black"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white text-black"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium mb-2 text-black"
          >
            Review
          </label>
          <textarea
            id="review"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white  text-black"
            placeholder="Write your review here"
          />
        </div>

        <button
          type="submit"
          className=" cursor-pointer w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-black">
          All Reviews ({reviews.length})
        </h2>

        {loading ? (
          <p className="text-black">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-black-500 italic">
            No reviews yet. Be the first to leave one!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-2 border-yellow-400 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <span className="text-sm text-black">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-black">{review.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
