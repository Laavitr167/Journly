# Journly

**Pick a destination and a budget. Get a full trip plan.**

Journly is an AI-powered travel planner that turns a destination and budget into a complete itinerary: places to visit, food spots, and a day-by-day schedule, all shown on an interactive map. Sign in with Google to save your trips and come back to them later.

## Features

- **AI-generated itineraries** for any destination, tailored to your budget
- **Day-by-day schedule** with spots to see and places to eat
- **Interactive map** of every stop, built on OpenStreetMap
- **Save trips** to your account and revisit them anytime
- **Google sign-in** (no passwords to manage)

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js |
| AI | Gemini API |
| Maps & geocoding | Leaflet.js + OpenStreetMap (Nominatim) |
| Auth & database | Supabase (Google OAuth) |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with Google sign-in enabled
- A [Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

```bash
git clone https://github.com/Laavitr167/Journly.git
cd Journly
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Never commit `.env.local`. Make sure it is listed in your `.gitignore`.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Enter a destination and your budget.
2. The AI generates a trip: attractions, restaurants, and a daily plan.
3. Locations are geocoded with Nominatim and plotted on a Leaflet map.
4. Sign in with Google to save the trip to Supabase.

## Roadmap

- [ ] Edit and reorder stops in a saved trip
- [ ] Share a trip via link
- [ ] Export itinerary as PDF
- [ ] Free first trip, paid plan for more generations and saving

## Built With

Built entirely with [Claude Code](https://www.anthropic.com/claude-code).

## Author

**Laavitr Sahgal**
GitHub: [@Laavitr167](https://github.com/Laavitr167) · X: [@Lavi1212216](https://x.com/Lavi1212216)

## License

MIT
