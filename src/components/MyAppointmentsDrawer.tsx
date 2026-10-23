import React from 'react';
import { X, Calendar, Clock, MapPin, Video, Trash2, Download, AlertCircle } from 'lucide-react';
import { AppointmentRecord, DoctorProfile } from '../data/mockMedicalData';

interface MyAppointmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: AppointmentRecord[];
  onCancelAppointment: (id: string) => void;
  doctor: DoctorProfile;
}

export const MyAppointmentsDrawer: React.FC<MyAppointmentsDrawerProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  doctor
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#1769AA]" />
            <h3 className="text-base font-bold text-[#172B4D]">
              My Scheduled Appointments
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold">No appointments scheduled yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Select any medical service or specialization above to schedule your visit.
              </p>
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-xl border border-slate-200 bg-[#F5F8FB] space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#1769AA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Ref: {apt.referenceCode}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    apt.status === 'Confirmed' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-200'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#172B4D]">{apt.serviceName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Patient: {apt.patientName}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-2.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.date} at {apt.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {apt.format === 'Telehealth' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-[#20A39E]" />
                        <span>Telehealth Video Call (Link emailed)</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-[#1769AA]" />
                        <span>{doctor.clinicAddress}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-400">
                    Dr. {doctor.name}
                  </span>
                  <button
                    onClick={() => onCancelAppointment(apt.id)}
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Visit</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Need to reschedule? Call our clinic desk directly at {doctor.phone}.</span>
        </div>
      </div>
    </div>
  );
};
