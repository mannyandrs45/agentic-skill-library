# Restaurant Selector — Scoring Rubric & Output Schema

## Scoring Rubric (1–5 Scale)

### Editorial Strength (25%)

| Score | Criteria |
|---|---|
| 5 | Featured prominently in 3+ trusted sources. Strong endorsement language ("best in the city," "must-visit," "don't miss"). Top placement in curated lists. |
| 4 | Featured in 2 trusted sources with positive language. Included in city-level roundups. |
| 3 | Appears in 1 trusted source with moderate praise. Or appears in 2 sources without strong language. |
| 2 | Mentioned in passing or only in broad listicles. No strong editorial endorsement. |
| 1 | No editorial coverage found in priority sources. Only appears in user-generated review platforms. |

### Price / Value (25%)

| Score | Criteria |
|---|---|
| 5 | Exceptional quality at a price that feels like a steal. Frequently described as "great value," "worth every penny," or "unbeatable for the price." Well under the user's budget. |
| 4 | Good quality-to-price ratio. Comfortably within budget. Sources note value positively. |
| 3 | Fair price for what you get. At or near budget midpoint. No strong value commentary either way. |
| 2 | On the expensive side relative to quality. Near the top of the user's budget. Value is not a selling point. |
| 1 | Overpriced for what it delivers, or well above the user's budget ceiling. |

### Quality Signal (20%)

| Score | Criteria |
|---|---|
| 5 | Michelin Bib Gourmand or star (within price rules). Infatuation 9.0+. Consistently top-rated across platforms. |
| 4 | Infatuation 8.5+. Or Michelin-listed (Plate/recommended). Strong ratings on regional platforms. |
| 3 | Solid ratings (Infatuation 7.5–8.4, or equivalent). Positive but not exceptional signals. |
| 2 | Mixed signals. Some positive mentions but also notable criticism or inconsistency. |
| 1 | Weak quality signals. Low ratings, negative trends, or insufficient data to assess quality. |

### User Fit (15%)

| Score | Criteria |
|---|---|
| 5 | Perfect match for stated preferences AND inferred trip style. Cuisine, vibe, price, and occasion all align. |
| 4 | Strong match on most dimensions. Minor mismatch on one factor (e.g., slightly far but great cuisine match). |
| 3 | Reasonable fit. No red flags but not a standout match for this specific user/trip. |
| 2 | Partial mismatch. Cuisine or vibe doesn't align well, but quality carries it. |
| 1 | Poor fit for this user/trip. Included only because of exceptional quality or user submission. |

### Destination Relevance (10%)

| Score | Criteria |
|---|---|
| 5 | Quintessential to the destination. Serves local specialties or regional cuisine. "You can't come to [city] and not eat here." |
| 4 | Strong local identity. Features local ingredients, traditions, or neighborhood character. |
| 3 | Good restaurant that happens to be in this city but isn't distinctly tied to it. |
| 2 | Generic or international cuisine with little destination connection. |
| 1 | Could be anywhere. No local character, ingredients, or cultural relevance. |

### Logistics (5%)

| Score | Criteria |
|---|---|
| 5 | Walk-in friendly or easy reservations. Convenient location (near anchor neighborhood). Hours fit the trip schedule. Group-friendly if relevant. |
| 4 | Reservations recommended but available. Good location. Minor scheduling consideration. |
| 3 | Requires advance reservation. Moderate distance from anchor. Standard hours. |
| 2 | Hard to book, limited hours, or inconvenient location. Requires planning. |
| 1 | Extremely difficult to reserve, very far from base, or restrictive hours/policies. |

---

## Composite Score Calculation

```
Composite = (Editorial × 0.25) + (Price/Value × 0.25) + (Quality × 0.20) 
          + (User Fit × 0.15) + (Destination × 0.10) + (Logistics × 0.05)

Max possible = 5.00
```

**User Priority Boost:** If user-submitted or explicitly requested, add +0.5 to the raw composite before any normalization.

To express as a percentage: `(Composite / 5.00) × 100`

---

## JSON Output Schema

Save to: `/home/user/workspace/travel-agency/restaurant-selection-[city]-[date].json`

```json
{
  "meta": {
    "skill": "restaurant-selector",
    "version": "1.0",
    "city": "Barcelona",
    "country": "Spain",
    "run_date": "2026-04-19",
    "travel_dates": {
      "start": "2026-06-12",
      "end": "2026-06-19"
    },
    "party": {
      "adults": 2,
      "children": [{ "age": 7 }],
      "total_guests": 3
    },
    "budget_per_person": {
      "casual": 40,
      "splurge": 80,
      "currency": "USD"
    },
    "anchor_neighborhood": "Gothic Quarter",
    "sources_used": ["infatuation", "eater", "nytimes", "michelin"],
    "sources_skipped": []
  },
  "preferences": {
    "cuisines": ["seafood", "tapas"],
    "exclusions": ["sushi"],
    "dietary": ["one vegetarian"],
    "vibe": "casual lunches, one nice dinner",
    "user_submitted": ["Cal Pep", "Cervecería Catalana"]
  },
  "restaurants": [
    {
      "rank": 1,
      "name": "Restaurant Name",
      "cuisine": "Catalan / Seafood",
      "neighborhood": "Gothic Quarter",
      "price_per_person_usd": 35,
      "address": "Carrer Example 12, Barcelona",
      "coordinates": { "lat": 41.3825, "lng": 2.1769 },
      "label": "Best Overall",
      "scores": {
        "editorial_strength": { "raw": 5, "weighted": 1.25 },
        "price_value": { "raw": 4, "weighted": 1.00 },
        "quality_signal": { "raw": 5, "weighted": 1.00 },
        "user_fit": { "raw": 4, "weighted": 0.60 },
        "destination_relevance": { "raw": 5, "weighted": 0.50 },
        "logistics": { "raw": 3, "weighted": 0.15 }
      },
      "composite_score": 4.50,
      "composite_pct": 90,
      "user_submitted": false,
      "source_appearances": ["infatuation", "eater", "michelin"],
      "summary": "Short rationale tied to user context.",
      "sources": {
        "infatuation_url": "https://...",
        "eater_url": "https://...",
        "michelin_url": "https://...",
        "google_maps_url": "https://..."
      }
    }
  ],
  "report_path": "/home/user/workspace/travel-agency/restaurant-report-[city]-[date].md"
}
```

## CSV Output (Optional)

If requested by the user or a downstream skill:
`/home/user/workspace/travel-agency/restaurant-selection-[city]-[date].csv`

Columns: Rank, Restaurant, Cuisine, Neighborhood, Price/Person, Label, Editorial, Price/Value, Quality, User Fit, Destination, Logistics, Composite, User-Submitted, Sources
