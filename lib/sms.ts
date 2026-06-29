type AppointmentDetails = {
  patient_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
};

/**
 * Sends an SMS to the clinic's admin number via MSG91 whenever a new
 * appointment is booked. Requires a DLT-approved SMS template in MSG91
 * (mandatory for sending SMS to Indian numbers) — see README for setup.
 */
export async function sendAppointmentSMS(details: AppointmentDetails) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  const senderId = process.env.MSG91_SENDER_ID;
  const adminNumber = process.env.ADMIN_PHONE_NUMBER;

  // If SMS isn't configured, silently skip — booking still succeeds.
  if (!authKey || !templateId || !senderId || !adminNumber) {
    console.log("SMS notification skipped: MSG91 not configured.");
    return;
  }

  // Strip a leading "+" and any non-digit characters; MSG91 expects numbers
  // like "919876543210" (country code + number, no plus sign).
  const mobile = adminNumber.replace(/[^0-9]/g, "");

  const res = await fetch("https://control.msg91.com/api/v5/flow/", {
    method: "POST",
    headers: {
      authkey: authKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template_id: templateId,
      sender: senderId,
      short_url: "0",
      recipients: [
        {
          mobiles: mobile,
          // These variable names must match the placeholders defined in
          // your approved MSG91 DLT template (e.g. ##patient##, ##date##).
          patient: details.patient_name,
          phone: details.phone,
          date: details.appointment_date,
          time: details.appointment_time,
          service: details.service,
        },
      ],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`MSG91 API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  if (data.type === "error") {
    throw new Error(`MSG91 API error: ${JSON.stringify(data)}`);
  }
}
