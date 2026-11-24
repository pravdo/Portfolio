const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2024-03" → "Mar 2024". Fixed locale + UTC so server output is deterministic. */
export function formatYearMonth(value: string): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) throw new Error(`Invalid YYYY-MM value: ${value}`);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

/** "Jan 2023 – Present" */
export function formatRange(start: string, end: string): string {
  return `${formatYearMonth(start)} – ${formatYearMonth(end)}`;
}
