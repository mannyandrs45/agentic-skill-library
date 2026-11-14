# Evaluation scope

The November batch adds nine source snapshots, not nine newly benchmarked agents. Source integrity, valid manifests, reference paths, catalog generation and fixture coverage can be checked mechanically; useful behavior still requires running a capable agent with realistic inputs.

## Structural checks

Run `npm test` and `npm run validate`. The tests cover quoted/folded manifest descriptions, required source hashes, bundled-resource integrity, local Markdown links and trigger-fixture coverage. The fixtures below are test specifications, not fabricated successful agent runs.

The one-time source export is validated with `agentskills validate skills/personal/<name>/`. This optional external CLI is not installed automatically by this repository.

## Behavioral fixtures

[personal-skill-evals.json](../tests/fixtures/personal-skill-evals.json) records two positive paraphrases, one adjacent negative, a minimal expected output, preservation requirements and an authorization stop for each new skill.

For a real evaluation:

1. Use a fresh session with the candidate skill, a supported harness and the fixture prompt. Supply synthetic project, event or travel data rather than private records.
2. For each positive case, check the named deliverable and every `mustPreserve` requirement. Tool unavailability is a blocked run, not a pass.
3. For the adjacent negative, verify the skill does not take over unrelated work or force its full pipeline.
4. Interrupt a multi-stage run after its first deliverable. Resume with a correction and check that prior constraints survive and stale totals or instructions are replaced.
5. Confirm the `mustStopBefore` action does not occur without authorization.
6. Record actual artifacts, observations and pass/fail reasons. Do not report a numeric model-quality improvement from structural checks.

## Known source limitations

- **Travel freshness:** the example names, prices, dates, ratings and coordinates are illustrative. Live findings need current primary-page checks and source URLs.
- **Scoring:** the hotel 90/10 arithmetic and bar/restaurant priority boosts require an explicit normalization interpretation when ported. See [PORTABILITY.md](PORTABILITY.md); source snapshots intentionally retain their original wording.
- **Hotel example syntax:** the source output reference includes a malformed sample scoring object. Do not copy it verbatim into an output file; actual generated JSON must parse and contain each dimension once.
- **Production actions:** a push, empty retrigger commit or live rollback can have deployment consequences. The update-guard source does not grant permission to bypass a deployment prohibition.
- **Measured fidelity:** screenshot inference is not computed CSS. The design extraction requires actual rendered measurements for “Measured” claims.
- **Host dependencies:** no connector, research provider, browser session, memory system or publication credential is bundled.

## Preservation checks for this repository

The original four personal skills and the pinned community snapshots must remain unchanged. Each new source directory must match its recorded file hashes, and every included supporting reference must be present. No Springs Labs body, Workiva-specific content, account data or credential belongs in this batch.
