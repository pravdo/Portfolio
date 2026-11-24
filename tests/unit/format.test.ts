import { describe, expect, it } from "vitest";
import { formatRange, formatYearMonth } from "@/lib/format";

describe("formatYearMonth", () => {
  it("formats YYYY-MM as short month and year", () => {
    expect(formatYearMonth("2024-03")).toBe("Mar 2024");
    expect(formatYearMonth("2020-12")).toBe("Dec 2020");
  });

  it("handles present", () => {
    expect(formatYearMonth("present")).toBe("Present");
  });

  it("throws on garbage", () => {
    expect(() => formatYearMonth("soon")).toThrow();
  });
});

describe("formatRange", () => {
  it("joins with an en dash", () => {
    expect(formatRange("2023-01", "present")).toBe("Jan 2023 – Present");
  });
});
