/*
 * Task 2: Display Jakarta weather forecast for the next 5 days.
 * Uses OpenWeatherMap's free 5-day/3-hour forecast API
 */

const API_KEY = process.env.API_KEY;
const CITY = "Jakarta";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

interface ForecastEntry {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
}

interface ForecastResponse {
  list: ForecastEntry[];
  city: { name: string; country: string };
}

/** Group forecast entries by date string (YYYY-MM-DD). */
function groupByDate(entries: ForecastEntry[]): Map<string, ForecastEntry[]> {
  const grouped = new Map<string, ForecastEntry[]>();

  for (const entry of entries) {
    const date = entry.dt_txt.split(" ")[0];
    if (!grouped.has(date)) grouped.set(date, []);
    grouped.get(date)!.push(entry);
  }

  return grouped;
}

/** Compute the median of a numeric array — robust central tendency measure. */
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Pick the most frequent weather description for the day. */
function dominantWeather(entries: ForecastEntry[]): string {
  const freq = new Map<string, number>();

  for (const e of entries) {
    const desc = e.weather[0].description;
    freq.set(desc, (freq.get(desc) ?? 0) + 1);
  }

  return [...freq.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

async function main(): Promise<void> {
  if (!API_KEY) {
    console.error("Error: Please set API_KEY environment variable.");
    console.error("Usage: API_KEY=your_key npx tsx task2.ts");
    console.error("Get a free key at: https://openweathermap.org/api");
    process.exit(1);
  }

  const url = `${BASE_URL}?q=${CITY}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.text();
    console.error(`API Error (${response.status}): ${error}`);
    process.exit(1);
  }

  const data: ForecastResponse = await response.json();
  const dailyGroups = groupByDate(data.list);

  // Skip today (partial data), take next 5 days
  const today = new Date().toISOString().split("T")[0];
  const forecastDays = [...dailyGroups.entries()]
    .filter(([date]) => date !== today)
    .slice(0, 5);

  console.log(`\n  Weather Forecast — ${data.city.name}, ${data.city.country}`);
  console.log("  " + "═".repeat(48));
  console.log(
    `  ${"Date".padEnd(14)} ${"Temp (°C)".padEnd(12)} ${"Humidity".padEnd(10)} Condition`
  );
  console.log("  " + "─".repeat(48));

  for (const [date, entries] of forecastDays) {
    const temp = median(entries.map((e) => e.main.temp));
    const humidity = Math.round(median(entries.map((e) => e.main.humidity)));
    const weather = dominantWeather(entries);

    const dateStr = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    console.log(
      `  ${dateStr.padEnd(14)} ${temp.toFixed(1).padStart(5)}°C     ${String(humidity).padStart(3)}%      ${weather}`
    );
  }

  console.log("  " + "═".repeat(48) + "\n");
}

main();
