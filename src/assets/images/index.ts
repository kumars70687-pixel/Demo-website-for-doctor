import doctorPortrait from './doctor_portrait_1792776876062.jpg';
import clinicInterior from './clinic_interior_1792776876900.jpg';
import doctorConsultation from './doctor_patient_consultation_1792776877115.jpg';

export {
  doctorPortrait,
  clinicInterior,
  doctorConsultation
};

// Fallback resolver helper for images in case localStorage has old raw paths
export function resolveImageUrl(url: string | undefined, defaultFallback: string): string {
  if (!url) return defaultFallback;
  // If url was saved in localStorage as an old /src/assets/ path that fails in prod:
  if (url.includes('doctor_portrait')) return doctorPortrait;
  if (url.includes('clinic_interior')) return clinicInterior;
  if (url.includes('doctor_patient_consultation') || url.includes('consultation')) return doctorConsultation;
  return url;
}
