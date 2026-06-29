type AppointmentDetails = {
  patient_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
  message?: string | null;
};

/**
 * Sends an email to the clinic's admin inbox whenever a new appointment
 * is booked, using Resend (https://resend.com). No DLT/registration
 * required, unlike SMS to Indian numbers — just an API key.
 */
export async function sendAppointmentEmail(details: AppointmentDetails) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  // If email isn't configured, silently skip — booking still succeeds.
  if (!apiKey || !toEmail) {
    console.log("Email notification skipped: Resend not configured.");
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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject: `New Appointment: ${details.patient_name}`,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API error (${res.status}): ${errorText}`);
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
