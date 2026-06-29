type AppointmentDetails = {
  patient_name: string;
  phone: string;
  age: number;
  gender: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
};

/**
 * Sends a WhatsApp message to the clinic's admin number via Twilio's
 * WhatsApp Sandbox whenever a new appointment is booked. Requires the
 * admin's WhatsApp number to have joined the Twilio sandbox once
 * (see README for the one-time "join" step).
 */
export async function sendAppointmentWhatsApp(details: AppointmentDetails) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM; // e.g. whatsapp:+14155238886
  const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER; // e.g. whatsapp:+918530951675

  // If WhatsApp isn't configured, silently skip — booking still succeeds.
  if (!accountSid || !authToken || !fromNumber || !adminNumber) {
    console.log("WhatsApp notification skipped: Twilio WhatsApp not configured.");
    return;
  }

  const body = [
    "📅 *New Appointment Booked!*",
    `*Patient:* ${details.patient_name}`,
    `*Age:* ${details.age}`,
    `*Gender:* ${details.gender}`,
    `*Phone:* ${details.phone}`,
    `*Date:* ${details.appointment_date}`,
    `*Time:* ${details.appointment_time}`,
    `*Service:* ${details.service}`,
  ].join("\n");

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: adminNumber,
      From: fromNumber,
      Body: body,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Twilio WhatsApp API error (${res.status}): ${errorText}`);
  }
}
