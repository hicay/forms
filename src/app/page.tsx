"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const petName = searchParams.get("pet_name") || "your pet";

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you for your feedback!
          </h1>
          <p className="text-gray-600">
            You rated {petName}&apos;s grooming {rating} out of 5 stars.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12 md:px-12 lg:px-24">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">glam</h2>
          <p className="text-sm tracking-[0.3em] text-gray-900">h o n d e</p>
        </div>

        {/* Main Content */}
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Thank you for choosing us!
          </h1>

          {/* Rating Section */}
          <div className="mb-16">
            <label className="block text-lg text-gray-700 mb-4">
              How was {petName}&apos;s grooming today?{" "}
              <span className="text-gray-400">*</span>
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-4xl md:text-5xl transition-colors focus:outline-none"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill={star <= (hoveredRating || rating) ? "#F5B742" : "none"}
                    stroke="#F5B742"
                    strokeWidth="1.5"
                    className="w-10 h-10 md:w-12 md:h-12"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rating === 0}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
