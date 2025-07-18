import { differenceInYears, parse } from "date-fns";

export const today = new Date();
export const min18Years = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
)
  .toISOString()
  .split("T")[0];

export const todaysDate = new Date().toISOString().split("T")[0];

export function calculateYearsBetween(
  startDate: string | Date,
  endDate: Date = new Date()
): number {
  try {
    const parsedStartDate =
      typeof startDate === "string"
        ? parse(startDate, "yyyy-MM-dd", new Date())
        : startDate;

    return differenceInYears(endDate, parsedStartDate);
  } catch (error) {
    console.error("Error calculating years between dates:", error);
    return 0;
  }
}

export function isLessThanYearsAgo(
  dateString: string,
  years: number = 5
): boolean {
  if (!dateString) return true;

  return calculateYearsBetween(dateString) < years;
}

export function generateYearOptions(
  startYear = 1950,
  endYear = new Date().getFullYear() + 1
): { label: string; value: string }[] {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
}
