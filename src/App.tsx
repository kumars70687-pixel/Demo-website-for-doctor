/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { Specializations } from './components/Specializations';
import { Services } from './components/Services';
import { ClinicSpotlight } from './components/ClinicSpotlight';
import { Reviews } from './components/Reviews';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsDrawer } from './components/MyAppointmentsDrawer';
import { CustomizeModal } from './components/CustomizeModal';
import { 
  DEFAULT_DOCTOR_PROFILE, 
  DEFAULT_SPECIALIZATIONS, 
  DEFAULT_SERVICES, 
  DEFAULT_REVIEWS, 
  DoctorProfile, 
  Specialization, 
  MedicalService, 
  PatientReview, 
  AppointmentRecord 
} from './data/mockMedicalData';
import { doctorPortrait } from './assets/images';

export default function App() {
  // Doctor profile with local storage sync
  const [doctor, setDoctor] = useState<DoctorProfile>(() => {
    try {
      const saved = localStorage.getItem('auracare_doctor_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.portraitUrl || parsed.portraitUrl.includes('/src/assets/')) {
          parsed.portraitUrl = doctorPortrait;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DOCTOR_PROFILE;
  });

  const [specializations] = useState<Specialization[]>(DEFAULT_SPECIALIZATIONS);
  const [services] = useState<MedicalService[]>(DEFAULT_SERVICES);

  // Reviews with local storage sync
  const [reviews, setReviews] = useState<PatientReview[]>(() => {
    try {
      const saved = localStorage.getItem('auracare_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_REVIEWS;
  });

  // Appointments with local storage sync
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('auracare_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialBookingServiceId, setInitialBookingServiceId] = useState<string | undefined>(undefined);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);

  // Persist appointments
  useEffect(() => {
    try {
      localStorage.setItem('auracare_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  // Persist reviews
  useEffect(() => {
    try {
      localStorage.setItem('auracare_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Persist doctor
  useEffect(() => {
    try {
      localStorage.setItem('auracare_doctor_profile', JSON.stringify(doctor));
    } catch (e) {
      console.error(e);
    }
  }, [doctor]);

  const handleOpenBooking = (serviceId?: string) => {
    setInitialBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newApt: AppointmentRecord) => {
    setAppointments(prev => [newApt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleAddReview = (newRev: PatientReview) => {
    setReviews(prev => [newRev, ...prev]);
  };

  const handleSaveDoctor = (updated: DoctorProfile) => {
    setDoctor(updated);
  };

  const handleResetDoctor = () => {
    setDoctor(DEFAULT_DOCTOR_PROFILE);
    localStorage.removeItem('auracare_doctor_profile');
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#172B4D] flex flex-col font-sans selection:bg-[#20A39E] selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar
        doctor={doctor}
        onOpenBooking={() => handleOpenBooking()}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenMyAppointments={() => setIsAppointmentsOpen(true)}
        appointmentsCount={appointments.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          doctor={doctor}
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleScrollToServices}
        />

        {/* Doctor Profile & About Section */}
        <AboutDoctor
          doctor={doctor}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Medical Specializations Section */}
        <Specializations
          specializations={specializations}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Medical Services & Treatments Section */}
        <Services
          services={services}
          onSelectServiceAndBook={(svcId) => handleOpenBooking(svcId)}
        />

        {/* Clinic & Facility Spotlight */}
        <ClinicSpotlight doctor={doctor} />

        {/* Patient Reviews Section */}
        <Reviews
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Patient Guidance & FAQ */}
        <FaqSection />

        {/* Contact, Location & Operating Hours */}
        <ContactSection doctor={doctor} />
      </main>

      {/* Footer */}
      <Footer
        doctor={doctor}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        doctor={doctor}
        initialServiceId={initialBookingServiceId}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* My Appointments Drawer */}
      <MyAppointmentsDrawer
        isOpen={isAppointmentsOpen}
        onClose={() => setIsAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        doctor={doctor}
      />

      {/* Practice Details Customizer Modal */}
      <CustomizeModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        doctor={doctor}
        onSave={handleSaveDoctor}
        onReset={handleResetDoctor}
      />
    </div>
  );
}
