import React, { useState } from 'react';
import { X, RotateCcw, Save, Edit3, CheckCircle2 } from 'lucide-react';
import { DoctorProfile, DEFAULT_DOCTOR_PROFILE } from '../data/mockMedicalData';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorProfile;
  onSave: (updated: DoctorProfile) => void;
  onReset: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  doctor,
  onSave,
  onReset
}) => {
  const [formData, setFormData] = useState<DoctorProfile>({ ...doctor });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof DoctorProfile, val: any) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172B4D]">
                Customize Practice & Doctor Details
              </h3>
              <p className="text-xs text-slate-500">
                Easily update doctor information, clinic address, fees, and contact details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Doctor details updated successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Doctor Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Title & Suffix
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Specialization
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => handleChange('specialization', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Years of Clinical Practice
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={formData.experienceYears}
                onChange={(e) => handleChange('experienceYears', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
              Verified Degrees & Academic Training
            </label>
            <input
              type="text"
              value={formData.degrees}
              onChange={(e) => handleChange('degrees', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Base Consultation Fee ($)
              </label>
              <input
                type="number"
                min={0}
                value={formData.consultationFeeBase}
                onChange={(e) => handleChange('consultationFeeBase', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Clinic Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Clinic Practice Name
              </label>
              <input
                type="text"
                value={formData.clinicName}
                onChange={(e) => handleChange('clinicName', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                Clinic Address & Suite
              </label>
              <input
                type="text"
                value={formData.clinicAddress}
                onChange={(e) => handleChange('clinicAddress', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
              Medical Philosophy Statement
            </label>
            <textarea
              rows={3}
              value={formData.philosophy}
              onChange={(e) => handleChange('philosophy', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onReset();
                setFormData({ ...DEFAULT_DOCTOR_PROFILE });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] rounded-xl shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
