---
name: restaurant-selector
description: >-
  Finds and ranks restaurants for a destination using Infatuation, Eater,
  New York Times, Michelin, and region-specific sources, then applies price
  and quality filters plus user intelligence. Produces a scored shortlist with
  structured output (JSON/CSV) for downstream travel skills. Use when the user
  wants a restaurant shortlist, dining recommendations, "where should I eat",
  "best casual spots", "good affordable restaurants", or help deciding where
  to eat on a trip.
metadata:
  author: manuel-rodriguez
  version: '1.0'
  system: travel-agency
  module: dining
---

# Restaurant Selector

A personalization-first restaurant discovery and ranking engine for the Travel Agency system. Blends trusted editorial sources with price/quality filters and user intelligence to produce a trip-ready dining shortlist.

## When to Use This Skill

Use this skill when the user:

- Asks for restaurants in a city, neighborhood, or trip destination
- Wants "best casual spots," "good affordable restaurants," or "where should I eat"
- Wants a ranked shortlist, not just a raw list
- Has self-researched spots and wants them evaluated alongside curated picks
- Needs a dining plan as part of a broader trip

## Inputs Required

| Input | Required | Example |
|---|---|---|
| Destination (city or neighborhood) | Yes | "Barcelona" or "Gothic Quarter, Barcelona" |
| Trip context / dates | Recommended | "June 12–19, family trip" |
| Vibe / occasion | Optional | "Casual lunches and one nice dinner" |
| Cuisine preferences | Optional | "Seafood, tapas, no sushi" |
| Hard exclusions | Optional | "No prix fixe, nothing over $80/person" |
| Budget ceiling (per person) | Optional | "$40 casual, $80 splurge" |
| Dietary needs | Optional | "One vegetarian in the group" |
| Distance preference | Optional | "Walking distance from Gothic Quarter" |
| User-submitted restaurants | Optional | "I found Cal Pep and Cervecería Catalana" |

---

## Hard Rules

1. **Search by destination first**, then narrow to neighborhood if needed.
2. **Start with editorial/discovery sources** before broad web searching.
3. **Prioritize places that are both well-regarded and price-reasonable.** Do not recommend only expensive tasting-menu places unless the user explicitly asks for that.
4. **Include user-submitted spots** even if they do not appear in curated sources, but mark them clearly as "User-Provided" in the output.
5. **If a source has no coverage for the destination, skip it** without forcing it. Do not fabricate source coverage.
6. **Never hallucinate restaurant names, addresses, or ratings.** If you cannot verify a detail, omit it or flag it as unverified.

---

## Source Priority

Use these in this order unless the destination makes another source more appropriate:

| Priority | Source | What to Look For |
|---|---|---|
| 1 | **The Infatuation** | Search by city or neighborhood. Prioritize places rated **8.5 or above** when ratings are available. |
| 2 | **Eater** | City maps, neighborhood guides, "best restaurants" roundups. |
| 3 | **New York Times** | Travel/destination coverage, city guides. For niche destinations, use relevant travel/food articles if a formal guide does not exist. |
| 4 | **Michelin Guide** | Prioritize **Bib Gourmand first**, then Michelin-listed places that still meet price rules. See Michelin Price Rules below. |
| 5 | **Regional sources** (destination-dependent): | |
| | Japan: Tabelog | |
| | Thailand: Wongnai | |
| | China: Dianping | |
| | South Korea: Mango Plate | |
| | Europe: The Fork (for discovery or corroboration) | |

### Michelin Price Rules

Bib Gourmand is always preferred. For starred or listed restaurants:

| Source Price Scale | Include Up To |
|---|---|
| 4-level scale (€ to €€€€) | 2 or under (€, €€) |
| 3-level scale | 2 or under |
| 5-level scale | 3 or under |

Exclude clearly luxury-first options unless the user asks for splurge picks.

---

## Research Workflow

Follow these steps in order:

### 1. Establish Context
- Identify the destination and any neighborhood anchor.
- Note dates, party size, and vibe if provided.

### 2. Search Editorial Sources
- Query each source in priority order for the destination.
- For each source, search for city-level coverage first, then neighborhood-level if available.
- Use queries like:
  - `"best restaurants [city] site:theinfatuation.com"`
  - `"[city] restaurant guide site:eater.com"`
  - `"where to eat [city] site:nytimes.com"`
  - `"[city] bib gourmand site:guide.michelin.com"`

### 3. Pull Candidates
- Extract restaurant names, brief descriptions, price signals, and any ratings from each source.
- Aim for **15–25 candidates** across all sources before filtering.

### 4. Apply Quality Filter
- Infatuation: keep 8.5+ rated places (when ratings exist).
- Eater/NYT: keep places featured in curated lists or described with strong endorsement language.
- Michelin: keep Bib Gourmand and price-appropriate listings.
- Regional sources: use their native rating systems with equivalent thresholds.

### 5. Apply Price/Reasonableness Filter
- Remove places that exceed the user's budget ceiling.
- If no budget is given, infer moderate/value unless the user signals luxury.
- Apply Michelin price rules above.

### 6. Read Article Context
- Do not just scan titles. Read the editorial language and note phrases like:
  - "worth the money," "great value," "casual favorite"
  - "reliable," "best for groups," "locals go here"
  - "must-visit," "one of the best in the city"
- These phrases feed into the Editorial Strength score.

### 7. Add Validation Layers
- Cross-reference with Michelin or regional sources where relevant.
- Note places that appear in **multiple sources** (strong signal).

### 8. Add User-Submitted Places
- Include any restaurants the user provided.
- Research them through the same sources if possible.
- If they appear in curated sources, note that. If not, label them "User-Provided" and evaluate on available data.

### 9. Build Matrix & Rank
- Score each surviving candidate using the ranking matrix (see `references/scoring.md`).
- Compute weighted composite scores.
- Rank and select the top 3–7.

---

## User Intelligence Layer

This is the second major layer after source-based filtering. It personalizes the shortlist.

### Two Modes

**Closed Mode:** The user gives one or more non-negotiable places. Include them in the matrix and treat them as priority candidates regardless of source coverage.

**Open Mode:** The model uses full judgment to infer likely fit from:

| Signal | What to Infer |
|---|---|
| Budget realism | Are they looking for value, mid-range, or willing to splurge? |
| Trip style | Solo, couple, group, quick bite, celebratory dinner? |
| Cuisine curiosity vs. comfort | Adventurous eater or sticking to familiar territory? |
| Willingness to travel | Will they cross town for a great meal, or walkability is key? |
| Iconic vs. local | Tourist-famous spots or where locals actually eat? |
| Repeatability | "Great once" experience vs. "I'd go back every night" |

Apply these inferences to the User Fit dimension in the scoring matrix.

---

## Ranking Matrix

Read the detailed scoring rubric from `references/scoring.md` before scoring.

Score each candidate 1–5 on each dimension, then compute a weighted composite.

| Dimension | Weight | Description |
|---|---|---|
| Editorial Strength | 25% | How strongly trusted sources endorse it. Cross-source mentions, strength of language, list placement. |
| Price / Value | 25% | Whether it appears meaningfully affordable for its quality level. Great food at a fair price scores highest. |
| Quality Signal | 20% | Michelin/Bib status, high ratings, repeated inclusion across multiple sources. |
| User Fit | 15% | Match to stated preferences or inferred trip style from User Intelligence. |
| Destination Relevance | 10% | Whether it feels distinctive to that city/neighborhood. Local specialties and regional cuisine score higher. |
| Logistics | 5% | Reservation ease, location convenience, hours compatibility, walk-in friendliness. |

**User Priority Boost:** If a restaurant is user-submitted or explicitly requested, add a +0.5 bonus to its final weighted score (before normalization).

---

## Output Format

### Human-Readable Report (Markdown)

```markdown
# Restaurant Shortlist: [City]

## Trip Context
- Dates: [dates]
- Party: [description]
- Vibe: [stated or inferred]
- Budget: [stated or inferred]

## Top Picks

### 🥇 Best Overall: [Restaurant Name]
- **Cuisine:** [type]
- **Price:** [range per person]
- **Neighborhood:** [name]
- **Why:** [2-3 sentence rationale tied to user context]
- **Source:** [which editorial sources featured it]

### 💰 Best Value: [Restaurant Name]
- [same format]

### 🍽️ Best Signature Meal: [Restaurant Name]
- [same format]

### 🃏 Best User-Submitted Wildcard: [Restaurant Name] (if applicable)
- [same format]

[Additional picks as needed, up to 7 total]

## Scoring Matrix
| Restaurant | Editorial | Price/Value | Quality | User Fit | Destination | Logistics | Composite |
|---|---|---|---|---|---|---|---|

## Sources Used
- [List which editorial sources had coverage and which were skipped]
```

### Structured Data Output (JSON)

Save to: `/home/user/workspace/travel-agency/restaurant-selection-[city]-[date].json`

Read the full schema from `references/scoring.md` (JSON schema section).

---

## Edge Cases

| Scenario | How to Handle |
|---|---|
| **Thin destination coverage** | Use fewer sources, note that confidence is lower in the report. |
| **No strong affordable options in editorial lists** | Fall back to strongest value language from trusted articles. Widen the price filter slightly and flag it. |
| **No budget given** | Infer moderate/value unless the user signals luxury. |
| **No cuisine preference** | Optimize for broad trip usefulness and local distinctiveness. |
| **Sources conflict** | Prefer repeated cross-source mentions and stronger editorial language. Note the conflict in the report. |
| **User-submitted place has no editorial coverage** | Evaluate on Google/TripAdvisor reviews and available data. Label as "User-Provided, limited editorial data." |
| **Destination is very niche** | Use whatever credible sources exist. Regional sources become primary. Lower candidate count is acceptable (minimum 3). |

---

## Stop Conditions

**Pause and ask the user ONE question** if a single missing factor would radically change the shortlist:

- Budget (if completely unclear and the city has wide price variation)
- Neighborhood (if the city is large and no anchor is established)
- Dietary restriction (if hints suggest one but it's not confirmed)

**Do not ask multiple questions at once.** Pick the single most impactful unknown.

If no critical ambiguity exists, proceed with inferred defaults and note your assumptions.

---

## Integration with Travel Agency System

This skill is a **module** in the broader Travel Agency skill system.

- **Accepts inputs from:** hotel-selector (anchor neighborhood, trip dates, party info)
- **Produces outputs for:** itinerary builder, budget tracker, content generator
- **Communicates via:** structured JSON files saved to `/home/user/workspace/travel-agency/`
- **Coordinates with:** bar-selector (shared neighborhood context, avoid overlap in recommendations)
