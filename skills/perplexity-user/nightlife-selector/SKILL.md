---
name: nightlife-selector
description: >-
  Finds nightlife options for a destination using Resident Advisor, Dice,
  Time Out, Songkick, and Bandsintown. Event and discovery led rather than
  strict price-quality scoring. Produces curated picks with structured output
  (JSON/CSV) for downstream travel skills. Use when the user wants parties,
  concerts, DJ sets, club nights, live events, nightlife plans, "what to do
  at night", or same-night/trip-night planning.
metadata:
  author: manuel-rodriguez
  version: '1.0'
  system: travel-agency
  module: nightlife
---

# Nightlife Selector

An event-first nightlife discovery engine for the Travel Agency system. Unlike restaurant and bar selectors, this skill is discovery/event-led rather than filter-heavy. It focuses on sourcing and curating current nightlife events, then ranking by relevance and vibe fit.

## When to Use This Skill

Use this skill when the user:

- Wants nightlife, parties, shows, concerts, or events
- Asks "what to do at night" in a city
- Wants a same-night or trip-night plan
- Is looking for DJ sets, club nights, electronic music, or live music
- Wants dancing, clubbing, or party recommendations
- Needs nightlife options as part of a broader trip plan

## Inputs Required

| Input | Required | Example |
|---|---|---|
| Destination (city) | Yes | "Berlin" |
| Dates | Strongly recommended (nightlife is time-sensitive) | "Friday July 10 – Sunday July 12" |
| Style / vibe | Optional | "Electronic music," "live jazz," "queer nightlife," "chill" |
| User-found event or venue | Optional | "I saw Berghain has a Panorama Bar night on Saturday" |

---

## Hard Rules

1. **Prioritize date-specific events when dates are known.** Nightlife is ephemeral — a great club night only matters if it's happening when the user is there.
2. **If no date is given**, prioritize evergreen nightlife institutions plus currently active event platforms. Note that event schedules need a final live check closer to the date.
3. **Do not force a strict restaurant/bar-style scoring system.** Keep ranking lighter and more qualitative.
4. **Separate venue recommendations from actual scheduled events.** A venue is a place; an event is a specific night/lineup. Present both, but distinguish them clearly.
5. **If the user wants dancing, clubbing, concerts, or parties — this is the right skill.** Do not route to bar-selector.
6. **Never fabricate event lineups, dates, or ticket prices.** If you cannot verify an event is currently scheduled, say so.

---

## Source Priority

| Priority | Source | Best For |
|---|---|---|
| 1 | **Resident Advisor** | Club nights, electronic music, underground/alternative events. The primary source for DJ culture. |
| 2 | **Dice** | Live events, club nights, ticketed nightlife. Strong in European and North American cities. |
| 3 | **Time Out** | Local nightlife roundups, "best clubs," city-specific curation. Good for mainstream + curated picks. |
| 4 | **Songkick** | Concerts and live music events by date and city. |
| 5 | **Bandsintown** | Touring artist discovery, live music by location. |

### Source Notes
- If a source has no coverage for the destination, skip it.
- For destinations strong in electronic music (Berlin, Amsterdam, Ibiza, Tbilisi, etc.), weight Resident Advisor heavily.
- For concert-focused queries, weight Songkick and Bandsintown.
- Time Out serves as a good generalist/backup across cities.

---

## Research Workflow

### 1. Establish Context
- Identify the city and specific dates (day of week matters enormously for nightlife).
- Note the user's style preference if stated.
- Check if trip context exists from upstream skills (hotel neighborhood, restaurant/bar plans).

### 2. Search Event Platforms (Date-Specific)
If dates are known:
- Search Resident Advisor for events in the city on those dates:
  - `"[city] events [date] site:ra.co"` or browse RA's event listings
- Search Dice for ticketed events:
  - `"[city] events [date] site:dice.fm"`
- Search Songkick and Bandsintown for live music:
  - `"[city] concerts [date range]"`

### 3. Search Editorial Sources (Venue Discovery)
- Use Time Out for "best clubs" and "best nightlife" in the city.
- Use Resident Advisor venue guides for institutional clubs and recurring parties.
- Note which venues are destination-worthy regardless of specific lineup.

### 4. Merge & Deduplicate
- Merge events from all sources.
- Deduplicate (same event may appear on RA and Dice).
- Keep the richer listing (more detail, lineup info, ticket link).

### 5. Categorize Results
Group results into three categories:

| Category | Description |
|---|---|
| **Club / Party** | DJ nights, club events, dance parties, raves |
| **Concert / Live Show** | Ticketed performances, live bands, touring artists |
| **General Nightlife Event** | Themed nights, bar crawls, cultural events, comedy, cabaret |

### 6. Rank by Relevance
- Apply the lightweight ranking logic (see Ranking Logic below).
- Select best bets for each night of the trip.

---

## User Intelligence Layer

### Two Modes

**Closed Mode:** The user includes a specific venue, artist, party, or event they already found. Include it as a priority pick and build the night around it.

**Open Mode:** Infer likely fit from context.

| Signal | What to Infer |
|---|---|
| Dancing vs. listening | Club night vs. concert vs. seated show |
| Big-name act vs. local scene | Headline DJ/artist vs. underground/local discovery |
| Ticketed event vs. flexible night | Fixed commitment vs. spontaneous options |
| Structured plan vs. spontaneous | "Plan my Saturday night" vs. "what's happening?" |
| Early evening vs. late-night | Dinner-show combo vs. midnight-to-dawn |
| Solo vs. group energy | Intimate venue vs. big crowd |

---

## Ranking Logic

Keep this **lighter than restaurants/bars.** Nightlife is more subjective and event-dependent.

### Dimensions (not strictly weighted — use as a qualitative framework)

| Dimension | What to Assess |
|---|---|
| **Relevance to Stated Vibe** | Does this match what the user asked for? Electronic fan → RA-sourced club night scores high. |
| **Timeliness / Date Fit** | Is this actually happening on a night the user is in town? Confirmed events score higher than "usually good on Saturdays." |
| **Source Credibility** | RA-featured event > random flyer. Dice-ticketed > unverified listing. |
| **Venue / Event Distinctiveness** | Is this a destination experience? Berghain, Fabric, or a legendary local spot. vs. generic club. |
| **Ticket / Access Practicality** | Can they actually get in? Ticket availability, door policy, price, advance booking requirements. |

### Ranking Approach
- For each night of the trip, identify 2–3 best bets.
- Label the top pick for each event category.
- Flag any "don't miss" events (notable artists, rare parties, limited capacity).
- Provide a backup option for each night in case plans change.

---

## Output Format

### Human-Readable Report (Markdown)

```markdown
# Nightlife Guide: [City] — [Date Range]

## Overview
- [1-2 sentence summary of the nightlife scene and what's happening during the trip]

## Friday Night [Date]

### 🎧 Best Party: [Event Name] @ [Venue]
- **Type:** Club / DJ night
- **Time:** 11pm–6am
- **Lineup:** [artists if known]
- **Tickets:** [price / availability / link]
- **Why:** [2 sentence rationale]
- **Source:** [Resident Advisor / Dice / etc.]

### 🎵 Best Concert: [Event Name] @ [Venue]
- [same format]

### 🔄 Flexible Backup: [Venue or Event]
- [same format]

## Saturday Night [Date]
[repeat structure]

## Venue Guide (Evergreen)
If the trip includes nights without confirmed events, these are the city's
strongest nightlife institutions:
- [Venue 1]: [1-line description]
- [Venue 2]: [1-line description]

## Sources Used
- [list with notes]
```

### Structured Data Output (JSON)

Save to: `/home/user/workspace/travel-agency/nightlife-selection-[city]-[date].json`

Read the full schema from `references/sources.md` (JSON schema section).

---

## Edge Cases

| Scenario | How to Handle |
|---|---|
| **No dates given** | Provide "usually good bets" (venue guide) plus note that event schedules need a final live check. Mark confidence as lower for event-specific picks. |
| **City has weak coverage on one platform** | Lean on other sources. Note which platforms had limited data. |
| **Nothing compelling appears for a specific night** | Return the strongest venues or recurring event organizers instead of weak one-off events. Be honest: "Tuesday nightlife in [city] is quiet — here are your best options." |
| **User wants something very niche** | Search beyond standard sources if needed (e.g., queer nightlife blogs, jazz-specific listings). Note expanded source set. |
| **Events are sold out** | Flag as sold out but still mention them (user may find resale or last-minute tickets). Provide alternatives. |
| **Overlap with bar-selector** | If a venue is primarily a bar with occasional events, it belongs in bar-selector. If the event is the draw (not the venue's bar program), it belongs here. |

---

## Stop Conditions

**Ask ONE question only** if it would radically change the output:

- "What dates are you going out?" (if no dates provided and the city is event-dependent)

Do not ask about style if it's reasonably inferable from trip context. Proceed with assumptions and note them.

---

## Integration with Travel Agency System

This skill is a **module** in the broader Travel Agency skill system.

- **Accepts inputs from:** hotel-selector (base neighborhood), bar-selector (post-bar continuation)
- **Produces outputs for:** itinerary builder, budget tracker, content generator
- **Communicates via:** structured JSON files saved to `/home/user/workspace/travel-agency/`
- **Coordinates with:** bar-selector (handoff for venues that are primarily bars), restaurant-selector (dinner-to-nightlife sequencing)
