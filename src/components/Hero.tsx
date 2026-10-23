import React from 'react';
import { ShieldCheck, HeartHandshake, CalendarCheck, ArrowRight, Award, CheckCircle, Clock } from 'lucide-react';
import { DoctorProfile } from '../data/mockMedicalData';

interface HeroProps {
  doctor: DoctorProfile;
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ doctor, onOpenBooking, onExploreServices }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FB] via-white to-white pt-8 sm:pt-14 pb-16">
      {/* Subtle background ambient graphic */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 left-0 -translate-x-12 w-80 h-80 bg-teal-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, description, trust markers, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Small live availability indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F7F3] border border-teal-200/60 text-xs font-semibold text-[#177e7a] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#20A39E] animate-pulse" />
              <span>Appointments available this week · In-Person & Telehealth</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#172B4D] tracking-tight leading-[1.15] text-balance">
              Expert Medical Care, Centered Around You
            </h1>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Compassionate, personalized healthcare backed by medical expertise and a commitment to your well-being. We're here to help you feel informed, supported, and confident at every stage of your healthcare journey with {doctor.name}, {doctor.title}.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] active:scale-[0.98] rounded-xl shadow-md shadow-blue-900/10 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#172B4D] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Three Mandatory Trust Indicators */}
            <div className="mt-10 pt-8 border-t border-slate-200/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 border border-blue-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#172B4D]">Qualified Medical Professional</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Board Certified Internist (ABIM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#20A39E] flex items-center justify-center shrink-0 border border-teal-100">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#172B4D]">Patient-Centered Care</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Unhurried 30-60m consultations</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#172B4D]">Convenient Scheduling</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Easy online booking & reminders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Portrait with Floating Credential Cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer soft card container with rounded corners */}
              <div className="relative z-10 rounded-2xl overflow-hidden bg-white shadow-xl shadow-slate-900/8 border border-slate-200/80 aspect-[3/4]">
                <img
                  src={doctor.portraitUrl}
                  alt={`${doctor.name}, ${doctor.title}`}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim at bottom for text readability */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#172B4D]/90 via-[#172B4D]/40 to-transparent p-5 text-white">
                  <p className="font-bold text-lg leading-tight">{doctor.name}, {doctor.title}</p>
                  <p className="text-xs text-slate-200 mt-0.5">{doctor.specialization}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-teal-300">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Active California Medical License</span>
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge (top left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-3.5 shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-[#1769AA]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#172B4D] tabular-nums leading-none">
                    {doctor.experienceYears}+ Years
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Clinical Practice</div>
                </div>
              </div>

              {/* Floating Consultation Fee & Availability Badge (bottom right) */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-3.5 shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#20A39E]/10 text-[#20A39E] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#20A39E]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Initial Consultations</div>
                  <div className="text-base font-bold text-[#172B4D] tabular-nums leading-none mt-0.5">
                    From ${doctor.consultationFeeBase}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item KPI Proof Strip below the hero split across full width */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1769AA] tabular-nums">
              {doctor.experienceYears}+
            </span>
            <span className="text-sm font-semibold text-[#172B4D] mt-1">Years of Experience</span>
            <span className="text-xs text-slate-500 mt-0.5">Academic & private practice</span>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0 lg:pl-6">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#20A39E] tabular-nums">
              4.9 / 5.0
            </span>
            <span className="text-sm font-semibold text-[#172B4D] mt-1">Patient Satisfaction</span>
            <span className="text-xs text-slate-500 mt-0.5">Over 380+ verified reviews</span>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0 lg:pl-6">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] tabular-nums">
              ABIM
            </span>
            <span className="text-sm font-semibold text-[#172B4D] mt-1">Board Certified</span>
            <span className="text-xs text-slate-500 mt-0.5">Internal Medicine Specialist</span>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0 lg:pl-6">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tabular-nums">
              100%
            </span>
            <span className="text-sm font-semibold text-[#172B4D] mt-1">Transparent Pricing</span>
            <span className="text-xs text-slate-500 mt-0.5">No surprise medical bills</span>
          </div>
        </div>
      </div>
    </section>
  );
};
