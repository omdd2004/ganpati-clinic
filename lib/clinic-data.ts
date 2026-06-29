export const CLINIC = {
  name: "Ganpati Sonography & X-Ray Clinic",
  doctor: "Dr. Deepak Dandale",
  specialization: "Radiology & Diagnostic Imaging",
  phone: "+919209608601",
  phoneDisplay: "+91 92096 08601",
  whatsapp: "918530951675", // digits only, country code + number, no + or spaces
  addressLines: [
    "Municipal Staff Colony",
    "Behind Saijeevan Supershop",
    "Jamner Road, Bhusawal",
    "Maharashtra",
  ],
  mapsUrl: "https://maps.app.goo.gl/4CkG6pJo3GczeCpt6",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Ganpati+Sonography+%26+X-Ray+Clinic+Jamner+Road+Bhusawal&output=embed",
};

// Edit these to match Dr. Dandale's real qualifications and experience.
export const DOCTOR_CREDENTIALS = {
  name: "Dr. Deepak Dandale",
  qualifications: "MBBS, DMRD (Radiologist)",
  experience: "25 Years of Excellence",
  registration: "Maharashtra Medical Council Reg. No. XXXXXX",
  bio: "Dr. Deepak Dandale is a qualified radiologist (MBBS, DMRD) with 25 years of excellence in sonography and digital X-ray diagnostics, dedicated to providing accurate, timely reports with a patient-first approach.",
  highlights: [
    { label: "Years of Excellence", value: "25+" },
    { label: "Patients Served", value: "20,000+" },
    { label: "Report Turnaround", value: "Same Day" },
  ],
};

export const WORKING_HOURS = [
  { day: "Monday", slots: ["9:00 AM – 3:00 PM", "6:00 PM – 7:30 PM"] },
  { day: "Tuesday", slots: ["9:00 AM – 12:00 PM"] },
  { day: "Wednesday", slots: ["9:00 AM – 3:00 PM", "6:00 PM – 7:30 PM"] },
  { day: "Thursday", slots: ["9:00 AM – 3:00 PM", "6:00 PM – 7:30 PM"] },
  { day: "Friday", slots: ["9:00 AM – 3:00 PM", "6:00 PM – 7:30 PM"] },
  { day: "Saturday", slots: ["9:00 AM – 3:00 PM", "6:00 PM – 7:30 PM"] },
  { day: "Sunday", slots: ["9:00 AM – 3:00 PM", "6:00 PM – 7:30 PM"] },
];

export const SERVICES = [
  "Sonography / Ultrasound",
  "Digital X-Ray",
  "Pregnancy Sonography",
  "Abdomen Sonography",
  "Other",
];

export const GENDERS = ["Male", "Female", "Other"];
