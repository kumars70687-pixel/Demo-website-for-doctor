import React, { useState } from 'react';
import { Calendar, Phone, Menu, X, Settings2 } from 'lucide-react';
import { DoctorProfile } from '../data/mockMedicalData';

interface NavbarProps {
  doctor: DoctorProfile;
  onOpenBooking: () => void;
  onOpenCustomizer: () => void;
  onOpenMyAppointments: () => void;
  appointmentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  doctor,
  onOpenBooking,
  onOpenCustomizer,
  onOpenMyAppointments,
  appointmentsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro bar for quick emergency & phone notice */}
      <div className="bg-[#172B4D] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-medium">Accepting New Patients & Teleconsultations</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <a href={`tel:${doctor.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3 text-[#20A39E]" />
              <span>{doctor.phone}</span>
            </a>
            <span className="text-slate-500">|</span>
            <span>{doctor.clinicAddress}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - Follows 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand Wordmark element */}
        <a href="#hero" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1769AA] to-[#20A39E] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#172B4D] tracking-tight leading-tight group-hover:text-[#1769AA] transition-colors">
              {doctor.clinicName}
            </span>
            <span className="text-xs text-slate-500 font-medium leading-none">
              {doctor.name}, {doctor.title}
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-[#1769AA] transition-colors whitespace-nowrap shrink-0">
            About Doctor
          </a>
          <a href="#specializations" className="hover:text-[#1769AA] transition-colors whitespace-nowrap shrink-0">
            Specializations
          </a>
          <a href="#services" className="hover:text-[#1769AA] transition-colors whitespace-nowrap shrink-0">
            Services & Pricing
          </a>
          <a href="#reviews" className="hover:text-[#1769AA] transition-colors whitespace-nowrap shrink-0">
            Patient Reviews
          </a>
          <a href="#contact" className="hover:text-[#1769AA] transition-colors whitespace-nowrap shrink-0">
            Contact & Hours
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Appointments status button if any booked */}
          {appointmentsCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1769AA] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-blue-200"
              title="View your scheduled appointments"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>My Visits ({appointmentsCount})</span>
            </button>
          )}

          {/* Practice Customizer button */}
          <button
            onClick={onOpenCustomizer}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Customize doctor profile and clinic details"
            aria-label="Practice Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-700">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#1769AA]"
            >
              About Dr. Jenkins
            </a>
            <a
              href="#specializations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#1769AA]"
            >
              Medical Specializations
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#1769AA]"
            >
              Services & Consultation Fees
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#1769AA]"
            >
              Patient Reviews & Outcomes
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#1769AA]"
            >
              Clinic Location & Hours
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {appointmentsCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#1769AA] bg-blue-50 rounded-lg text-center"
              >
                View My Scheduled Visits ({appointmentsCount})
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-[#1769AA] rounded-xl text-center shadow-sm"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
