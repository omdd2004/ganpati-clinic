type AppointmentDetails = {
  patient_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
};

export async function sendAppointmentSMS(details: AppointmentDetails) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const adminNumber = process.env.ADMIN_PHONE_NUMBER;

  // If SMS isn't configured, silently skip — booking still succeeds.
  if (!accountSid || !authToken || !fromNumber || !adminNumber) {
    console.log("SMS notification skipped: Twilio not configured.");
    return;
  }

  const body = [
    "New appointment booked!",
    `Patient: ${details.patient_name}`,
    `Phone: ${details.phone}`,
    `Date: ${details.appointment_date}`,
    `Time: ${details.appointment_time}`,
    `Service: ${details.service}`,
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
    throw new Error(`Twilio API error (${res.status}): ${errorText}`);
  }
}
