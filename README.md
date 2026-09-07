# Advisor Dashboard

A responsive financial **Advisor Dashboard** built with **Next.js, React, Tailwind CSS, and react-force-graph-2d**.

## Features

* Responsive dashboard for **1440px desktop** and **375px mobile**
* Header with greeting, date/stats, and New Review button
* Today's Brief with action pills
* Clients Needing Attention with reusable `ClientCard` component
* Client data dynamically rendered from `content.json`
* RM Heartbeat with portfolio statistics and filter pills
* Interactive **RM → Client → Holdings** force-directed network graph
* Dashboard data served through `/api/dashboard`

## Tech Stack

* Next.js (App Router)
* React
* JavaScript / JSX
* Tailwind CSS
* `react-force-graph-2d`
* JSON API
* Vercel

## Project Structure

```text
app/
├── api/dashboard/route.js
├── page.js
└── globals.css

components/
├── ClientCard.jsx
├── NetworkGraph.jsx
├── TodaysBrief.jsx
└── ...

data/
└── content.json
```

## Getting Started

```bash
yarn install
yarn dev
```

Open:

```text
http://localhost:3000
```

## API

```http
GET /api/dashboard
```

Dashboard content is managed through:

```text
data/content.json
```

## Network Graph

The graph uses `react-force-graph-2d` to visualize:

```text
RM
 ↓
Clients
 ↓
Holdings
```

Node size and color represent different entity types.

## Deployment

The project is ready to deploy on **Vercel** using the default Next.js configuration.

## Scope

Static/non-functional elements intentionally include:

* Sidebar navigation
* Heartbeat filters
* Carousel arrows
* New Review button
* Client CTA actions

The focus is on **responsive UI, reusable components, JSON-driven content, API integration, and network visualization**.

## AI Tools

AI was used for development assistance including debugging, responsive styling, component refinement, and network graph configuration.

## Links

**GitHub:** `https://github.com/imranakhtar1786/dashboard`

**Live Demo:** `https://dashboard-swart-seven-33.vercel.app/`

**Time Spent:** `1.5 to 2 hours`
