# Hotel Selector — Output Schema

The structured JSON output enables downstream Travel Agency skills to consume hotel selection results programmatically.

## JSON Structure

Save to: `/home/user/workspace/travel-agency/hotel-selection-[city]-[date].json`

```json
{
  "meta": {
    "skill": "hotel-selector",
    "version": "1.0",
    "city": "Barcelona",
    "country": "Spain",
    "run_date": "2026-04-04",
    "travel_dates": {
      "check_in": "2026-06-12",
      "check_out": "2026-06-19"
    },
    "party": {
      "adults": 2,
      "children": [{ "age": 7 }],
      "total_guests": 3
    },
    "budget_per_night": {
      "min": 150,
      "max": 300,
      "currency": "USD"
    },
    "anchor_neighborhood": "Gothic Quarter",
    "absa_enabled": true,
    "absa_weight": 0.10,
    "filters_relaxed": []
  },
  "preferences": {
    "vibe": "boutique",
    "top_priorities": [
      "walkability to restaurants & nightlife",
      "iconic aesthetic",
      "room size & layout"
    ],
    "dealbreakers": ["must have pool"],
    "preferred_neighborhoods": ["Gothic Quarter", "El Born"],
    "avoided_neighborhoods": []
  },
  "hotels": [
    {
      "rank": 1,
      "name": "Hotel Example Barcelona",
      "brand": "Independent",
      "address": "Carrer Example 42, Gothic Quarter, Barcelona",
      "neighborhood": "Gothic Quarter",
      "coordinates": {
        "lat": 41.3825,
        "lng": 2.1769
      },
      "nightly_rate_usd": 220,
      "total_stay_cost_usd": 1540,
      "tripadvisor_rating": 4.7,
      "google_rating": 4.5,
      "year_built_or_remodeled": 2019,
      "scores": {
        "hotel_aesthetic": {
          "raw": 5,
          "weight": 1.5,
          "weighted": 7.5
        },
        "wow_factors": {
          "raw": 4,
          "weight": 1.5,
          "weighted": 6.0
        },
        "room_layout_views": {
          "raw": 4,
          "weight": 1.5,
          "weighted": 6.0
        },
        "photo_authenticity": {
          "raw": 4,
          "weight": 1.0,
          "weighted": 4.0
        },
        "location_micro": {
          "raw": 5,
          "weight": 3.0,
          "weighted": 15.0
        }
      },
      "absa": {
        "cleanliness": 1,
        "service": 1,
        "location": 1,
        "value": 0,
        "rooms": 1,
        "food_and_beverage": -1,
        "facilities": 0,
        "composite": 3,
        "normalized": 0.71,
        "flags": ["food_and_beverage"]
      },
      "composite_score": 87.5,
      "cost_benefit_ratio": 0.398,
      "summary": "Top pick for walkability and design-forward aesthetic. Rooftop bar is a standout. Watch out for mixed dining reviews.",
      "sources": {
        "tripadvisor_url": "https://www.tripadvisor.com/Hotel_Review-...",
        "google_maps_url": "https://maps.google.com/...",
        "booking_url": "https://www.booking.com/hotel/..."
      }
    }
  ],
  "report_path": "/home/user/workspace/travel-agency/hotel-report-[city]-[date].md"
}
```

## Field Descriptions

### meta
- `skill`: Always "hotel-selector"
- `version`: Skill version
- `filters_relaxed`: Array of strings describing any filters that were relaxed (e.g., "Google rating threshold lowered to 4.1")

### preferences
- Captured from Step 0 for transparency and reproducibility

### hotels (array, sorted by rank)
- `rank`: 1-based ranking by composite score
- `nightly_rate_usd`: Average nightly rate in USD for the specified dates
- `total_stay_cost_usd`: Total estimated cost for the full stay
- `scores`: Each dimension includes raw (1-5), weight multiplier, and weighted score
- `absa`: Full aspect breakdown. `null` if ABSA was disabled
- `composite_score`: Final score out of 100
- `cost_benefit_ratio`: Composite score divided by nightly rate
- `summary`: 1-2 sentence personalized summary for the report
- `sources`: URLs for the user to verify / book

## CSV Output (Optional)

If requested by the user or a downstream skill, also produce a CSV at:
`/home/user/workspace/travel-agency/hotel-selection-[city]-[date].csv`

Columns: Rank, Hotel Name, Neighborhood, Nightly Rate, Composite Score, Cost-Benefit Ratio, TripAdvisor Rating, Google Rating, ABSA Flags, Summary
