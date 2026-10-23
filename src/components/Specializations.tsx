import React, { useState } from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  Thermometer, 
  Activity, 
  HeartPulse, 
  ClipboardList, 
  Users, 
  Flame, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Specialization } from '../data/mockMedicalData';

interface SpecializationsProps {
  specializations: Specialization[];
  onOpenBooking: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Stethoscope,
  ShieldCheck,
  Thermometer,
  Activity,
  HeartPulse,
  ClipboardList,
  Users,
  Flame,
};

export const Specializations: React.FC<SpecializationsProps> = ({ specializations, onOpenBooking }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialization | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'general' | 'preventive' | 'chronic' | 'acute'>('all');

  const filteredSpecialties = activeFilter === 'all'
    ? specializations
    : specializations.filter(s => s.category === activeFilter);

  return (
    <section id="specializations" className="py-20 bg-[#F5F8FB] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#1769AA] shadow-xs">
            <span>Specialized Clinical Practice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#172B4D] tracking-tight mt-3 text-balance">
            Comprehensive Medical Specializations
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Focused clinical care protocols designed to diagnose, treat, and proactively manage adult health conditions with evidence-based precision.
          </p>

          {/* Interactive filter tabs (Buttons allowed as per frontend-design skill) */}
          <div className="mt-7 inline-flex items-center p-1 bg-white rounded-xl border border-slate-200/80 shadow-xs flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1769AA] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Care Areas
            </button>
            <button
              onClick={() => setActiveFilter('preventive')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'preventive'
                  ? 'bg-[#1769AA] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Preventive & Wellness
            </button>
            <button
              onClick={() => setActiveFilter('chronic')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'chronic'
                  ? 'bg-[#1769AA] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chronic Disease Management
            </button>
            <button
              onClick={() => setActiveFilter('acute')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'acute'
                  ? 'bg-[#1769AA] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acute Illness
            </button>
            <button
              onClick={() => setActiveFilter('general')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'general'
                  ? 'bg-[#1769AA] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              General Consultations
            </button>
          </div>
        </div>

        {/* Specializations Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpecialties.map((spec) => {
            const IconComponent = ICON_MAP[spec.iconName] || Stethoscope;
            return (
              <div
                key={spec.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E8F7F3] text-[#20A39E] flex items-center justify-center group-hover:bg-[#1769AA] group-hover:text-white transition-colors duration-200">
                    <IconComponent className="w-6 h-6 transition-transform group-hover:scale-105" />
                  </div>

                  <h3 className="text-lg font-bold text-[#172B4D] mt-5 group-hover:text-[#1769AA] transition-colors">
                    {spec.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {spec.description}
                  </p>

                  {/* Common symptoms snippet */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Symptoms Addressed:
                    </span>
                    <ul className="mt-1.5 space-y-1">
                      {spec.commonSymptoms.slice(0, 3).map((sym, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span className="truncate">{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSpecialty(spec)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1769AA] hover:text-[#0f4c7d] transition-colors cursor-pointer"
                  >
                    <span>Clinical Protocols</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specialization Detail & Preparation Modal */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#20A39E] flex items-center justify-center">
                  {React.createElement(ICON_MAP[selectedSpecialty.iconName] || Stethoscope, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#172B4D]">
                    {selectedSpecialty.title}
                  </h3>
                  <span className="text-xs text-teal-700 font-medium">Evidence-Based Clinical Protocol</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Overview</h4>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">{selectedSpecialty.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">Diagnostic Approach</h4>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">{selectedSpecialty.diagnosticApproach}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Recommended Treatments & Tests</h4>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {selectedSpecialty.keyTreatments.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#20A39E] shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Patient Preparation Advice:</span>
                  <p className="mt-0.5">{selectedSpecialty.preparationTips}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setSelectedSpecialty(null);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] rounded-xl"
              >
                Book for {selectedSpecialty.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
