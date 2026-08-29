---
name: hotel-selector
description: >-
  Hotel selection skill for the Travel Agency system. Uses a personalization-first,
  Multi-Criteria Decision Making (MCDM) framework to research, filter, score, and
  rank hotels in any target city. Produces a cost-benefit ranked shortlist with
  structured output (JSON/CSV) for downstream travel skills. Use when the user asks
  to "find hotels", "pick a hotel", "hotel search", "where should we stay",
  "hotel recommendations", "compare hotels", or any hotel selection task.
metadata:
  author: manuel-rodriguez
  version: '1.0'
  system: travel-agency
  module: lodging
---

# Hotel Selector

A personalization-first hotel selection engine using Multi-Criteria Decision Making (MCDM). This skill researches hotels in a target city, applies a rigorous multi-stage filtering and scoring pipeline, and delivers a ranked shortlist with a cost-benefit analysis.

## When to Use This Skill

Use this skill when the user asks to:

- Find, compare, or select hotels in a city
- Get hotel recommendations for an upcoming trip
- Evaluate hotel options for a family or group trip
- Run the hotel selection phase of a travel plan
- Produce a hotel shortlist for downstream itinerary planning

## Inputs

The skill requires at minimum a **target city**. The following inputs enhance results:

| Input | Required | Example |
|---|---|---|
| Target city | Yes | "Barcelona" |
| Travel dates | Recommended | "June 12–19, 2026" |
| Budget range (per night) | Recommended | "$150–$300" |
| Travel party | Recommended | "2 adults, 1 child (age 7)" |
| Preferences | Recommended | Collected in Step 0 |

---

## Pipeline Overview

```
Step 0: Preference Collection (Personalization-First)
  ↓
Step 1a: Research & Initial Filtering (Hard Thresholds)
  ↓
Step 1b: Additional Value Points (Soft Scoring)
  ↓
Step 2: ABSA Overlay (Optional)
  ↓
Step 3: Composite Scoring & Ranking
  ↓
Step 4: Output (Report + Structured Data)
```

---

## Step 0: Preference Collection (Personalization-First)

Personalization drives every decision. ABSA and aggregate scores are secondary — the user's specific values and trip context come first.

### Ask the user upfront:

Present these questions using the `ask_user_question` tool. Group them logically.

**Trip Context:**
- What is the primary purpose of this trip? (Leisure / Business / Celebration / Exploration)
- Who is traveling? (Solo / Couple / Family with kids — ages / Group of friends / Multi-generational family)
- What are your travel dates and budget per night?

**Hotel Vibe & Priorities:**
- What hotel vibe do you prefer? (Boutique & design-forward / Luxury chain / Historic & charming / Modern & minimal / Resort-style / No strong preference)
- Rank your top 3 priorities from this list:
  - Walkability to restaurants & nightlife
  - Pool or rooftop
  - Spa & wellness
  - On-site restaurant/bar quality
  - Room size & layout
  - Views (city, ocean, landmark)
  - Quiet & privacy
  - Kid-friendly amenities
  - Iconic/Instagram-worthy aesthetic

**Dealbreakers:**
- Any hard requirements? (e.g., must have pool, must be near X landmark, no hostels, must have parking)
- Any neighborhoods to avoid or prefer?

### Default / Express Mode

If the user says "use defaults", "you already know", or similar — check memory for stored preferences. If found, confirm them briefly and proceed. If not found, ask the questions above.

Store collected preferences in memory for future runs:
```
memory_update: "Remember that for hotel selection I prefer [vibe], prioritize [top 3], 
traveling as [party type], typical budget [range], dealbreakers: [list]"
```

---

## Step 1a: Research & Initial Filtering (Hard Thresholds)

### Research Phase

Search for hotels in the target city using web search. Use queries like:
- "best hotels in [city] [year]"
- "top rated hotels [city] TripAdvisor"
- "highly rated hotels [neighborhood] [city]"
- "[city] hotel recommendations [travel style, e.g. boutique/luxury/family]"

Aim to identify **15–25 candidate hotels** before filtering.

### Establish the Anchor Neighborhood

Before filtering individual hotels, determine the **Hub / Anchor Point neighborhood**:

1. Research the city's neighborhoods for safety, character, and proximity to key attractions
2. Identify 1–2 anchor neighborhoods that best match the user's trip purpose and priorities
3. Define acceptable adjacent neighborhoods (one ring out from the anchor)
4. Present the anchor neighborhood recommendation to the user with reasoning, and confirm before proceeding

**Neighborhood value criteria:**
- Safety reputation
- Proximity to trendy bars, restaurants, and attractions
- Walkability score
- Public transit access
- Match to the user's stated vibe/priorities

### Hard Filters (Pass/Fail)

Apply these filters to the candidate list. A hotel must pass ALL to survive:

| Filter | Threshold | Source |
|---|---|---|
| TripAdvisor Rating | >= 4.5 stars (Traveler Ranking) | TripAdvisor via web search |
| Google Rating | >= 4.3 stars (establish per-city threshold based on distribution) | Google via web search |
| Negative Review Sanity Check | No recurring critical themes (hygiene, safety, bait-and-switch) | Scan 1-2 star reviews |
| Neighborhood Fit | Within anchor neighborhood or approved adjacent areas | Map/location research |
| Construction / Remodel Date | Built or significantly remodeled within last 15 years (flexible — flag older properties, don't auto-reject if historic charm is a user priority) | Hotel website, reviews |
| Budget Fit | Within the user's stated budget range (per night) | Booking sites |

**Important:** The construction/remodel filter should be applied with judgment. If the user's vibe preference is "historic & charming," an older property that's well-maintained should not be penalized. Flag it for transparency but keep it in the pool.

After filtering, you should have **5–10 surviving candidates**. If fewer than 5, relax the weakest filter (typically Google rating threshold) and note the relaxation. If more than 10, tighten the neighborhood radius first.

---

## Step 1b: Additional Value Points (Soft Scoring)

For each surviving hotel, evaluate and score these qualitative dimensions. Each dimension is scored **1–5**.

### Scoring Rubric

Read the detailed scoring rubric from `references/scoring-rubric.md` before scoring.

| Dimension | Weight | What to Evaluate |
|---|---|---|
| Hotel Aesthetic | Personalized | Entrance, lobby design, concierge area, overall visual identity. Does it match the user's vibe preference? |
| Wow Factors | Personalized | Standout amenities: spas, rooftop bars, signature restaurants, infinity pools, unique architectural features. Evaluate against user's stated priorities. |
| Room Layout & Views | Personalized | Room size, layout functionality, bathroom quality, view type (city/ocean/garden/landmark). Match to party size and composition. |
| Photo Authenticity | Standard | Cross-reference traveler-uploaded photos against official hotel/facility photos. Penalize significant discrepancies. |
| Location Micro-Score | Personalized | Walking distance to the user's specific interests (restaurants, attractions, nightlife) from the anchor neighborhood analysis. |

### Personalized Weighting

Weights are derived from the user's Step 0 priorities:

- The user's **#1 priority** maps to the most relevant dimension(s) → weight = **3x**
- The user's **#2 priority** → weight = **2x**
- The user's **#3 priority** → weight = **1.5x**
- All other dimensions → weight = **1x**
- Photo Authenticity is always **1x** (integrity check, not preference)

### Photo Verification Process

For each hotel, compare:
1. Official website / booking site photos (lobby, rooms, pool, restaurant)
2. TripAdvisor traveler photos (search for the same areas)
3. Google Maps user photos

Score 1–5:
- **5**: Traveler photos match or exceed official photos
- **4**: Minor differences, generally accurate
- **3**: Noticeable differences but acceptable
- **2**: Significant discrepancies in key areas
- **1**: Misleading official photos — major red flag

---

## Step 2: ABSA Overlay (Optional)

**ABSA (Aspect-Based Sentiment Analysis) is an optional supplementary layer.** It never overrides the personalization-first scoring from Steps 1a and 1b. It serves as a data enrichment and sanity check.

### When to Apply ABSA

- **Default: ON** — Include ABSA in the output as an informational overlay
- The user can opt out by saying "skip ABSA", "no sentiment analysis", or similar
- ABSA weight in the composite score is capped at **10% maximum**

### ABSA Methodology

For each surviving hotel, analyze review text from TripAdvisor and Google to extract sentiment on these aspects:

| Aspect | What to Look For |
|---|---|
| Cleanliness | Room cleanliness, bathroom, common areas |
| Service | Staff friendliness, responsiveness, check-in experience |
| Location | Guest perception of neighborhood, walkability, safety |
| Value | Guests' sense of price-to-quality ratio |
| Rooms | Comfort, size, noise, bed quality, amenities |
| Food & Beverage | On-site dining quality, breakfast, bar |
| Facilities | Pool, gym, spa, business center condition |

For each aspect, assign a sentiment score:
- **Positive** (+1): Majority of mentions are favorable
- **Neutral** (0): Mixed or insufficient data
- **Negative** (-1): Majority of mentions are unfavorable

### ABSA Output Per Hotel

```
ABSA Sentiment Profile:
  Cleanliness:  +1 (Positive)
  Service:      +1 (Positive)
  Location:     +1 (Positive)
  Value:         0 (Neutral)
  Rooms:        +1 (Positive)
  Food & Bev:   -1 (Negative)  ⚠️ FLAG
  Facilities:    0 (Neutral)
  
  ABSA Composite: +3/7 → Normalized: 0.71
```

Flag any aspect with **Negative** sentiment as a warning in the final report.

### ABSA Integration into Composite Score

The ABSA normalized score (0.0–1.0) is multiplied by the ABSA weight (default 10%) and added to the composite. See Step 3 for the full formula.

---

## Step 3: Composite Scoring & Ranking

### Score Calculation

For each hotel that passed Step 1a:

```
Raw Value Score = Σ (Dimension Score × Personalized Weight)  [from Step 1b]
Normalized Value Score = Raw Value Score / Max Possible Score  → scale to 0–100

ABSA Score = ABSA Composite Normalized × 10  → scale to 0–10

Composite Score = Normalized Value Score (max 90 pts) + ABSA Score (max 10 pts)
```

If ABSA is disabled:
```
Composite Score = Normalized Value Score  → scale to 0–100
```

### Cost-Benefit Analysis

For each hotel, also compute:

```
Cost-Benefit Ratio = Composite Score / (Average Nightly Rate in USD)
```

This allows comparison of hotels at different price points. A $200/night hotel scoring 85 has a better cost-benefit ratio (0.425) than a $400/night hotel scoring 90 (0.225).

### Final Ranking

Rank hotels by **Composite Score** as the primary sort. Include Cost-Benefit Ratio as a secondary reference column.

---

## Step 4: Output

The skill produces **two outputs**: a human-readable report and a structured data file.

### 4A: Human-Readable Report (Markdown)

Present a markdown report with the following sections:

```markdown
# Hotel Selection Report: [City]
## Trip Profile
- Dates: [dates]
- Party: [party description]
- Budget: [range]
- Anchor Neighborhood: [neighborhood] — [why it was chosen]

## Ranked Shortlist

### 🥇 #1: [Hotel Name] — Score: [X]/100
- **Nightly Rate:** $[X]
- **Cost-Benefit Ratio:** [X]
- **Neighborhood:** [name] — [distance to anchor]
- **Why It Wins:** [2-3 sentence personalized explanation tied to user priorities]
- **Standout:** [single most impressive attribute]
- **Watch Out:** [any flag from ABSA or photo verification]

[Repeat for #2 through #5]

## Scoring Breakdown Table
| Hotel | Aesthetic | Wow Factor | Room/Views | Photo Auth | Location | ABSA | Composite | $/Night | Cost-Benefit |
|---|---|---|---|---|---|---|---|---|---|

## Methodology Notes
- Filters applied, any relaxations noted
- ABSA status (on/off) and weight used
- Neighborhoods considered and rejected
```

### 4B: Structured Data Output (JSON)

Save a JSON file to the workspace at `/home/user/workspace/travel-agency/hotel-selection-[city]-[date].json`

Read the output schema from `references/output-schema.md`.

The JSON file is designed to be consumed by downstream Travel Agency skills (flights, itinerary builder, budget tracker).

---

## Error Handling & Edge Cases

- **Fewer than 5 hotels pass filtering:** Relax filters in this order: Google rating threshold → neighborhood radius → construction date. Note each relaxation in the report.
- **No hotels pass filtering:** Report this to the user, suggest alternative neighborhoods or adjusted expectations, and ask if they want to re-run with relaxed criteria.
- **Budget mismatch:** If the anchor neighborhood has no hotels in budget, flag this tension and offer options (different neighborhood, adjusted budget, or mixed-stay strategy).
- **Insufficient review data:** If a hotel has very few reviews, flag it as "limited data" rather than penalizing or rewarding it. Exclude it from ABSA.
- **User overrides:** The user can override any filter or score at any time. Always respect explicit user preferences over algorithmic output.

---

## Integration with Travel Agency System

This skill is a **module** in the broader Travel Agency skill system. It is designed to:

- **Accept inputs from** upstream skills (destination selector, trip planner)
- **Produce outputs for** downstream skills (flight selector, itinerary builder, budget tracker)
- **Communicate via** structured JSON files saved to `/home/user/workspace/travel-agency/`

The JSON output includes all data downstream skills need: hotel name, location, nightly rate, check-in/check-out dates, and the composite score for priority weighting in itinerary construction.
