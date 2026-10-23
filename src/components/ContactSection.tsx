import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, AlertTriangle, Send, CheckCircle2, Navigation, Compass } from 'lucide-react';
import { DoctorProfile } from '../data/mockMedicalData';

interface ContactSectionProps {
  doctor: DoctorProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ doctor }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState('Appointment Query');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Determine clinic open/closed status based on current time
  const clinicStatus = React.useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hour = now.getHours();

    if (day === 0) {
      return { isOpen: false, text: "Closed today (Sunday) · On-call triage available" };
    }
    if (day === 6) {
      if (hour >= 9 && hour < 13) {
        return { isOpen: true, text: "Open Now · Closes at 1:00 PM today" };
      }
      return { isOpen: false, text: "Closed · Reopens Monday at 8:00 AM" };
    }
    // Mon-Thu 8am-5pm, Fri 8am-3:30pm
    const closeHour = day === 5 ? 15.5 : 17;
    const currentDecHour = hour + now.getMinutes() / 60;
    if (currentDecHour >= 8 && currentDecHour < closeHour) {
      return { isOpen: true, text: `Open Now · Closes at ${day === 5 ? '3:30 PM' : '5:00 PM'}` };
    }
    return { isOpen: false, text: "Closed · Reopens tomorrow at 8:00 AM" };
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Emergency Medical Warning Banner */}
        <div className="mb-14 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
              Medical Emergency Advisory
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
              {doctor.emergencyNote} Online scheduling and messaging are intended strictly for routine and non-urgent outpatient medical care.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Hours, Location & Direct Lines */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#1769AA] uppercase tracking-wider">
                Visit & Connect
              </span>
              <h2 className="text-3xl font-bold text-[#172B4D] tracking-tight mt-1">
                Clinic Location & Hours
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Located conveniently in the Medical Heights district with direct transit access and validated parking.
              </p>
            </div>

            {/* Real-time Status Card */}
            <div className="p-4 rounded-xl bg-[#F5F8FB] border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-xs sm:text-sm font-bold text-[#172B4D]">{clinicStatus.text}</span>
              </div>
              <span className="text-xs font-mono text-slate-500">Local Time</span>
            </div>

            {/* Direct Contact List */}
            <div className="space-y-3.5">
              <div className="p-4 rounded-xl border border-slate-200/80 flex items-start gap-3.5 hover:border-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#172B4D] uppercase">Clinic Address</h3>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">{doctor.clinicName}</p>
                  <p className="text-xs text-slate-600">{doctor.clinicAddress}</p>
                  <p className="text-xs text-slate-600">{doctor.cityStateZip}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/80 flex items-start gap-3.5 hover:border-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#20A39E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#172B4D] uppercase">Appointments & Reception Desk</h3>
                  <a href={`tel:${doctor.phone.replace(/[^0-9]/g, '')}`} className="text-sm font-bold text-[#1769AA] hover:underline mt-0.5 block">
                    {doctor.phone}
                  </a>
                  <p className="text-xs text-slate-500">Direct phone triage during operating hours</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/80 flex items-start gap-3.5 hover:border-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#172B4D] uppercase">Patient Coordination Email</h3>
                  <a href={`mailto:${doctor.email}`} className="text-sm font-bold text-[#1769AA] hover:underline mt-0.5 block">
                    {doctor.email}
                  </a>
                  <p className="text-xs text-slate-500">For non-clinical administrative questions</p>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B4D] flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#1769AA]" />
                <span>Weekly Consultation Schedule</span>
              </h3>
              <div className="space-y-2 text-xs">
                {doctor.workingHours.map((wh, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-b-0">
                    <span className="font-medium text-slate-700">{wh.days}</span>
                    <span className="font-semibold text-slate-900 font-mono">{wh.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Patient Inquiry Form & Directions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="p-7 sm:p-8 rounded-2xl bg-[#F5F8FB] border border-slate-200/90 shadow-sm">
              <h3 className="text-xl font-bold text-[#172B4D]">
                Send an Inquiry or Medical Question
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Have a question regarding insurance coverage, pre-visit instructions, or clinical services? Our medical coordinator responds within 1 business day.
              </p>

              {formSubmitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-white border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-[#172B4D]">Inquiry Sent Successfully</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, {name}. A member of Dr. Jenkins' clinical staff will review your message and reach out to {email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-2 text-xs font-semibold text-[#1769AA] hover:underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Thomas Cole"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="thomas@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                    >
                      <option value="Appointment Query">Appointment Scheduling or Rescheduling</option>
                      <option value="Insurance Question">Insurance Coverage & In-Network Verification</option>
                      <option value="Telehealth Technical">Telehealth Consultation Instructions</option>
                      <option value="Medical Records">Medical Records or Superbill Request</option>
                      <option value="Other">General Clinical Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#172B4D] uppercase tracking-wide block mb-1">
                      Message / Question *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please enter your specific question (do not include highly sensitive personal identifiers)..."
                      className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#0f4c7d] transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Clinic</span>
                  </button>
                </form>
              )}
            </div>

            {/* Directions & Transit info box */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#20A39E] flex items-center justify-center shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172B4D]">Transit & Driving Directions</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Muni Metro Civic Center Station (3 min walk) · Validated underground parking entrance on Sutter St.
                  </p>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${doctor.clinicName} ${doctor.clinicAddress} ${doctor.cityStateZip}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#1769AA] bg-blue-50 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Open in Maps</span>
                <Compass className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
