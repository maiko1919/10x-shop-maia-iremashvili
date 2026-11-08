import { useState } from "react";
import type { FormEvent } from "react";

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

interface ReviewErrors {
  rating?: string;
  comment?: string;
}

function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: ReviewErrors = {};
    if (rating < 1) {
      newErrors.rating = "Please select a rating";
    }
    if (comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSuccess(false);
      return;
    }

    onSubmit(rating, comment.trim());
    setRating(0);
    setComment("");
    setSuccess(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-5"
    >
      <h3 className="text-lg font-semibold">Write a review</h3>

      <fieldset className="mt-3">
        <legend className="mb-1 text-sm font-medium text-gray-700">Your rating</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setRating(value);
                setSuccess(false);
              }}
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              aria-pressed={rating === value}
              className={`h-11 w-11 rounded-lg text-2xl transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                value <= rating ? "text-amber-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
      </fieldset>

      <div className="mt-4">
        <label htmlFor="comment" className="mb-1 block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            setSuccess(false);
          }}
          aria-invalid={errors.comment ? true : undefined}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 aria-invalid:border-red-500"
        />
        {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment}</p>}
      </div>

      <button
        type="submit"
        className="mt-4 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        Submit review
      </button>

      {success && <p className="mt-3 text-sm text-emerald-700">Review added ✓</p>}
    </form>
  );
}

export default ReviewForm;