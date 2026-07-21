"use client";

import { DailyReadingExperience } from "@/components/fortune/DailyReadingExperience";

/** English "What Awaits You Today?" daily reading tool. */
export function DailyReading() {
  return <DailyReadingExperience locale="en" />;
}

DailyReading.displayName = "DailyReading";
