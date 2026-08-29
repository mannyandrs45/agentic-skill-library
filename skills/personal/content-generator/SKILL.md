---
name: content-generator
description: >
  Generate a premium, 5-slide editorial travel slideshow (Instagram + TikTok) from structured research outputs
  using real-image retrieval instructions and strict May We Travel brand rules. Use when the user asks to
  "generate slides", "create content", "build a slideshow", "make travel slides", "content for Instagram",
  "content for TikTok", or any travel content generation task for the May We Travel brand.
metadata:
  author: Manuel Rodriguez Lapido
  version: '1.0'
---

# Content Generator

Generate a premium, 5-slide editorial travel slideshow (Instagram + TikTok) from structured research outputs using real-image retrieval instructions and strict May We Travel brand rules.

## When to Use This Skill

Use this skill when the user asks to:

- Generate travel slideshow content for Instagram or TikTok
- Create editorial travel slides from research outputs (hotels, restaurants, experiences)
- Build May We Travel branded content from structured entries
- Produce image retrieval instructions and overlay systems for travel slideshows

## Input Schema

The skill expects structured input with these fields:

```json
{
  "location": "string",
  "category": "string",
  "entries": [
    {
      "name": "string",
      "neighborhood": "string",
      "positioning": "string",
      "why_it_matters": "string",
      "standout_features": ["string"]
    }
  ],
  "brand": {
    "name": "May We Travel",
    "voice": "Warm, opinionated, refined, editorial",
    "colors": {
      "midnight": "#1B2838",
      "terracotta": "#C2694F",
      "ocean": "#2E6B6B",
      "ivory": "#F5F1EB",
      "slate": "#6B7280",
      "near_black": "#1A1A1A"
    },
    "fonts": {
      "display": "Instrument Serif",
      "heading": "DM Sans",
      "body": "Inter"
    }
  }
}
```

If the user does not provide a full `brand` object, use the defaults above. The brand block is locked and should not change between runs unless the user explicitly overrides it.

## Instructions

### 1. Validate Input

- Confirm `location`, `category`, and at least 2 entries are present (max 3 entries).
- If fewer than 2 entries, ask the user for more. If more than 3, select the top 3 based on editorial strength.

### 2. Build the Shared Storyboard

Build one unified editorial narrative across exactly 5 slides. The same content is used for both Instagram and TikTok — only aspect ratio, text density, and safe zones change per platform.

**Locked Slide Structure (do not change):**

| Slide | Role | Purpose |
|-------|------|---------|
| 1 | Cover | Destination + angle. Set the editorial tone. |
| 2 | Entry 1 | First featured place. |
| 3 | Entry 2 | Second featured place. |
| 4 | Decision Lens | How to choose between them. Opinionated, not neutral. |
| 5 | CTA | Itinerary prompt, save, follow. |

If a third entry is provided, fold it into Slide 4 as a brief mention rather than adding a sixth slide.

### 3. Write Editorial Copy

For each slide, write:

- A **headline** (Instrument Serif)
- A **subheadline** (DM Sans)
- A **body** line (Inter) — max 1–2 sentences

**Voice rules:**

- Opinionated, direct, warm, non-generic.
- No listicle tone. No "Top 5" framing. No filler.
- Write as if for NYT Travel or Condé Nast Traveler — not a blog roundup.
- Every line should feel like it was written by a person who has been there.

**Examples of what to avoid:**

- "This stunning hotel offers world-class amenities" — generic
- "A must-visit destination for any traveler" — filler

**Examples of what to aim for:**

- "The kind of lobby bar where you cancel dinner plans"
- "Lima's quiet answer to the boutique hotel question"

### 4. Generate Image Retrieval Instructions

Do NOT generate images. For each slide, return:

- `primary_query`: A specific image search query (e.g., "Hotel B exterior terracotta facade Barranco Lima")
- `alternate_queries`: 2–3 fallback queries
- `preferred_sources`: Ordered priority list:
  1. Official property photography
  2. Editorial travel publications
  3. Licensed web images
- `credit`: Always `{ "placement": "bottom-left", "style": "Inter 8pt Slate", "format": "Image: Source Name" }`

### 5. Define the Overlay System

For each slide, specify:

- `title`, `subtitle`, `body` text exactly as written in Step 3
- `typography`: headline → Instrument Serif, subtitle → DM Sans, body → Inter
- `layout`:
  - `position`: "center" for Cover and CTA, "lower-third" for Entry and Decision Lens slides
  - `alignment`: "center" for Cover and CTA, "left" for Entry and Decision Lens slides
  - `max_lines`: 3
  - `background_treatment`: "gradient overlay" for slides with busy imagery, "none" for clean backgrounds, "solid strip" for CTA

### 6. Produce Platform-Specific Render Notes

**Instagram:**

- Aspect ratio: 4:5
- Text density: medium
- Safe zone: center to lower-third
- Notes: Allow slightly more breathing room and spacing

**TikTok:**

- Aspect ratio: 9:16
- Text density: low
- Safe zone: upper-middle, avoid bottom UI
- Notes: Shorter text blocks, faster readability

### 7. Assemble the Output

Return the complete output as a single JSON object matching this schema:

```json
{
  "function_name": "CONTENT-GENERATOR",
  "shared_storyboard": {
    "title": "string",
    "subtitle": "string",
    "slides": [
      {
        "slide_number": 1,
        "role": "cover | entry | planning_insight | cta",
        "headline": "string",
        "subheadline": "string",
        "body": "string"
      }
    ]
  },
  "image_retrieval": [
    {
      "slide_number": 1,
      "primary_query": "string",
      "alternate_queries": ["string"],
      "preferred_sources": [
        "official property photography",
        "editorial travel publications",
        "licensed web images"
      ],
      "credit": {
        "placement": "bottom-left",
        "style": "Inter 8pt Slate",
        "format": "Image: Source Name"
      }
    }
  ],
  "overlay_system": [
    {
      "slide_number": 1,
      "title": "string",
      "subtitle": "string",
      "body": "string",
      "typography": {
        "headline": "Instrument Serif",
        "subtitle": "DM Sans",
        "body": "Inter"
      },
      "layout": {
        "position": "center | lower-third",
        "alignment": "center | left",
        "max_lines": 3,
        "background_treatment": "none | gradient overlay | solid strip"
      }
    }
  ],
  "instagram_render": [
    {
      "slide_number": 1,
      "aspect_ratio": "4:5",
      "text_density": "medium",
      "safe_zone": "center to lower-third",
      "notes": "string"
    }
  ],
  "tiktok_render": [
    {
      "slide_number": 1,
      "aspect_ratio": "9:16",
      "text_density": "low",
      "safe_zone": "upper-middle, avoid bottom UI",
      "notes": "string"
    }
  ]
}
```

### 8. Self-Evaluate

Before returning the output, check:

- Does it feel like NYT / Condé Nast? Or does it feel like "AI content"?
- Is every headline specific to this place, not interchangeable with another city?
- Is the Decision Lens slide genuinely opinionated?
- Are image queries specific enough to return relevant results?

If the copy feels generic, the fix is NOT structural — tighten the editorial voice. Rewrite until every line passes the "would a travel editor publish this?" test.

## Modularity

This skill is designed to accept output from any upstream research agent:

- Hotels agent
- Restaurants agent
- Experiences agent

All feed into the same input schema. The `category` field distinguishes them.
