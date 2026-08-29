---
name: bar-selector
description: >-
  Finds and ranks bars for a destination using top-bar prestige lists, Eater,
  Infatuation, New York Times, and user intelligence. Balances prestige with
  usability and value. Produces a scored shortlist with structured output
  (JSON/CSV) for downstream travel skills. Use when the user wants cocktail
  bars, wine bars, dive bars, lounges, hotel bars, rooftop bars, a bar
  shortlist, bar crawl planning, or "where should I drink".
metadata:
  author: manuel-rodriguez
  version: '1.0'
  system: travel-agency
  module: drinking
---

# Bar Selector

A discovery-and-ranking engine for bars that balances prestige signals with usability, value, and user fit. Operates independently — does not require restaurant context, but can coordinate with it.

## When to Use This Skill

Use this skill when the user:

- Asks where to drink in a city or neighborhood
- Wants cocktail bars, lounges, dive bars, wine bars, hotel bars, or rooftop bars
- Wants quality plus affordability, or quality plus vibe
- Has self-researched bars to compare
- Wants a bar crawl plan or nighttime drinking itinerary
- Needs a drinking shortlist as part of a broader trip

## Inputs Required

| Input | Required | Example |
|---|---|---|
| Destination (city or neighborhood) | Yes | "Mexico City" or "Roma Norte, CDMX" |
| Bar style | Optional | "Cocktail bars," "dive bars," "wine bars," "rooftop," "classic" |
| Price comfort | Optional | "$12–18 cocktails is fine, nothing over $25" |
| Trip context / dates | Optional | "Thursday–Sunday of a long weekend" |
| User-submitted bars | Optional | "I found Licorería Limantour and Baltra Bar" |
| Proximity to dinner area | Optional | "Near Roma Norte restaurants" — useful but never required |

---

## Hard Rules

1. **Operate independently by default.** Do not depend on restaurant context or hotel-selector output.
2. If nearby restaurant context is available (from restaurant-selector), it may inform neighborhood anchoring, but is never required.
3. **Flag bars that appear on major top-bar lists** before checking secondary sources. Prestige is a signal, not a sole decision-maker.
4. **Separate pure bars from dance-club or nightlife-event venues.** If a venue is primarily a club, live music venue, or event space, it belongs to nightlife-selector. Only include it here if it functions primarily as a bar with optional DJ sets.
5. **Balance prestige with usability and value.** A World's 50 Best bar that costs $30/cocktail should not dominate a shortlist for a budget-conscious user.
6. **Never hallucinate bar names, addresses, or list placements.** If you cannot verify, omit or flag.

---

## Source Priority

| Priority | Source | What to Look For |
|---|---|---|
| 1 | **World's 50 Best Bars** (or equivalent top-bar prestige lists) | Use as a prestige flag. Check if any destination bars appear on current or recent lists. |
| 2 | **The Infatuation** | Bar coverage for the destination. Look for bar-specific guides and reviews. |
| 3 | **Eater** | Bar maps, city drinking guides, "best bars" roundups. |
| 4 | **New York Times** | Travel/style/city coverage for notable bars. Cocktail culture pieces. |
| 5 | **User-provided bars** | Always include, research through available sources. |
| 6 | **Regional bar sources** | Add as relevant for specific destinations (e.g., local cocktail blogs, city guides). |

---

## Research Workflow

### 1. Establish Context
- Identify the destination and bar style if provided.
- Note dates, group size, and drinking occasion if available.

### 2. Check Prestige Lists
- Search World's 50 Best Bars (and equivalent lists like Asia's 50 Best, etc.) for any destination hits.
- Use queries like:
  - `"[city] world's 50 best bars"`
  - `"[city] best cocktail bars [year]"`
- Flag prestige hits — they get a scoring bonus but don't auto-qualify.

### 3. Search Editorial Sources
- Query Infatuation, Eater, and NYT for destination-specific bar coverage:
  - `"best bars [city] site:theinfatuation.com"`
  - `"[city] bar guide site:eater.com"`
  - `"[city] cocktail bars site:nytimes.com"`

### 4. Pull Candidates
- Extract bar names, style/type, price signals, and any ratings.
- Aim for **12–20 candidates** before filtering.

### 5. Filter: Bars vs. Clubs
- Remove venues that are primarily clubs, live music venues, or event spaces.
- Keep venues that are bars with occasional DJ sets or live music as background.
- When in doubt, check the venue's own description and recent reviews.

### 6. Apply Quality & Value Logic
- Keep bars with strong editorial endorsement or prestige placement.
- Remove bars where price is wildly out of line with the user's comfort.
- If no price comfort is stated, infer mid-range.

### 7. Add User-Submitted Bars
- Research them through available sources.
- Label as "User-Provided" if they lack editorial coverage.

### 8. Build Matrix & Rank
- Score using the ranking matrix (see `references/scoring.md`).
- Compute weighted composite scores.
- Select top 3–7 with style variety across the shortlist.

---

## User Intelligence Layer

### Two Modes

**Closed Mode:** The user has a must-visit bar. Include it in the matrix as a priority candidate.

**Open Mode:** The model infers best fit from available context.

| Signal | What to Infer |
|---|---|
| Serious cocktails vs. easy social drinking | Craft cocktail temple vs. casual spot with good drinks |
| Standing-room hype vs. comfort | Trendy packed bar vs. cozy seating with conversation |
| Iconic destination bar vs. neighborhood regular | Tourist-famous vs. where locals drink |
| Occasion | Pre-dinner, post-dinner, late-night, date-night, solo, group |
| Budget tolerance | One fancy round at a prestige bar vs. all-night drinking budget |
| Style preference | Speakeasy, rooftop, hotel bar, dive, natural wine, mezcalería |

Apply these inferences to the User Fit dimension in the scoring matrix.

---

## Ranking Matrix

Read the detailed scoring rubric from `references/scoring.md` before scoring.

Score each candidate 1–5 on each dimension, then compute a weighted composite.

| Dimension | Weight | Description |
|---|---|---|
| Editorial Strength | 25% | How strongly trusted sources endorse it. Cross-source mentions, feature placement, strength of language. |
| Prestige Signal | 20% | Placement on World's 50 Best or equivalent. Recent vs. historical placement. Bartender/industry recognition. |
| Price / Value | 20% | Whether drink prices feel reasonable for the experience. Great cocktails at fair prices score highest. |
| User Fit | 20% | Match to stated preferences or inferred drinking style, occasion, and vibe. |
| Distinctiveness / Memorability | 10% | Unique concept, signature drinks, distinctive space, or "only in [city]" quality. |
| Logistics | 5% | Location convenience, hours, reservation/walk-in policy, group-friendliness. |

**User Priority Boost:** If user-submitted or explicitly requested, add +0.5 to raw composite.

---

## Output Format

### Human-Readable Report (Markdown)

```markdown
# Bar Shortlist: [City]

## Context
- Dates: [dates]
- Style: [stated or inferred]
- Budget: [stated or inferred]

## Top Picks

### 🍸 Best Cocktail Bar: [Bar Name]
- **Style:** [cocktail / wine / dive / rooftop / etc.]
- **Price:** [avg cocktail price]
- **Neighborhood:** [name]
- **Why:** [2-3 sentence rationale]
- **Prestige:** [50 Best placement if applicable]
- **Source:** [editorial sources]

### 💰 Best Value Bar: [Bar Name]
- [same format]

### 🏆 Best Classic / Iconic: [Bar Name]
- [same format]

### 🌙 Best Late-Night Option: [Bar Name]
- [same format]

### 🃏 Best User-Submitted Wildcard: [Bar Name] (if applicable)
- [same format]

[Up to 7 total]

## Scoring Matrix
| Bar | Editorial | Prestige | Price/Value | User Fit | Distinctive | Logistics | Composite |
|---|---|---|---|---|---|---|---|

## Sources Used
- [list with notes on coverage depth]
```

### Structured Data Output (JSON)

Save to: `/home/user/workspace/travel-agency/bar-selection-[city]-[date].json`

Read the full schema from `references/scoring.md` (JSON schema section).

---

## Edge Cases

| Scenario | How to Handle |
|---|---|
| **Top-bar lists only surface ultra-expensive spots** | Keep them as prestige references but do not let them dominate the ranking. Ensure at least 2–3 value-oriented picks. |
| **City has weak international top-bar coverage** | Rely more heavily on Eater/Infatuation/NYT. Note that prestige data is limited. |
| **User asks for "bars" broadly** | Include style variety: at least one cocktail-forward, one casual/dive, one distinctive concept. |
| **Venue is a bar-club hybrid** | Include if it functions primarily as a bar. Exclude if the main draw is dancing/events — route to nightlife-selector. |
| **No price comfort stated** | Infer mid-range. Include one prestige splurge option clearly labeled. |
| **Thin editorial coverage** | Use Google/TripAdvisor reviews as supplementary data. Note lower confidence. |

---

## Stop Conditions

**Ask ONE question only** if a single missing factor would radically change the shortlist:

- "What kind of bar are you after?" (if style is completely ambiguous and the city has very different scenes)

**Do not ask multiple questions at once.** If the style is reasonably inferable from trip context, proceed with assumptions and note them.

---

## Integration with Travel Agency System

This skill is a **module** in the broader Travel Agency skill system.

- **Accepts inputs from:** hotel-selector (neighborhood anchor), restaurant-selector (dinner locations for post-dinner bar proximity)
- **Produces outputs for:** itinerary builder, budget tracker, content generator
- **Communicates via:** structured JSON files saved to `/home/user/workspace/travel-agency/`
- **Coordinates with:** restaurant-selector (shared neighborhood, avoid overlap), nightlife-selector (handoff for club/event venues)
