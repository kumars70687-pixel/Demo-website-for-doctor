import React, { useState } from 'react';
import { Clock, Video, UserCheck, ArrowRight, Check, Sparkles } from 'lucide-react';
import { MedicalService } from '../data/mockMedicalData';

interface ServicesProps {
  services: MedicalService[];
  onSelectServiceAndBook: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onSelectServiceAndBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Consultations', 'Preventive', 'Chronic Care', 'Assessments'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-100">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#20A39E]" />
              <span>Transparent Healthcare</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#172B4D] tracking-tight mt-2 text-balance">
              Medical Services & Consultation Fees
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Clear, upfront pricing with zero hidden facility fees. Every appointment includes dedicated time with Dr. Jenkins, comprehensive clinical notes, and follow-up messaging.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto shrink-0 self-start md:self-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-[#172B4D] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`rounded-2xl p-7 border transition-all flex flex-col justify-between ${
                service.featured
                  ? 'bg-gradient-to-b from-blue-50/40 via-white to-white border-blue-200/90 shadow-md shadow-blue-900/5 relative ring-1 ring-blue-500/10'
                  : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header metadata unboxed per anti-slop rules */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-medium text-[#1769AA]">{service.category}</span>
                  <div className="flex items-center gap-1.5 text-slate-600 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#172B4D] tracking-tight">
                  {service.name}
                </h3>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#172B4D] tabular-nums">
                    ${service.price}
                  </span>
                  <span className="text-xs text-slate-500">/ consultation</span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Who this service is appropriate for */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#F5F8FB] border border-slate-200/60 text-xs">
                  <span className="font-bold text-[#172B4D] block mb-1">Appropriate For:</span>
                  <p className="text-slate-600">{service.forWho}</p>
                </div>

                {/* Format indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-700">
                  {service.format.includes('Telehealth') && (
                    <span className="inline-flex items-center gap-1 text-[#20A39E]">
                      <Video className="w-3.5 h-3.5" />
                      <span>Video Available</span>
                    </span>
                  )}
                  {service.format.includes('In-Person') && (
                    <span className="inline-flex items-center gap-1 text-[#1769AA]">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>In-Clinic Exam</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Booking CTA button */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <button
                  onClick={() => onSelectServiceAndBook(service.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    service.featured
                      ? 'bg-[#1769AA] hover:bg-[#0f4c7d] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-[#1769AA] text-slate-800 hover:text-white'
                  }`}
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance & Billing Notice Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#E8F7F3]/70 border border-teal-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#20A39E] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#172B4D]">Accepting Major Insurance & Flexible HSA/FSA Payments</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                In-network with Blue Cross, Aetna, Cigna, Medicare, and UnitedHealthcare. Itemized superbills provided for out-of-network claims.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-bold text-[#1769AA] hover:underline whitespace-nowrap shrink-0"
          >
            Inquire About Coverage &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
