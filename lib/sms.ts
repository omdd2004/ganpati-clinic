import twilio from "twilio";

type AppointmentDetails = {
  patient_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
};

let client: ReturnType<typeof twilio> | null = null;

function getClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return null;
  }

  if (!client) {
    client = twilio(accountSid, authToken);
  }
  return client;
}

export async function sendAppointmentSMS(details: AppointmentDetails) {
  const twilioClient = getClient();
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const adminNumber = process.env.ADMIN_PHONE_NUMBER;

  // If SMS isn't configured, silently skip — booking still succeeds.
  if (!twilioClient || !fromNumber || !adminNumber) {
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

  await twilioClient.messages.create({
    body,
    from: fromNumber,
    to: adminNumber,
  });
}
