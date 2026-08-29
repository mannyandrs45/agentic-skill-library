# Perplexity Computer skill reference

Perplexity Computer exposes built-in skills at runtime and can also load user-, project-, and organization-scoped skills. This repository references those capabilities without vendoring proprietary built-in definitions.

Snapshot date: 2026-08-29.

## Built-in capability families

- **Research:** search, wide-search, research-assistant, and research-report
- **Data and finance:** data, data-warehouses, finance, accounting, and visualize
- **Product and go-to-market:** pm, marketing, sales, and cx
- **Artifacts:** office, document-review, image-output-director, media, and website-building
- **Operations:** task-scheduling, custom-notifications, programmatic-tool-calling, and custom-credentials
- **Platform management:** project-session management, session management, memory exploration, and analytics
- **Specialized domains:** legal, personal health, phone calls, deployments, and connector investigations
- **Meta-systems:** create-skill, model-catalog, model-council, onboarding, and about-computer

## Personal workspace patterns worth preserving

The current workspace also demonstrates useful first-party patterns:

- one-question-at-a-time pressure testing
- YC-style office hours and product forcing questions
- anti-slop editorial review
- interview-to-article pipelines
- travel selectors with explicit scoring models
- phased consulting roadmaps and SOW generation
- sports intelligence web-app orchestration
- Tufte-inspired chart direction
- bounded skill self-improvement with held-out validation

## What to document here

When a runtime skill proves valuable, add a short field note describing:

1. the trigger that selected it
2. the workflow pattern worth preserving
3. the harness-specific capabilities it depends on
4. what can be reproduced in an open skill
5. what should remain a platform reference
