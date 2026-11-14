# Skill portability

A skill is portable when its reasoning and workflow survive a change in agent harness. Tool names, filesystem conventions, confirmation APIs, and memory systems rarely transfer unchanged.

## Separate the invariant from the adapter

The invariant layer should describe:

- triggers and non-triggers
- required inputs and context
- workflow stages and decision points
- quality criteria and stopping conditions
- safety and confirmation boundaries

The adapter layer should describe:

- tool names and schemas
- skill discovery paths
- browser or connector access
- memory retrieval and persistence
- artifact delivery
- background-task semantics

## Common harness mapping

| Capability | Claude Code-style harness | Codex-style harness | Perplexity Computer-style harness |
| --- | --- | --- | --- |
| Repository inspection | Read, Grep, Glob, Bash | shell and repository tools | sandbox tools and GitHub connector |
| File edits | Edit or Write | patch or shell edit tools | patch-based workspace edits |
| User decisions | AskUserQuestion | interactive prompt | structured question tool |
| Web research | WebSearch or browser | configured search tool | web search or connected source |
| External apps | MCP tools | MCP or API integration | connectors and browser actions |
| Persistent context | project files or memory plugin | repository instructions | memory, projects, and scoped skills |
| Deliverables | repository files | repository files | shared files, deployed sites, or app URLs |

## Porting checklist

1. Preserve the original trigger semantics.
2. Replace tool names with capabilities before mapping them to a new harness.
3. Re-state every irreversible-action boundary.
4. Confirm that file paths and artifact delivery work in the target environment.
5. Re-run positive, negative, and interruption/resume evaluations.
6. Mark unsupported capabilities instead of silently weakening the workflow.

## November personal-skill adapters

The nine November additions preserve the Computer source, including its vocabulary and illustrative examples. Apply these mappings before execution; copying a folder alone does not supply the tools.

- **Questions and memory:** map `ask_user_question` to the host's supported question mechanism. Reuse already supplied answers rather than repeating an intake. Store only durable preferences when the user has enabled memory, not a one-off itinerary or sensitive transcript.
- **Travel output paths:** map `/home/user/workspace/travel-agency/` to a user-approved output directory. Resolve it once and pass actual report/JSON paths between stages. Preserve the field names in each bundled schema.
- **Search:** use short destination queries with the host's domain filters where available. The `site:` and quoted query examples in snapshots are search intent, not required syntax. Verify prices, hours, tickets and room availability on the current primary page; record date, currency and cost basis.
- **Missing evidence:** scores are preference-weighted judgment, not observed outcome probabilities. Do not invent missing reviews, coordinates, sentiment, ratings or availability to complete a schema. Use null or an explicit unavailable state and explain any ranking limitation. The sample JSON values and named venues in references are illustrative, not current recommendations.
- **Score normalization:** the hotel snapshot expresses the value component in both 0–100 and 0–90 terms. For a port, explicitly choose `value = 100 * weighted_sum / max_weighted_sum`, then use `0.9 * value + 10 * sentiment_normalized` when sentiment is supported, or `value` otherwise. Restaurant/bar priority boosts can exceed the nominal five-point scale; report the uncapped boosted ranking value separately and cap a displayed percentage at 100. Document this interpretation instead of silently asserting the source formulas are unambiguous.
- **Hotel JSON example:** `hotel-selector/references/output-schema.md` contains a malformed illustrative `scores.hotel_aesthetic` object, including a missing separator and duplicated keys. Treat it as a field guide, not a directly parseable template or formal JSON Schema. Build a complete object from verified data, include each scoring dimension once, and parse/validate the actual output before handing it downstream.
- **Document delivery:** map workspace sharing to the host's actual attachment or repository mechanism. Delivering a handoff or travel report does not authorize publication, deployment or booking.
- **Live updates:** the update-guard snapshot mentions retriggering a production integration with an empty commit. Treat any push that can trigger production as a deployment action requiring explicit authorization. Do not use an empty commit as a workaround for a production prohibition.
- **Skill optimization:** the existing SkillOpt snapshot is opt-in optimization guidance. These new skills do not require an optimizer run, unsupported model scores or an automatic rewrite of unrelated skills.

Do not silently change source snapshots to suit a host. Record the adapter decisions beside the run output and test the preserved behavior with the fixtures in [EVALUATION.md](EVALUATION.md).
