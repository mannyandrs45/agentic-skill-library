# Workflow recipes

These recipes chain existing skills into complete jobs. They are not a second catalog or an autonomous execution service; the [generated catalog](../CATALOG.md) remains the index, and each linked `SKILL.md` is the operating procedure.

Read [portability requirements](PORTABILITY.md) before execution. Load only the stage needed now, pass its actual output to the next stage, and stop at the stated approval boundary.

## Reference to implementation

Use when a concrete site or visual reference must become an implementable design, or when a scoped correction must preserve an existing app. Do not run an extraction just because a user asks for a simple text edit.

**Inputs:** canonical reference URL or screenshots, target project, settled scope, target viewports, access and publication boundaries.

1. For public website extraction, run [brand-extraction-handoff](../skills/personal/brand-extraction-handoff/SKILL.md). Produce `DESIGN.md`, `tokens.css` and `HANDOFF.md`; distinguish measured, declared, inferred and proposed values.
2. If another agent will implement, run [implementation-handoff-builder](../skills/personal/implementation-handoff-builder/SKILL.md) using those artifacts plus verified repository context. Produce a complete implementation contract and shorter companion prompt. If the user asked for code changes directly, skip this transfer step.
3. Once implementation is authorized, use [reference-faithful-interface-iteration](../skills/personal/reference-faithful-interface-iteration/SKILL.md). Freeze the visual invariants and working interactions before editing. An implementation-capable coding/browser harness is required; the extraction skill does not build the site.
4. For a deployed system's code, data, configuration or runtime update, also apply [stateful-system-update-guard](../skills/personal/stateful-system-update-guard/SKILL.md). Preserve identity, data ownership and durable records. Skip this for a purely visual edit.
5. Check the actual target at desktop and mobile, rerun the preserved flows, and report changes, evidence and remaining gaps. A local build is not proof of a working live path.

**Completion:** reference evidence, implementation acceptance checks and actual render agree; unrequested behavior and state remain intact. Handoff-only requests stop after the requested documents. Pushes, production changes and copied proprietary assets require their own authorization.

**Example:** “Use this public site as the reference for a dashboard handoff; do not build or deploy yet.” Expected result: measured design files and a coding-agent contract, not an unsolicited app.

## Event-anchored trip

Use for a wedding, festival, game or other fixed event with travel dependencies. Use an individual selector directly for a standalone hotel, dining or drinking question.

**Inputs:** event time/place/status, origin and return, blocked dates, trip duration relative to the event, party/room split, budget basis and confirmed commitments.

1. Run [event-anchored-trip-planner](../skills/personal/event-anchored-trip-planner/SKILL.md) to lock the calendar and route skeleton. Test the hardest post-event return before recommending a base.
2. Run [hotel-selector](../skills/personal/hotel-selector/SKILL.md) only for feasible bases. Pass dates, room split, budget and real movement constraints; carry the chosen neighborhood and actual structured-output path forward.
3. Run [restaurant-selector](../skills/personal/restaurant-selector/SKILL.md) and [bar-selector](../skills/personal/bar-selector/SKILL.md) as needed, sharing party, dates, neighborhood, budget and dietary constraints. Bars remain independently usable; a dinner selection is not a prerequisite.
4. Run [nightlife-selector](../skills/personal/nightlife-selector/SKILL.md) for date-specific parties, concerts and DJ nights. Keep confirmed listings separate from evergreen venue suggestions and keep dancing/events separate from ordinary bars.
5. Reconcile the chosen options into one calendar. Account for every night, realistic travel buffers and normalized group/per-person costs. If a later fixed event changes the route, rerun the affected base and cost comparison instead of patching one total.

**Completion:** a feasible itinerary, selector reports/JSON, source-checked live details and ordered booking checklist. Missing schedules and unavailable rates stay explicit; no bookings or purchases occur without approval.

**Example:** “Four adults, a fixed Saturday event, two rooms, home Monday; compare bases and give us food and party options.” Expected result: one shared room/currency/night basis and a viable event-to-bed plan, not four unrelated lists.
