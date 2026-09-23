# Journly — Claude Code Build Prompts

Use these in order. Run each one, review/test the output, then move to the next. Don't paste them all at once — Claude Code works best with one focused task at a time.

---

## Prompt 1 — Project Scaffold

```
Create a new Next.js 14 project (App Router, TypeScript, Tailwind CSS) called "journly".

Set up this structure:
- /app - routes
- /components - reusable UI components
- /lib - utility functions, API clients
- /types - shared TypeScript types

Install and configure:
- Tailwind CSS (already default with Next.js setup)
- A .env.local.example file with placeholders for: GEMINI_API_KEY, GOOGLE_MAPS_API_KEY

Create a minimal home page with just a title "Journly" and a "Plan a trip" button that doesn't do anything yet.

Set up a clean README explaining the project, the tech stack (Next.js, Gemini API, Google Maps API), and how to run it locally.
```

---

## Prompt 2 — Gemini Itinerary Schema & Generation Function

```
I'm building Journly, a trip planner. I need a function that calls the Gemini API to generate a structured travel itinerary.

Create /lib/gemini.ts with a function `generateItinerary(input)` where input has:
- destination: string
- budget: "budget" | "mid" | "luxury"
- days: number
- pace: "relaxed" | "packed"
- interests: string[] (e.g. ["food", "culture", "nature", "nightlife"])

The function should call the Gemini API using responseMimeType: "application/json" and a responseSchema so the output is guaranteed structured JSON, not free text.

Define a TypeScript type `Itinerary` in /types/itinerary.ts shaped like:
{
  destination: string,
  days: {
    day: number,
    theme: string,
    activities: {
      time: string,
      title: string,
      description: string,
      type: "sightseeing" | "food" | "activity"
    }[]
  }[]
}

Write a strong system/prompt instruction that tells Gemini to:
- return ONLY valid JSON matching the schema, no markdown, no commentary
- suggest realistic, well-known spots and food places for the destination
- balance activity density based on the "pace" input
- respect the budget tier when suggesting food/activities

Add basic error handling for malformed JSON responses (retry once, then throw a clear error).

Don't build any UI yet — just the working function, and a temporary test route /app/api/test-itinerary/route.ts I can hit to confirm it works.
```

---

## Prompt 3 — Trip Creation Flow (UI)

```
Build the trip creation flow for Journly.

Flow:
1. /app/plan/page.tsx — a short multi-step form (use simple client-side state, no external form library needed) asking:
   - Destination (text input)
   - Number of days (number input, 1-14)
   - Budget tier (budget / mid / luxury - button group)
   - Pace (relaxed / packed - button group)
   - Interests (multi-select chips: food, culture, nature, nightlife, shopping, adventure)
2. On submit, call the generateItinerary function from /lib/gemini.ts (server action or API route — your call on which fits Next.js App Router best)
3. Show a loading state with a short rotating message list ("Finding the best spots...", "Checking local food spots...", etc.) while it generates
4. On success, redirect to /app/trip/[id]/page.tsx (id can just be a temporary in-memory or query-param based id for now, no DB yet) showing the full itinerary in a clean day-by-day layout

Keep styling clean and minimal — use Tailwind, no heavy component library. Mobile-first layout since this will mostly be used on phones.

Don't build save/download or auth yet — this is view-only for now.
```

---

## Prompt 4 — Google Maps Enrichment

```
Enrich the generated Journly itinerary with real place data from Google Maps.

For each activity in the itinerary that has a specific place name, use the Google Places API (Text Search or Find Place) to fetch:
- coordinates (lat/lng)
- a photo reference (if available)
- rating (if available)
- opening hours (if available)

Create /lib/places.ts with a function `enrichItinerary(itinerary: Itinerary)` that takes the Gemini-generated itinerary and returns it with an added `place` object on each activity containing the above fields. Handle cases where a place isn't found gracefully (just leave place as null, don't break the flow).

Add a small map component (/components/TripMap.tsx) using Google Maps JS API that shows all the day's pins on a map, shown alongside the day-by-day list on the trip page.

Make sure the Google Maps API key is only used server-side for Places lookups where possible, and restrict any client-side map key usage appropriately — flag in a comment where I need to set up API key restrictions in Google Cloud Console.
```

---

## Prompt 5 — Preview + PDF Export (with paywall gate)

```
Add save and PDF export to Journly's trip page, gated behind a simple paywall stub.

On /app/trip/[id]/page.tsx:
- Show the full itinerary preview for free, always (no gating on viewing)
- Add two buttons: "Save this trip" and "Download PDF"
- Both buttons, when clicked, open a modal/paywall screen (not yet connected to real payment) that says something like "Loved this trip? Save it and generate more for $X" with a disabled/placeholder "Pay" button
- Add a code comment marking exactly where Stripe (or another provider) integration will go later

Build PDF generation using a client-side or server-side library (your call — pick something lightweight, e.g. @react-pdf/renderer or a simple print-to-PDF approach) so the PDF layout is ready even though it's behind the paywall stub for now.

Keep this modular — I want the paywall check to be a single reusable component/function I can later wire up to real payment logic without touching the rest of the app.
```

---

### Notes for you (not for Claude Code)
- Run Prompt 2's test route before moving to Prompt 3 — confirm Gemini is actually returning clean JSON for a few different destinations before building UI on top of it.
- Auth + a real database (Supabase) isn't in here yet — that's the natural Prompt 6 once the free-tier flow works end to end and you're ready to make "save" actually persist somewhere.
