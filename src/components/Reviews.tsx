import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { PatientReview } from '../data/mockMedicalData';

interface ReviewsProps {
  reviews: PatientReview[];
  onAddReview: (newReview: PatientReview) => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const [filter, setFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // New review form
  const [patientName, setPatientName] = useState('');
  const [treatment, setTreatment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [category, setCategory] = useState<'general' | 'preventive' | 'chronic' | 'telehealth'>('general');

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter(r => r.category === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !reviewText.trim()) return;

    const newRev: PatientReview = {
      id: `rev-${Date.now()}`,
      patientName: patientName.trim(),
      rating,
      date: 'Just now',
      verifiedVisit: true,
      treatment: treatment.trim() || 'General Consultation',
      reviewText: reviewText.trim(),
      category
    };

    onAddReview(newRev);
    setPatientName('');
    setTreatment('');
    setReviewText('');
    setRating(5);
    setModalOpen(false);
  };

  return (
    <section id="reviews" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] tracking-wider uppercase">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Patient Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#172B4D] tracking-tight mt-2 text-balance">
              Verified Patient Reviews
            </h2>
            <p className="mt-2 text-slate-600 text-base">
              Real experiences from patients who trust Dr. Jenkins with their ongoing health and wellness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#1769AA] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Feedback</span>
            </button>
          </div>
        </div>

        {/* Aggregate Score & Category Filter */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-base font-bold text-[#172B4D]">4.9 out of 5</span>
            <span className="text-xs text-slate-500">· Over 380+ patient responses</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-white text-[#172B4D] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilter('chronic')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'chronic' ? 'bg-white text-[#172B4D] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chronic Care
            </button>
            <button
              onClick={() => setFilter('preventive')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'preventive' ? 'bg-white text-[#172B4D] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Preventive
            </button>
            <button
              onClick={() => setFilter('telehealth')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'telehealth' ? 'bg-white text-[#172B4D] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Telehealth
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#172B4D]">{rev.patientName}</h4>
                  <span className="text-[11px] text-[#20A39E] font-medium block">
                    {rev.treatment}
                  </span>
                </div>

                {rev.verifiedVisit && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#172B4D]">Submit Patient Review</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                  Your Name (or Initials)
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Maria G."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                    Treatment / Visit Reason
                  </label>
                  <input
                    type="text"
                    required
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    placeholder="e.g. Annual Checkup"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                  >
                    <option value="general">General</option>
                    <option value="preventive">Preventive</option>
                    <option value="chronic">Chronic Care</option>
                    <option value="telehealth">Telehealth</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                  Review & Feedback
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Describe your consultation experience with Dr. Jenkins..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] rounded-xl cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
