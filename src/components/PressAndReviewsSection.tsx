import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ShieldCheck } from 'lucide-react';
import { Review } from '../types';

interface PressAndReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
}

export const PressAndReviewsSection: React.FC<PressAndReviewsSectionProps> = ({
  reviews,
  onAddReview
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment || !title) return;
    onAddReview({
      author,
      location: location || 'Global Patron',
      title,
      comment,
      rating
    });
    setAuthor('');
    setLocation('');
    setTitle('');
    setComment('');
    setShowReviewModal(false);
  };

  return (
    <section className="w-full bg-surface-container-low py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Press Badges Header */}
        <div className="text-center mb-10">
          <span className="font-outfit text-[11px] text-outline uppercase tracking-widest block mb-2 font-medium">
            Critical Acclaim
          </span>
          <h2 className="font-playfair text-2xl md:text-3xl text-primary font-normal">
            Celebrated by Haute Beauty Editors
          </h2>
        </div>

        {/* 3 Editorial Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-xs text-center flex flex-col justify-between border border-surface-variant/40 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <span className="font-playfair text-2xl text-primary italic font-semibold tracking-wide">
                VOGUE
              </span>
              <p className="font-outfit text-sm text-on-surface-variant italic font-light leading-relaxed">
                “LunaSea achieves the near-impossible: clinical biotech potency delivered inside ethereal, weightless oceanic textures.”
              </p>
            </div>
            <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest pt-5 block font-medium">
              Beauty Breakthrough Awards 2024
            </span>
          </div>

          <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-xs text-center flex flex-col justify-between border border-surface-variant/40 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <span className="font-playfair text-2xl text-primary italic font-semibold tracking-wide">
                Harper’s BAZAAR
              </span>
              <p className="font-outfit text-sm text-on-surface-variant italic font-light leading-relaxed">
                “The most ethereal skin hydration on the market. The Moonlit Nectar leaves a luminous glass veil that lasts through 12-hour flights.”
              </p>
            </div>
            <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest pt-5 block font-medium">
              Best Clean Hydrator
            </span>
          </div>

          <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-xs text-center flex flex-col justify-between border border-surface-variant/40 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <span className="font-playfair text-2xl text-primary italic font-semibold tracking-wide">
                ELLE
              </span>
              <p className="font-outfit text-sm text-on-surface-variant italic font-light leading-relaxed">
                “An extraordinary marriage of tidal kelp harvesting and refillable frosted glass art pieces on your vanity.”
              </p>
            </div>
            <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest pt-5 block font-medium">
              Eco-Luxury Formulation of the Year
            </span>
          </div>
        </div>

        {/* Real Patron Verified Reviews Header */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3">
            <div>
              <h3 className="font-playfair text-xl md:text-2xl text-primary font-medium">
                Reflections from the Tidal Circle
              </h3>
              <p className="font-outfit text-xs text-outline mt-0.5">
                Authentic impressions from daily ritual practitioners
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary text-xs font-outfit">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-outfit text-[10px] uppercase tracking-wider font-semibold">
                  Verified Purchases
                </span>
              </div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-surface-container-lowest hover:bg-primary hover:text-white text-primary text-xs font-outfit uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-surface-variant transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-variant/30 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-secondary text-secondary' : 'text-surface-variant'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-outfit text-[10px] text-outline">
                      {rev.date}
                    </span>
                  </div>

                  <h4 className="font-outfit text-sm font-semibold text-primary leading-snug">
                    {rev.title}
                  </h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light mt-1">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center font-outfit text-[10px] text-on-secondary-fixed font-semibold">
                      {rev.author.substring(0, 2).toUpperCase()}
                    </span>
                    <span className="font-outfit text-xs font-light">
                      {rev.author} • {rev.location}
                    </span>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[9px] text-secondary font-outfit uppercase tracking-wider">
                      <CheckCircle className="w-2.5 h-2.5" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-surface-variant space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair text-xl text-primary font-medium">
                Share Your Ritual Experience
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-outline hover:text-primary text-xl font-light"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-outfit">
              <div>
                <label className="block text-xs uppercase tracking-wider text-primary mb-1">
                  Rating
                </label>
                <div className="flex gap-1.5 text-secondary">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="cursor-pointer hover:scale-110 transition-transform p-0.5"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= rating ? 'fill-secondary text-secondary' : 'text-surface-variant'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-primary mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Adrienne M."
                  className="w-full bg-surface-container-low px-3.5 py-2 rounded-xl text-xs border border-surface-variant focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-primary mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Monaco, San Francisco"
                  className="w-full bg-surface-container-low px-3.5 py-2 rounded-xl text-xs border border-surface-variant focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-primary mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Luminous post-flight glow"
                  className="w-full bg-surface-container-low px-3.5 py-2 rounded-xl text-xs border border-surface-variant focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-primary mb-1">
                  Your Reflection
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the texture, hydration, and cellular skin response..."
                  className="w-full bg-surface-container-low px-3.5 py-2 rounded-xl text-xs border border-surface-variant focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-full text-xs uppercase tracking-wider text-outline hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-primary text-white text-xs uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm"
                >
                  Publish Reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
