import React, { useState } from 'react';
import { Award, GraduationCap, Building2, Languages, FileCheck, CheckCircle2, ChevronRight, X, HeartPulse, UserCheck } from 'lucide-react';
import { DoctorProfile } from '../data/mockMedicalData';
import { doctorConsultation } from '../assets/images';

interface AboutDoctorProps {
  doctor: DoctorProfile;
  onOpenBooking: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ doctor, onOpenBooking }) => {
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Authentic Consultation Image & Badges */}
          <div className="lg:col-span-5 flex flex-col gap-5 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 min-h-[280px] sm:min-h-[360px]">
              {/* Fallback container underneath image */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-teal-50 to-blue-50 flex flex-col items-center justify-center p-6 text-center text-slate-500">
                <UserCheck className="w-12 h-12 text-[#20A39E]/40 mb-2" />
                <span className="text-sm font-semibold text-[#172B4D]">Dedicated Consultation</span>
              </div>

              <img
                src={doctorConsultation}
                alt={`${doctor.name} in consultation with a patient`}
                className="relative z-10 w-full h-72 sm:h-88 md:h-96 object-cover object-center"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== '/images/doctor_patient_consultation.jpg') {
                    target.src = '/images/doctor_patient_consultation.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#172B4D]/85 via-transparent to-transparent flex items-end p-5 sm:p-6 pointer-events-none">
                <div className="text-white">
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-teal-300 uppercase">Consultation Philosophy</p>
                  <p className="text-sm sm:text-base font-medium mt-1">"Listening is the foundational diagnostic tool."</p>
                </div>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="bg-[#F5F8FB] rounded-xl p-5 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-[#1769AA] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#172B4D]">{doctor.degrees}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#20A39E] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700">{doctor.clinicAffiliation}</span>
              </div>
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700">Languages: {doctor.languages.join(' · ')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Medical Philosophy, Clinical Expertise */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA] tracking-wider uppercase">
              <HeartPulse className="w-4 h-4 text-[#20A39E]" />
              <span>Meet Your Doctor</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#172B4D] tracking-tight mt-2 text-balance">
              {doctor.name}, <span className="text-[#1769AA]">{doctor.title}</span>
            </h2>

            <p className="text-base font-semibold text-[#20A39E] mt-1">
              {doctor.specialization} · {doctor.experienceYears} Years Clinical Experience
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed text-base">
              With a commitment to evidence-based medicine and compassionate patient care, {doctor.name} works with each patient to understand their concerns, explain available options, and develop an appropriate, sustainable care plan.
            </p>

            {/* Medical Philosophy quote block */}
            <div className="mt-6 p-5 rounded-xl bg-[#E8F7F3]/60 border border-teal-200/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#177e7a]">Medical Philosophy</h3>
              <p className="text-sm text-slate-700 mt-1.5 italic leading-relaxed">
                "{doctor.philosophy}"
              </p>
            </div>

            {/* Clinical Expertise Areas */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-[#172B4D] uppercase tracking-wide">Areas of Clinical Expertise</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctor.clinicalExpertise.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#20A39E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Details & Action buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCredentialsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1769AA] bg-blue-50 hover:bg-blue-100/80 transition-colors cursor-pointer border border-blue-200"
              >
                <FileCheck className="w-4 h-4" />
                <span>View Full Credentials & Board Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] transition-colors cursor-pointer"
              >
                <span>Book Consultation with {doctor.name}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              {doctor.registrationNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Verified Credentials Modal */}
      {credentialsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-[#172B4D]">
                  Medical Credentials & Academic History
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{doctor.name}, {doctor.title}</p>
              </div>
              <button
                onClick={() => setCredentialsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Education section */}
              <div>
                <h4 className="text-sm font-bold text-[#172B4D] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-[#1769AA]" />
                  <span>Medical Education & Residency</span>
                </h4>
                <div className="space-y-3">
                  {doctor.education.map((edu, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-[#172B4D]">{edu.degree}</span>
                        <span className="text-xs text-slate-500 font-mono">{edu.year}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{edu.institution}</div>
                      {edu.honors && (
                        <div className="text-xs text-[#20A39E] font-medium mt-1">
                          {edu.honors}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Board Certifications */}
              <div>
                <h4 className="text-sm font-bold text-[#172B4D] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-[#20A39E]" />
                  <span>Board Certifications & Licensure</span>
                </h4>
                <div className="space-y-2">
                  {doctor.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 p-2.5 rounded-lg bg-teal-50/40 border border-teal-100/60">
                      <CheckCircle2 className="w-4 h-4 text-[#20A39E] shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* State License and Registration info */}
              <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">State Medical Board Verification</p>
                <p>{doctor.registrationNumber}</p>
                <p>Hospital Privileges: {doctor.clinicAffiliation}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setCredentialsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setCredentialsModalOpen(false);
                  onOpenBooking();
                }}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] rounded-xl"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
