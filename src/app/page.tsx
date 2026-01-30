"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const GOOGLE_MAPS_URL = "https://www.google.com/maps";

function FeedbackForm() {
  const searchParams = useSearchParams();
  const petName = searchParams.get("pet_name") || "your pet";
  const googleMapsUrl = searchParams.get("google_maps_url") || GOOGLE_MAPS_URL;

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [step, setStep] = useState<"rating" | "feedback" | "done">("rating");
  const [feedback, setFeedback] = useState("");

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    if (rating >= 4) {
      window.location.href = googleMapsUrl;
    } else {
      setStep("feedback");
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Thank you for your feedback!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            We appreciate you taking the time to help us improve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 py-8 sm:px-6 sm:py-12 md:px-12 lg:px-24">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">glam</h2>
          <p className="text-xs sm:text-sm tracking-[0.3em] text-gray-900">h o n d e</p>
        </div>

        {/* Rating Form */}
        {step === "rating" && (
          <form onSubmit={handleRatingSubmit}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12">
              Thank you for choosing us!
            </h1>

            <div className="mb-8 sm:mb-16">
              <label className="block text-base sm:text-lg text-gray-700 mb-4">
                How was {petName}&apos;s grooming today?{" "}
                <span className="text-gray-400">*</span>
              </label>
              <div className="flex gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-colors focus:outline-none touch-manipulation"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill={star <= (hoveredRating || rating) ? "#F5B742" : "none"}
                      stroke="#F5B742"
                      strokeWidth="1.5"
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
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
        )}

        {/* Feedback Form */}
        {step === "feedback" && (
          <form onSubmit={handleFeedbackSubmit}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12">
              We&apos;re sorry to hear that.
            </h1>

            <div className="mb-8 sm:mb-16">
              <label className="block text-base sm:text-lg text-gray-700 mb-4">
                What could we have done better?
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us how we can improve..."
                rows={5}
                className="w-full p-4 border border-gray-300 rounded-lg text-base sm:text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors touch-manipulation"
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
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <FeedbackForm />
    </Suspense>
  );
}
