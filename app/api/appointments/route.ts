import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patient_name, phone, appointment_date, appointment_time, service, message } = body;

    if (!patient_name || !phone || !appointment_date || !appointment_time || !service) {
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

    const { error } = await supabaseAdmin.from("appointments").insert({
      patient_name: String(patient_name).trim(),
      phone: String(phone).trim(),
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

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Appointment API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
