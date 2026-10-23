import React from 'react';
import { Phone, Mail, MapPin, ShieldAlert, ArrowUp } from 'lucide-react';
import { DoctorProfile } from '../data/mockMedicalData';

interface FooterProps {
  doctor: DoctorProfile;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ doctor, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172B4D] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/60">
          {/* Col 1: Clinic Brand Wordmark & Intro */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1769AA] to-[#20A39E] flex items-center justify-center text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {doctor.clinicName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Patient-centered medical practice led by {doctor.name}, {doctor.title}. Dedicated to high-quality internal medicine, preventive care, and chronic illness management.
            </p>

            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <p>{doctor.registrationNumber}</p>
              <p>{doctor.clinicAffiliation}</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About {doctor.name}</a>
              </li>
              <li>
                <a href="#specializations" className="hover:text-white transition-colors">Medical Specializations</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services & Pricing</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Patient Reviews</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Clinic Location & Hours</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Clinic Contact & Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#20A39E] shrink-0 mt-0.5" />
                <span>{doctor.clinicAddress}, {doctor.cityStateZip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#20A39E] shrink-0" />
                <a href={`tel:${doctor.phone.replace(/[^0-9]/g, '')}`} className="text-white hover:underline">
                  {doctor.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#20A39E] shrink-0" />
                <a href={`mailto:${doctor.email}`} className="text-white hover:underline">
                  {doctor.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] transition-all cursor-pointer shadow-sm"
              >
                <span>Book an Appointment Online</span>
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Disclaimer in Footer */}
        <div className="py-6 border-b border-slate-700/60 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Emergency Advisory:</strong> If you are experiencing a life-threatening medical emergency, chest pain, stroke symptoms, severe breathing difficulty, or trauma, please call 911 immediately or visit the nearest emergency room. Content on this website is for informational purposes and does not substitute for emergency medical care.
          </p>
        </div>

        {/* Bottom row: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {doctor.clinicName}. All rights reserved. HIPAA Compliant Outpatient Medical Practice.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
