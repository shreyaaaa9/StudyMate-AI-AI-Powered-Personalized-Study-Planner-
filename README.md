# StudyMate AI — Personalized Study Planner

An AI-powered study planner built with React + Claude AI.

## Features

- **Dashboard** — stats, weekly study chart, subject progress, today's plan & streak
- **Subjects** — track progress, exam dates, topics, hours per subject (editable sliders)
- **Schedule** — weekly time-block calendar with add/remove blocks
- **Tasks** — full task manager with difficulty, duration, due dates, filters
- **Exams** — countdown cards with tips per urgency level + timeline
- **AI Planner** — live chat with Claude AI, aware of your subjects & tasks

## Setup

```bash
cd studymate
npm install
npm start
```

App opens at http://localhost:3000

## Tech Stack

- React 18
- Recharts (study hours bar chart)
- Lucide React (icons)
- date-fns (date utilities)
- Claude API (AI Planner — claude-sonnet-4-6)
- localStorage (all data persists across sessions)

## Project Structure

```
src/
  App.js              # Root — routing, shared state, localStorage
  data.js             # Initial seed data & constants
  hooks/
    useLocalStorage.js
  utils/
    helpers.js        # Date, color, formatting utilities
  components/
    Sidebar.jsx       # Nav sidebar with streak widget
  pages/
    Dashboard.jsx     # Overview with charts & today's plan
    Subjects.jsx      # Subject cards with progress sliders
    Schedule.jsx      # Day-grouped time blocks
    Tasks.jsx         # Task list with filters & completion
    Exams.jsx         # Countdown cards + timeline
    AIPlanner.jsx     # Live Claude AI chat
```

## Customisation

Edit `src/data.js` to change initial subjects, tasks, and schedule blocks.
The AI system prompt in `AIPlanner.jsx` is automatically updated with live subject/task data.
