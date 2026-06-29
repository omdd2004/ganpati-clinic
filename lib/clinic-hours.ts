// lib/clinic-hours.ts
//
// Single source of truth for the clinic's opening hours logic.
// Used by:
//   - Hero.tsx        -> ring animation color (green = open, red = closed)
//   - AppointmentForm -> which time slots are selectable for a given date

export type TimeRange = { start: string; end: string }; // "HH:MM" 24-hour

// 0 = Sunday, 1 = Monday, ... 6 = Saturday (matches Date.getDay())
export const HOURS_BY_WEEKDAY: Record<number, TimeRange[]> = {
  0: [{ start: "09:00", end: "15:00" }, { start: "18:00", end: "19:30" }], // Sunday
  1: [{ start: "09:00", end: "15:00" }, { start: "18:00", end: "19:30" }], // Monday
  2: [{ start: "09:00", end: "12:00" }],                                   // Tuesday
  3: [{ start: "09:00", end: "15:00" }, { start: "18:00", end: "19:30" }], // Wednesday
  4: [{ start: "09:00", end: "15:00" }, { start: "18:00", end: "19:30" }], // Thursday
  5: [{ start: "09:00", end: "15:00" }, { start: "18:00", end: "19:30" }], // Friday
  6: [{ start: "09:00", end: "15:00" }, { start: "18:00", end: "19:30" }], // Saturday
};

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Is the clinic open right now (based on the visitor's local clock)? */
export function isClinicOpenNow(date: Date = new Date()): boolean {
  const ranges = HOURS_BY_WEEKDAY[date.getDay()] ?? [];
  const nowMin = date.getHours() * 60 + date.getMinutes();
  return ranges.some(
    (r) => nowMin >= toMinutes(r.start) && nowMin <= toMinutes(r.end)
  );
}

/** Returns the next 3 selectable dates: today, tomorrow, day after tomorrow. */
export function getBookableDates(): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [];
  const labels = ["Today", "Tomorrow", "Day after tomorrow"];
  for (let i = 0; i < 3; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const value = d.toISOString().split("T")[0]; // YYYY-MM-DD
    const weekday = d.toLocaleDateString("en-IN", { weekday: "short" });
    const dayMonth = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    out.push({ value, label: `${labels[i]} — ${weekday}, ${dayMonth}` });
  }
  return out;
}

/**
 * Returns selectable time options (15-minute steps) for a given YYYY-MM-DD
 * date string, restricted to the clinic's open hours for that weekday.
 * If the date is today, slots already in the past are excluded.
 */
export function getBookableTimeSlots(dateStr: string): { value: string; label: string }[] {
  if (!dateStr) return [];

  const date = new Date(dateStr + "T00:00:00");
  const ranges = HOURS_BY_WEEKDAY[date.getDay()] ?? [];

  const now = new Date();
  const isToday = dateStr === now.toISOString().split("T")[0];
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const slots: { value: string; label: string }[] = [];

  for (const range of ranges) {
    let m = toMinutes(range.start);
    const end = toMinutes(range.end);
    while (m <= end) {
      if (!isToday || m > nowMin) {
        const h = Math.floor(m / 60);
        const mm = m % 60;
        const value = `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
        const label = new Date(2000, 0, 1, h, mm).toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        slots.push({ value, label });
      }
      m += 15;
    }
  }

  return slots;
}
