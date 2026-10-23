import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Download, 
  Video, 
  UserCheck, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { MedicalService, DoctorProfile, AppointmentRecord } from '../data/mockMedicalData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: MedicalService[];
  doctor: DoctorProfile;
  initialServiceId?: string;
  onBookingConfirmed: (appointment: AppointmentRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  doctor,
  initialServiceId,
  onBookingConfirmed
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || (services[0]?.id || '')
  );
  const [selectedFormat, setSelectedFormat] = useState<'In-Person' | 'Telehealth'>('In-Person');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Patient fields
  const [patientName, setPatientName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isNewPatient, setIsNewPatient] = useState<boolean>(true);
  const [reasonForVisit, setReasonForVisit] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Confirmed booking record
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);

  // Sync initialServiceId when modal opens
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      const s = services.find(item => item.id === initialServiceId);
      if (s && s.format === 'Telehealth') {
        setSelectedFormat('Telehealth');
      } else {
        setSelectedFormat('In-Person');
      }
    }
  }, [initialServiceId, services]);

  // Generate tomorrow and next 10 days for fast date picking
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Skip Sundays (0)
      if (d.getDay() !== 0) {
        dates.push({
          dateStr: d.toISOString().split('T')[0],
          dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
          monthDay: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
      }
    }
    return dates;
  }, []);

  // Initialize selectedDate on load
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].dateStr);
    }
  }, [availableDates, selectedDate]);

  const timeSlots = [
    '08:30 AM', '09:15 AM', '10:00 AM', '11:15 AM',
    '01:30 PM', '02:15 PM', '03:00 PM', '04:15 PM'
  ];

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleNextToStep2 = () => {
    setStep(2);
  };

  const handleNextToStep3 = () => {
    if (!selectedTimeSlot) {
      setErrorMsg('Please select a preferred appointment time slot.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address for confirmation.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please provide a contact phone number.');
      return;
    }

    setErrorMsg('');
    const referenceCode = `AC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: AppointmentRecord = {
      id: `apt-${Date.now()}`,
      referenceCode,
      serviceId: currentService.id,
      serviceName: currentService.name,
      format: selectedFormat,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      patientName,
      email,
      phone,
      isNewPatient,
      reasonForVisit: reasonForVisit || 'General Medical Consultation',
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setConfirmedBooking(newAppointment);
    onBookingConfirmed(newAppointment);
    setStep(4);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AuraCare Health//Dr. Sarah Jenkins//EN
BEGIN:VEVENT
SUMMARY:Medical Appointment with Dr. Sarah Jenkins
DESCRIPTION:${confirmedBooking.serviceName} (${confirmedBooking.format}) - Ref: ${confirmedBooking.referenceCode}
LOCATION:${confirmedBooking.format === 'In-Person' ? doctor.clinicAddress : 'Secure Video Telehealth Portal'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appointment-${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-bold text-[#172B4D]">
              Book an Appointment
            </h3>
            <p className="text-xs text-slate-500">
              {doctor.name}, {doctor.title} · {doctor.clinicName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className={step >= 1 ? 'text-[#1769AA]' : ''}>1. Service</span>
            <span>&rarr;</span>
            <span className={step >= 2 ? 'text-[#1769AA]' : ''}>2. Date & Time</span>
            <span>&rarr;</span>
            <span className={step >= 3 ? 'text-[#1769AA]' : ''}>3. Patient Info</span>
          </div>
        )}

        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Select Service & Format */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-2">
                  Select Consultation Type
                </label>
                <div className="space-y-2">
                  {services.map((s) => (
                    <label
                      key={s.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedServiceId === s.id
                          ? 'border-[#1769AA] bg-blue-50/50 ring-1 ring-[#1769AA]/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="service"
                          checked={selectedServiceId === s.id}
                          onChange={() => setSelectedServiceId(s.id)}
                          className="mt-1 text-[#1769AA] focus:ring-[#1769AA]"
                        />
                        <div>
                          <div className="text-sm font-bold text-[#172B4D]">{s.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{s.duration} · {s.shortDesc}</div>
                        </div>
                      </div>
                      <div className="text-sm font-extrabold text-[#172B4D] tabular-nums shrink-0 ml-3">
                        ${s.price}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consultation Format Choice */}
              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-2">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('In-Person')}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      selectedFormat === 'In-Person'
                        ? 'border-[#1769AA] bg-blue-50/50 text-[#1769AA]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">In-Person Visit</div>
                      <div className="text-[11px] text-slate-500">At SF Clinic Suite 320</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFormat('Telehealth')}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      selectedFormat === 'Telehealth'
                        ? 'border-[#20A39E] bg-teal-50/50 text-[#20A39E]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Video className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Telehealth Video</div>
                      <div className="text-[11px] text-slate-500">HIPAA Secure Browser Link</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextToStep2}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] transition-all cursor-pointer"
                >
                  Continue to Select Date &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Available Time Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-2">
                  Select Preferred Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {availableDates.map(item => (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(item.dateStr);
                        setSelectedTimeSlot('');
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDate === item.dateStr
                          ? 'border-[#1769AA] bg-[#1769AA] text-white shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-xs uppercase font-medium">{item.dayName}</div>
                      <div className="text-xs font-bold mt-0.5">{item.monthDay}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-2">
                  Available Consultation Slots ({selectedFormat})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'border-[#20A39E] bg-[#20A39E] text-white shadow-xs'
                          : 'border-slate-200 hover:border-teal-300 text-slate-700 bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Selected: <strong>{currentService.name}</strong></span>
                <span className="font-bold text-[#1769AA]">${currentService.price}</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={handleNextToStep3}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] transition-all cursor-pointer"
                >
                  Enter Patient Details &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                  Patient Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1.5">
                  Patient Status
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="patientStatus"
                      checked={isNewPatient}
                      onChange={() => setIsNewPatient(true)}
                      className="text-[#1769AA]"
                    />
                    <span>New Patient (First visit with Dr. Jenkins)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="patientStatus"
                      checked={!isNewPatient}
                      onChange={() => setIsNewPatient(false)}
                      className="text-[#1769AA]"
                    />
                    <span>Returning Patient</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                  Reason for Consultation / Symptoms (Confidential)
                </label>
                <textarea
                  rows={3}
                  value={reasonForVisit}
                  onChange={(e) => setReasonForVisit(e.target.value)}
                  placeholder="Briefly describe your primary symptoms or goals for this consultation..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                />
              </div>

              {/* Summary box */}
              <div className="p-3.5 rounded-xl bg-[#F5F8FB] border border-slate-200/80 text-xs space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Service:</span>
                  <span className="font-semibold">{currentService.name}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Date & Slot:</span>
                  <span className="font-semibold">{selectedDate} at {selectedTimeSlot} ({selectedFormat})</span>
                </div>
                <div className="flex justify-between text-slate-800 font-bold pt-1 border-t border-slate-200">
                  <span>Consultation Fee:</span>
                  <span className="text-[#1769AA]">${currentService.price}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#20A39E] hover:bg-[#177e7a] transition-all cursor-pointer shadow-sm"
                >
                  Confirm & Schedule Visit
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#172B4D]">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Reference Code: <strong className="font-mono text-slate-900">{confirmedBooking.referenceCode}</strong>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5F8FB] border border-slate-200 text-left text-xs sm:text-sm space-y-2">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.patientName}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.format}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between text-slate-700 pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {confirmedBooking.format === 'In-Person' ? doctor.clinicAddress : 'Secure Video Telehealth Portal'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 max-w-md mx-auto">
                A confirmation has been sent to <strong>{confirmedBooking.email}</strong> and SMS to <strong>{confirmedBooking.phone}</strong> with preparation guidance.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#1769AA] bg-blue-50 hover:bg-blue-100/80 border border-blue-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
