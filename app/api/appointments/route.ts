import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendAppointmentEmail } from "@/lib/email";
import { sendAppointmentWhatsApp } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      patient_name,
      phone,
      age,
      gender,
      appointment_date,
      appointment_time,
      service,
      message,
    } = body;

    if (
      !patient_name ||
      !phone ||
      !age ||
      !gender ||
      !appointment_date ||
      !appointment_time ||
      !service
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const ageNum = Number(age);
    if (!Number.isFinite(ageNum) || ageNum <= 0 || ageNum > 120) {
      return NextResponse.json(
        { error: "Please enter a valid age." },
        { status: 400 }
      );
    }

    const allowedGenders = ["Male", "Female", "Other"];
    if (!allowedGenders.includes(gender)) {
      return NextResponse.json(
        { error: "Please select a valid gender." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("appointments").insert({
      patient_name: String(patient_name).trim(),
      phone: String(phone).trim(),
      age: ageNum,
      gender: String(gender).trim(),
      appointment_date,
      appointment_time,
      service,
      message: message ? String(message).trim() : null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Could not save appointment. Please try again." },
        { status: 500 }
      );
    }

    // Notify the clinic by email. This never blocks or fails the booking —
    // if email sending has an issue, the appointment is still saved.
    try {
      await sendAppointmentEmail({
        patient_name: String(patient_name).trim(),
        phone: String(phone).trim(),
        age: ageNum,
        gender: String(gender).trim(),
        appointment_date,
        appointment_time,
        service,
        message: message ? String(message).trim() : null,
      });
    } catch (emailError) {
      console.error("Email notification error:", emailError);
    }

    // Notify the clinic by WhatsApp too. Also never blocks the booking.
    try {
      await sendAppointmentWhatsApp({
        patient_name: String(patient_name).trim(),
        phone: String(phone).trim(),
        age: ageNum,
        gender: String(gender).trim(),
        appointment_date,
        appointment_time,
        service,
      });
    } catch (whatsappError) {
      console.error("WhatsApp notification error:", whatsappError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Appointment API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
