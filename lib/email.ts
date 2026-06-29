import nodemailer from "nodemailer";

type AppointmentDetails = {
  patient_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
  message?: string | null;
};

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });
  }
  return transporter;
}

/**
 * Sends an email to the clinic's admin inbox whenever a new appointment
 * is booked, using Gmail SMTP (free, no domain or DLT registration needed,
 * can send to any recipient address).
 */
export async function sendAppointmentEmail(details: AppointmentDetails) {
  const mailer = getTransporter();
  const toEmail = process.env.ADMIN_EMAIL;
  const gmailUser = process.env.GMAIL_USER;

  // If email isn't configured, silently skip — booking still succeeds.
  if (!mailer || !toEmail || !gmailUser) {
    console.log("Email notification skipped: Gmail SMTP not configured.");
    return;
  }

  const html = `
    <h2>New Appointment Booked</h2>
    <p><strong>Patient:</strong> ${escapeHtml(details.patient_name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(details.phone)}</p>
    <p><strong>Date:</strong> ${escapeHtml(details.appointment_date)}</p>
    <p><strong>Time:</strong> ${escapeHtml(details.appointment_time)}</p>
    <p><strong>Service:</strong> ${escapeHtml(details.service)}</p>
    ${details.message ? `<p><strong>Message:</strong> ${escapeHtml(details.message)}</p>` : ""}
  `;

  await mailer.sendMail({
    from: `"Ganpati Sonography & X-Ray Clinic" <${gmailUser}>`,
    to: toEmail,
    subject: `New Appointment: ${details.patient_name}`,
    html,
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
