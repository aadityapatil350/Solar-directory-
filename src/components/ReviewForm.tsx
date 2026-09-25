'use client';

import { useState } from 'react';
import { Star, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReviewFormProps {
  listingId: string;
  listingName: string;
}

export default function ReviewForm({ listingId, listingName }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [systemSize, setSystemSize] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }

    if (!reviewText.trim() || reviewText.trim().length < 15) {
      setError('Please share more details about your installation (at least 15 characters)');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId,
          name: name.trim(),
          phone: cleanPhone,
          rating,
          systemSizeKw: systemSize ? parseFloat(systemSize) : null,
          installationDate: installationDate.trim() || null,
          reviewText: reviewText.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-line rounded-sm p-6 bg-wash">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-ink shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-base text-ink">Review submitted for verification</h4>
            <p className="text-sm text-ink-2 mt-1 font-body">
              Thank you for sharing your genuine experience with {listingName}. We verify customer reviews to keep the directory reliable and unbiased. Your review will appear after manual review.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
      >
        Write a verified customer review
      </button>
    );
  }

  return (
    <div className="border border-line rounded-sm p-6 bg-paper">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
        <h3 className="font-heading font-semibold text-lg text-ink">
          Review {listingName}
        </h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-xs text-ink-2 hover:text-ink underline"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-wash border border-line rounded-sm flex items-center gap-2 text-ink text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 text-ink" />
            <span>{error}</span>
          </div>
        )}

        {/* Rating stars */}
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5 font-body">
            Your overall rating
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="p-1 text-sun focus:outline-none"
                aria-label={`${star} star rating`}
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoverRating ?? rating) ? 'fill-current text-sun' : 'text-line'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs text-ink-2 ml-2 font-body font-medium">
              {hoverRating ?? rating} out of 5 stars
            </span>
          </div>
        </div>

        {/* Two columns: Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rev-name" className="block text-xs font-medium text-ink mb-1 font-body">
              Your name *
            </label>
            <input
              id="rev-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Sharma"
              className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="rev-phone" className="block text-xs font-medium text-ink mb-1 font-body">
              Mobile number (for verification only, not published) *
            </label>
            <input
              id="rev-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Two columns: System Size & Installation Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rev-size" className="block text-xs font-medium text-ink mb-1 font-body">
              System capacity installed (kW)
            </label>
            <input
              id="rev-size"
              type="number"
              step="0.5"
              min="1"
              max="1000"
              value={systemSize}
              onChange={(e) => setSystemSize(e.target.value)}
              placeholder="e.g. 3.0"
              className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="rev-date" className="block text-xs font-medium text-ink mb-1 font-body">
              Month / Year installed
            </label>
            <input
              id="rev-date"
              type="text"
              value={installationDate}
              onChange={(e) => setInstallationDate(e.target.value)}
              placeholder="e.g. January 2025"
              className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Review text */}
        <div>
          <label htmlFor="rev-text" className="block text-xs font-medium text-ink mb-1 font-body">
            Your review and experience *
          </label>
          <textarea
            id="rev-text"
            rows={4}
            required
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Describe the installation quality, net metering timeline, communication, and after-sales service..."
            className="w-full p-3 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="h-11 px-5 border border-line text-ink text-xs font-medium rounded-sm hover:bg-wash transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="h-11 px-6 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit review'}
          </button>
        </div>
      </form>
    </div>
  );
}
