---
name: marketing
description: "Marketing skills for Perplexity Computer. CRO, copywriting, SEO, analytics, growth engineering, sales enablement, and more. Use when the user wants help with any marketing task — conversion optimization, writing copy, SEO audits, email sequences, paid ads, pricing strategy, launch planning, or any growth-related work. This is the parent skill that orchestrates 33 specialized marketing sub-skills. Built by Corey Haines, adapted from github.com/coreyhaines31/marketingskills."
license: MIT
metadata:
  author: coreyhaines
  version: '1.1.0'
  source: https://github.com/coreyhaines31/marketingskills
---

# Marketing Skills

A collection of 33 specialized marketing skills for Perplexity Computer. Built for technical marketers and founders who want AI agents to help with conversion optimization, copywriting, SEO, analytics, and growth engineering.

Adapted from [Corey Haines' Marketing Skills](https://github.com/coreyhaines31/marketingskills) (MIT License).

## How Skills Work Together

The `marketing/product-marketing-context` skill is the foundation — every other skill checks it first to understand your product, audience, and positioning before doing anything.

```
                            +--------------------------------------+
                            |      product-marketing-context        |
                            |    (read by all other skills first)   |
                            +------------------+-------------------+
                                               |
    +--------------+-------------+-------------+-------------+--------------+--------------+
    v              v             v             v             v              v              v
+----------+ +----------+ +----------+ +------------+ +----------+ +-------------+ +-----------+
|  SEO &   | |   CRO    | |Content & | |  Paid &    | | Growth & | |  Sales &    | | Strategy  |
| Content  | |          | |   Copy   | |Measurement | |Retention | |    GTM      | |           |
+----------+ +----------+ +----------+ +------------+ +----------+ +-------------+ +-----------+
```

## When to Use This Skill

Use this parent skill when you need to figure out WHICH marketing sub-skill to apply. If you already know the specific task, load the sub-skill directly.

## Sub-Skill Index

### Conversion Optimization
  - `marketing/page-cro`: When the user wants to optimize, improve, or increase conversions on any marketing page — including homepage, landing...
  - `marketing/signup-flow-cro`: When the user wants to optimize signup, registration, account creation, or trial activation flows.
  - `marketing/onboarding-cro`: When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value.
  - `marketing/form-cro`: When the user wants to optimize any form that is NOT signup/registration — including lead capture forms, contact form...
  - `marketing/popup-cro`: When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes.
  - `marketing/paywall-upgrade-cro`: When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates.

### Content & Copy
  - `marketing/copywriting`: When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, landing pages, pr...
  - `marketing/copy-editing`: When the user wants to edit, review, or improve existing marketing copy.
  - `marketing/cold-email`: Write B2B cold emails and follow-up sequences that get replies.
  - `marketing/email-sequence`: When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email ...
  - `marketing/social-content`: When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram,...

### SEO & Discovery
  - `marketing/seo-audit`: When the user wants to audit, review, or diagnose SEO issues on their site.
  - `marketing/ai-seo`: When the user wants to optimize content for AI search engines, get cited by LLMs, or appear in AI-generated answers.
  - `marketing/programmatic-seo`: When the user wants to create SEO-driven pages at scale using templates and data.
  - `marketing/site-architecture`: When the user wants to plan, map, or restructure their website's page hierarchy, navigation, URL structure, or intern...
  - `marketing/competitor-alternatives`: When the user wants to create competitor comparison or alternative pages for SEO and sales enablement.
  - `marketing/schema-markup`: When the user wants to add, fix, or optimize schema markup and structured data on their site.
  - `marketing/content-strategy`: When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover.

### Paid & Distribution
  - `marketing/paid-ads`: When the user wants help with paid advertising campaigns on Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/...
  - `marketing/ad-creative`: When the user wants to generate, iterate, or scale ad creative — headlines, descriptions, primary text, or full ad va...

### Measurement & Testing
  - `marketing/analytics-tracking`: When the user wants to set up, improve, or audit analytics tracking and measurement.
  - `marketing/ab-test-setup`: When the user wants to plan, design, or implement an A/B test or experiment.

### Retention & Growth
  - `marketing/churn-prevention`: When the user wants to reduce churn, build cancellation flows, set up save offers, recover failed payments, or implem...
  - `marketing/free-tool-strategy`: When the user wants to plan, evaluate, or build a free tool for marketing purposes — lead generation, SEO value, or b...
  - `marketing/referral-program`: When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy.
  - `marketing/lead-magnets`: When the user wants to create, plan, or optimize a lead magnet for email capture or lead generation.

### Strategy & Monetization
  - `marketing/marketing-ideas`: When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product.
  - `marketing/marketing-psychology`: When the user wants to apply psychological principles, mental models, or behavioral science to marketing.
  - `marketing/launch-strategy`: When the user wants to plan a product launch, feature announcement, or release strategy.
  - `marketing/pricing-strategy`: When the user wants help with pricing decisions, packaging, or monetization strategy.
  - `marketing/product-marketing-context`: When the user wants to create or update their product marketing context document.

### Sales & RevOps
  - `marketing/revops`: When the user wants help with revenue operations, lead lifecycle management, or marketing-to-sales handoff processes.
  - `marketing/sales-enablement`: When the user wants to create sales collateral, pitch decks, one-pagers, objection handling docs, or demo scripts.

### Key Cross-References
- `copywriting` <-> `page-cro` <-> `ab-test-setup`
- `revops` <-> `sales-enablement` <-> `cold-email`
- `seo-audit` <-> `schema-markup` <-> `ai-seo`
- `email-sequence` <-> `cold-email` <-> `content-strategy`
- `paid-ads` <-> `ad-creative` <-> `analytics-tracking`

## Reference Materials

Detailed reference documentation is consolidated into category-based files:

- `references/cro-references.md`: Reference materials for conversion optimization skills
- `references/content-copy-references.md`: Reference materials for content & copy skills
- `references/seo-references.md`: Reference materials for seo & discovery skills
- `references/paid-distribution-references.md`: Reference materials for paid & distribution skills
- `references/measurement-testing-references.md`: Reference materials for measurement & testing skills
- `references/retention-growth-references.md`: Reference materials for retention & growth skills
- `references/strategy-references.md`: Reference materials for strategy & monetization skills
- `references/sales-revops-references.md`: Reference materials for sales & revops skills

Each sub-skill's SKILL.md links to the relevant master reference file. Load the reference file when you need templates, examples, benchmarks, or implementation details beyond the core instructions.

## Workflow

1. **Start with context**: If this is a new project, run `marketing/product-marketing-context` first to capture your product, audience, and positioning. This creates `/home/user/workspace/product-marketing-context.md` that all other skills reference.

2. **Pick the right skill**: Based on the user's request, load the most relevant sub-skill. Use the index above and the descriptions to match.

3. **Cross-reference**: Many skills work together. After completing one task, suggest related skills that could build on the work (e.g., after `copywriting`, suggest `page-cro` to optimize the page, or `ab-test-setup` to test variations).

4. **Load references on demand**: When a sub-skill needs deeper detail (templates, benchmarks, implementation guides), read the linked master reference file.

## Writing Style Guidelines

All marketing skills follow these principles:

### Structure
- Use H2 for main sections, H3 for subsections
- Use bullet points and numbered lists liberally
- Short paragraphs (2-4 sentences max)

### Tone
- Direct and instructional
- Second person ("You are a conversion rate optimization expert")
- Professional but approachable

### Clarity Principles
- Clarity over cleverness
- Specific over vague
- Active voice over passive
- One idea per section

## Source

Original skills by [Corey Haines](https://corey.co) — [GitHub repo](https://github.com/coreyhaines31/marketingskills) (MIT License).
