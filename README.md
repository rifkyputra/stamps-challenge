# Stamps Technical Challenge

## Prerequisites

- Node.js >= 18
- npm

## Setup

```bash
make install
```

## Task 1 — FooBar (Number Printer)

Print numbers 1–100 in reverse order with the following rules:

- Do not print prime numbers.
- Replace numbers divisible by 3 with the text "Foo."
- Replace numbers divisible by 5 with the text "Bar."
- Replace numbers divisible by both 3 and 5 with the text "FooBar."
- Print the numbers horizontally, not vertically.

**Algorithm:** Sieve of Eratosthenes — O(n log log n) prime generation, more efficient than trial division for range-based detection.

```bash
make task1
```

### Sample Output

```
Bar Foo 98 Foo Bar 94 Foo 92 91 FooBar 88 Foo 86 Bar Foo 82 ...
```

## Task 2 — Jakarta Weather Forecast

Display the weather forecast for Jakarta for the next 5 days using the [OpenWeatherMap API](https://openweathermap.org/api) (free tier).

**Algorithm:** Aggregates 3-hour interval data into daily summaries using median temperature (robust to outliers) and mode-based weather description (most frequent condition).

Please use the API provided at <http://openweathermap.org>.
Display the output as the weather forecast for Jakarta for the next 5 days.
Only show one temperature per day.
This task does not require a paid account.

### Get an API Key

1. Sign up at [openweathermap.org](https://openweathermap.org)
2. Copy your API key from the [API keys page](https://home.openweathermap.org/api_keys)
3. New keys may take ~10 minutes to activate

### Run

```bash
make task2 API_KEY=your_key_here
```

### Sample Output

```
  Weather Forecast — Jakarta, ID
  ════════════════════════════════════════════════
  Date           Temp (°C)    Humidity   Condition
  ────────────────────────────────────────────────
  Wed, Mar 11     28.3°C      72%      overcast clouds
  Thu, Mar 12     28.9°C      63%      clear sky
  Fri, Mar 13     29.0°C      56%      few clouds
  Sat, Mar 14     27.4°C      78%      overcast clouds
  Sun, Mar 15     27.8°C      69%      overcast clouds
  ════════════════════════════════════════════════
```

## Tech Stack

- TypeScript
- Node.js (native `fetch`)
- [tsx](https://github.com/privatenumber/tsx) — TypeScript runner
