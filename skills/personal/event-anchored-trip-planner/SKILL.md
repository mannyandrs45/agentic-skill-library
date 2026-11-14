---
name: event-anchored-trip-planner
description: "Plan trips around fixed weddings, games, festivals, or ticketed nights by locking dates, origins, conflicts, timed transport, lodging, and normalized group costs. Load for event-anchored weekends or multi-stop group holidays; do not load for outdoor route planning or standalone hotel, restaurant, or nightlife recommendations."
---

# Event-Anchored Trip Planner

Turn a fixed event into a feasible trip without losing timing, conflict, routing, lodging, or shared-cost constraints as the plan changes.

## Workflow

1. Lock the anchor before ranking options.
   - Record the home origin and return city, fixed event location and timing, tickets or commitments already held, party size, budget basis, hard unavailable dates, and stated vibe.
   - State whether the requested trip duration includes the event or begins before or after it.
   - Separate locked facts from open or provisional dates. Do not build a dated itinerary around an unannounced event.
2. Build the calendar and route skeleton.
   - Place the fixed event first, then add arrival margin, the requested pre- or post-event nights, onward legs, and the return.
   - Eliminate any option that crosses a blocked date, changes the stated duration, or requires backtracking the user excluded.
   - Check that every night, travel day, and transition is accounted for before recommending a route.
3. Test access at the times the trip will actually move.
   - Check door-to-door outbound and return paths, including the event's stated finish time, last and first transit, connections, walks, and realistic buffers.
   - Judge a lodging base by the hardest event-to-bed movement as well as daytime city access. Do not use generic centrality or average journey time as a substitute.
4. Compare feasible options on one stable basis.
   - Keep the same party size, number of nights, room split, currency, and per-person versus group basis in every column.
   - Attach each user-supplied expense or commitment to the correct option. Remove a scenario once the user says it is not an option.
   - Recalculate the complete comparison after a correction; do not patch one row while leaving stale totals or conclusions.
5. Convert the selected option into an action plan.
   - Stop broad exploration once the user chooses.
   - Give the compact day-by-day route, sleeping base, timed transport plan, booking order, and remaining live checks.

## Output contract

```markdown
## Locked anchors
- Event and timing:
- Trip duration relative to event:
- Origin / return:
- Blocked dates:
- Party and cost basis:
- Hard logistics:
- Open or provisional:

## Feasible options
| Option | Calendar fit | Door-to-door access | Event-exit plan | Lodging logic | Cost per person | Main risk |
|---|---|---|---|---|---:|---|

## Recommended plan
| Day | Base | Fixed commitment or move | Sleep |
|---|---|---|---|

## Book or verify in order
1. [Time-sensitive commitment]
2. [Transport and lodging dependency]
3. [Live schedule, price, or event check]
```

## Gotchas

- Resolve whether the event sits inside or outside the requested trip duration before assigning dates.
- Propagate blocked dates through the full ranking; do not recommend a conflict and repair it only after selection.
- Test the stated post-event finish time before recommending a lodging area; an easy outbound trip can have no workable return.
- Preserve the option attached to every user-supplied cost and rebuild the requested comparison after correction.