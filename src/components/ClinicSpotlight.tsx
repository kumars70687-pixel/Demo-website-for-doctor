import React from 'react';
import { Building, Sparkles, Shield, Wifi, Car, Accessibility } from 'lucide-react';
import { DoctorProfile } from '../data/mockMedicalData';

interface ClinicSpotlightProps {
  doctor: DoctorProfile;
}

export const ClinicSpotlight: React.FC<ClinicSpotlightProps> = ({ doctor }) => {
  return (
    <section className="py-20 bg-[#F5F8FB] border-t border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 aspect-video lg:aspect-[4/3]">
              <img
                src="/src/assets/images/clinic_interior_1792776876900.jpg"
                alt="AuraCare Medical Clinic interior and patient reception"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172B4D]/75 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">San Francisco Practice</p>
                  <p className="text-base font-bold mt-0.5">{doctor.clinicName}</p>
                  <p className="text-xs text-slate-200">{doctor.clinicAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Amenities */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] tracking-wider uppercase">
              <Building className="w-4 h-4 text-[#20A39E]" />
              <span>Modern Clinical Facility</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#172B4D] tracking-tight mt-2 text-balance">
              Designed for Comfort, Calm, and Clinical Excellence
            </h2>

            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              We designed our clinic to feel warm, unhurried, and distinctly different from traditional sterile waiting rooms. Experience gentle ambient lighting, quiet private examination rooms, and prompt appointments that honor your time.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172B4D]">Private Acoustic Suites</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Confidential, sound-insulated exam rooms</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#20A39E] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172B4D]">On-Site Point-of-Care Testing</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Rapid flu/strep, ECG, and immediate urine panels</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172B4D]">Reserved Patient Parking</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Complimentary validated parking garage on-site</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Accessibility className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172B4D]">Full ADA Accessibility</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ground level elevator access and wide corridors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
