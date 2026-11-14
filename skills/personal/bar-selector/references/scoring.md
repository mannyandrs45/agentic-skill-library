# Bar Selector — Scoring Rubric & Output Schema

## Scoring Rubric (1–5 Scale)

### Editorial Strength (25%)

| Score | Criteria |
|---|---|
| 5 | Featured prominently in 3+ trusted sources. Strong language ("best bar in [city]," "unmissable," "world-class"). Top placement in bar-specific guides. |
| 4 | Featured in 2 trusted sources with positive language. Included in city drinking guides. |
| 3 | Appears in 1 trusted source with moderate praise. Or mentioned in 2 sources without strong language. |
| 2 | Mentioned in passing or only in broad nightlife roundups (not bar-specific). |
| 1 | No editorial coverage in priority sources. Only user-generated reviews. |

### Prestige Signal (20%)

| Score | Criteria |
|---|---|
| 5 | Currently on World's 50 Best Bars (or top 10 of a regional 50 Best list). Active industry recognition. |
| 4 | On an extended list (51–100) or appeared on World's 50 Best within the last 3 years. Notable bartender pedigree. |
| 3 | Recognized in regional or national best-bar lists. Known in the cocktail community but not on global lists. |
| 2 | Minor local recognition. No prestige list placement. |
| 1 | No prestige signals found. Unknown outside of general review platforms. |

### Price / Value (20%)

| Score | Criteria |
|---|---|
| 5 | Exceptional drinks at prices that feel generous. Described as "great value," "surprisingly affordable," or "best deal in town." Well within user's price comfort. |
| 4 | Good quality-to-price ratio. Comfortably within budget. |
| 3 | Fair prices for what you get. Standard for the city. |
| 2 | On the expensive side. Near or at the user's comfort ceiling. Drinks don't feel like great value. |
| 1 | Very expensive relative to experience. Luxury pricing without proportional quality. |

### User Fit (20%)

| Score | Criteria |
|---|---|
| 5 | Perfect match: style, vibe, occasion, and price all align with stated or inferred preferences. |
| 4 | Strong match on most dimensions. Minor mismatch on one factor. |
| 3 | Reasonable fit. No red flags but not a standout match for this user/trip. |
| 2 | Partial mismatch. Style or vibe doesn't align, but quality is strong. |
| 1 | Poor fit. Included only for exceptional quality, prestige, or user submission. |

### Distinctiveness / Memorability (10%)

| Score | Criteria |
|---|---|
| 5 | Truly unique concept, space, or signature program. "Only in [city]" quality. People talk about this bar. |
| 4 | Strong identity. Memorable space or drink program. Stands out from generic bars. |
| 3 | Pleasant and competent but not especially distinctive. |
| 2 | Generic or formulaic. Interchangeable with similar bars elsewhere. |
| 1 | No distinguishing characteristics. |

### Logistics (5%)

| Score | Criteria |
|---|---|
| 5 | Walk-in friendly, convenient location, good hours, group-accommodating. |
| 4 | Easy to visit with minimal planning. Good location. |
| 3 | May need a reservation or slight detour. Standard hours. |
| 2 | Hard to get into, awkward location, or limited hours. |
| 1 | Very difficult access, hidden with no guidance, or extremely restrictive. |

---

## Composite Score Calculation

```
Composite = (Editorial × 0.25) + (Prestige × 0.20) + (Price/Value × 0.20) 
          + (User Fit × 0.20) + (Distinctiveness × 0.10) + (Logistics × 0.05)

Max possible = 5.00
```

**User Priority Boost:** +0.5 for user-submitted or explicitly requested bars.

Percentage: `(Composite / 5.00) × 100`

---

## JSON Output Schema

Save to: `/home/user/workspace/travel-agency/bar-selection-[city]-[date].json`

```json
{
  "meta": {
    "skill": "bar-selector",
    "version": "1.0",
    "city": "Mexico City",
    "country": "Mexico",
    "run_date": "2026-04-19",
    "travel_dates": {
      "start": "2026-07-10",
      "end": "2026-07-14"
    },
    "party_size": 4,
    "price_comfort": {
      "avg_cocktail_max": 18,
      "currency": "USD"
    },
    "bar_style": "cocktail bars, mezcalerías",
    "sources_used": ["worlds_50_best", "infatuation", "eater", "nytimes"],
    "sources_skipped": []
  },
  "preferences": {
    "style": ["cocktail", "mezcalería"],
    "vibe": "post-dinner drinks, date-night capable",
    "user_submitted": ["Licorería Limantour", "Baltra Bar"]
  },
  "bars": [
    {
      "rank": 1,
      "name": "Bar Name",
      "style": "Cocktail bar",
      "neighborhood": "Roma Norte",
      "avg_cocktail_usd": 14,
      "address": "Calle Example 88, Roma Norte, CDMX",
      "coordinates": { "lat": 19.4195, "lng": -99.1615 },
      "label": "Best Cocktail Bar",
      "scores": {
        "editorial_strength": { "raw": 5, "weighted": 1.25 },
        "prestige_signal": { "raw": 5, "weighted": 1.00 },
        "price_value": { "raw": 4, "weighted": 0.80 },
        "user_fit": { "raw": 4, "weighted": 0.80 },
        "distinctiveness": { "raw": 5, "weighted": 0.50 },
        "logistics": { "raw": 4, "weighted": 0.20 }
      },
      "composite_score": 4.55,
      "composite_pct": 91,
      "user_submitted": false,
      "prestige_placement": "World's 50 Best #15 (2025)",
      "source_appearances": ["worlds_50_best", "infatuation", "eater"],
      "summary": "Short rationale tied to user context.",
      "sources": {
        "infatuation_url": "https://...",
        "eater_url": "https://...",
        "google_maps_url": "https://..."
      }
    }
  ],
  "report_path": "/home/user/workspace/travel-agency/bar-report-[city]-[date].md"
}
```

## CSV Output (Optional)

`/home/user/workspace/travel-agency/bar-selection-[city]-[date].csv`

Columns: Rank, Bar, Style, Neighborhood, Avg Cocktail Price, Label, Editorial, Prestige, Price/Value, User Fit, Distinctive, Logistics, Composite, User-Submitted, Prestige Placement, Sources
