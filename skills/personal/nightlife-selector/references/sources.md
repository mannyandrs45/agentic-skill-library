# Nightlife Selector — Source Guide & Output Schema

## Source Deep Dive

### Resident Advisor (ra.co)

**Primary use:** Club nights, electronic music, underground events.

**How to search:**
- RA organizes events by city and date. Search `"[city] events site:ra.co"` or navigate to RA's events section for the destination.
- Look for: event name, venue, lineup (DJs/artists), time, ticket link.
- RA events include genre tags (techno, house, ambient, etc.) — use these to match user vibe.

**Strength:** Authoritative for electronic/club culture. If a club night is on RA, it's legitimate.

**Weakness:** Weak for non-electronic nightlife (concerts, comedy, cabaret). Skip for those categories.

### Dice (dice.fm)

**Primary use:** Ticketed live events, club nights, and curated nightlife.

**How to search:**
- Search `"[city] events [date] site:dice.fm"` or browse by location.
- Dice curates — presence on Dice is itself a quality signal.
- Look for: event name, venue, lineup, time, ticket price, availability.

**Strength:** Curated selection, reliable ticket links, good for both electronic and live music.

**Weakness:** Not available in all cities. Strong in UK, Europe, and major US cities.

### Time Out

**Primary use:** City nightlife roundups, "best clubs," mainstream + curated.

**How to search:**
- Search `"best nightlife [city] site:timeout.com"` or `"best clubs [city] site:timeout.com"`.
- Good for venue discovery and evergreen recommendations.
- Less useful for specific dated events.

**Strength:** Broad city coverage, accessible writing, good for users who want mainstream quality.

**Weakness:** Can be surface-level. Not the best for underground or niche scenes.

### Songkick

**Primary use:** Concerts and live music by city and date.

**How to search:**
- Search `"[city] concerts [month year] site:songkick.com"` or browse by metro area.
- Strong for touring acts and seated performances.

**Strength:** Comprehensive concert database. Good for "who's playing in [city] this weekend?"

**Weakness:** Doesn't cover DJ sets, club nights, or non-music events.

### Bandsintown

**Primary use:** Touring artist discovery, live music by location.

**How to search:**
- Search `"[city] live music [date] site:bandsintown.com"` or browse by city.
- Good for discovering artists the user may not know are touring.

**Strength:** Artist-centric discovery. Good "surprise me" potential.

**Weakness:** Overlap with Songkick. Use as supplementary, not primary.

---

## Ranking Framework (Qualitative)

Unlike restaurant and bar selectors, nightlife uses a **qualitative framework** rather than strict numerical weights. The agent should use judgment across these dimensions:

### Dimension Descriptions

**Relevance to Stated Vibe**
- How well does this event/venue match what the user wants?
- Electronic music fan asking about Berlin → Panorama Bar scores maximum relevance.
- Jazz lover in New York → Blue Note scores high; a techno warehouse does not.

**Timeliness / Date Fit**
- Is this confirmed for a night the user is in town?
- Confirmed event with lineup > "usually good on Fridays" > "the venue exists"
- Same-night options score higher than "check closer to the date"

**Source Credibility**
- RA-featured or Dice-ticketed event > Time Out roundup mention > unverified social media post
- Cross-source confirmation (RA + Dice) is the strongest signal.

**Venue / Event Distinctiveness**
- Is this a destination experience? Would someone travel to this city partly for this?
- Legendary clubs, iconic venues, or once-in-a-while events score highest.
- Generic "Saturday night at a club" scores low.

**Ticket / Access Practicality**
- Can the user actually attend?
- Freely available tickets > limited but buyable > sold out (still mention)
- Consider door policies (e.g., Berghain's famously selective door)
- Consider dress codes, age restrictions, or group size limits

---

## JSON Output Schema

Save to: `/home/user/workspace/travel-agency/nightlife-selection-[city]-[date].json`

```json
{
  "meta": {
    "skill": "nightlife-selector",
    "version": "1.0",
    "city": "Berlin",
    "country": "Germany",
    "run_date": "2026-04-19",
    "travel_dates": {
      "start": "2026-07-10",
      "end": "2026-07-13"
    },
    "party_size": 2,
    "style_preference": "electronic music, techno",
    "sources_used": ["resident_advisor", "dice", "timeout"],
    "sources_skipped": ["songkick", "bandsintown"],
    "date_specific": true,
    "confidence": "high"
  },
  "nights": [
    {
      "date": "2026-07-10",
      "day_of_week": "Friday",
      "picks": [
        {
          "rank": 1,
          "label": "Best Party",
          "event_name": "Panorama Bar: [Event Name]",
          "venue": "Berghain / Panorama Bar",
          "category": "club_party",
          "time": "23:59–open end",
          "lineup": ["DJ Name 1", "DJ Name 2"],
          "genre_tags": ["house", "techno"],
          "ticket_price_usd": 18,
          "ticket_status": "available",
          "ticket_url": "https://...",
          "neighborhood": "Friedrichshain",
          "address": "Am Wriezener Bahnhof, 10243 Berlin",
          "coordinates": { "lat": 52.5112, "lng": 13.4425 },
          "access_notes": "Famously selective door policy. Arrive after 1am, small groups, no photos.",
          "why": "Iconic Berlin techno institution. Friday Panorama Bar nights lean more house — perfect entry point.",
          "source": "resident_advisor",
          "source_url": "https://ra.co/events/..."
        },
        {
          "rank": 2,
          "label": "Best Concert",
          "event_name": "Artist Name Live",
          "venue": "Venue Name",
          "category": "concert_live",
          "time": "20:00–23:00",
          "lineup": ["Artist Name"],
          "genre_tags": ["indie", "electronic"],
          "ticket_price_usd": 25,
          "ticket_status": "limited",
          "ticket_url": "https://...",
          "neighborhood": "Kreuzberg",
          "address": "Address, Berlin",
          "coordinates": { "lat": 52.4950, "lng": 13.4030 },
          "access_notes": "Ticketed, standing room.",
          "why": "Rationale.",
          "source": "dice",
          "source_url": "https://dice.fm/..."
        },
        {
          "rank": 3,
          "label": "Flexible Backup",
          "event_name": null,
          "venue": "Venue Name",
          "category": "general_nightlife",
          "time": "22:00–late",
          "lineup": null,
          "genre_tags": ["mixed"],
          "ticket_price_usd": null,
          "ticket_status": "walk_in",
          "ticket_url": null,
          "neighborhood": "Neukölln",
          "address": "Address, Berlin",
          "coordinates": { "lat": 52.4811, "lng": 13.4350 },
          "access_notes": "Walk-in friendly, casual door.",
          "why": "Rationale.",
          "source": "timeout",
          "source_url": "https://timeout.com/..."
        }
      ]
    }
  ],
  "venue_guide": [
    {
      "name": "Berghain",
      "type": "Club",
      "known_for": "Techno institution, marathon weekend parties",
      "best_nights": "Friday (Panorama Bar), Saturday (main floor)",
      "source_url": "https://ra.co/clubs/..."
    }
  ],
  "report_path": "/home/user/workspace/travel-agency/nightlife-report-[city]-[date].md"
}
```

## CSV Output (Optional)

`/home/user/workspace/travel-agency/nightlife-selection-[city]-[date].csv`

Columns: Date, Day, Rank, Label, Event Name, Venue, Category, Time, Genre, Ticket Price, Ticket Status, Neighborhood, Why, Source, Source URL
