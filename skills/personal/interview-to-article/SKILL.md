---
name: interview-to-article
description: "Interview-to-Article meta-post kit. Runs a structured Master Interviewer that extracts project constraints, technical stakes, and human narrative from any project, then transforms the transcript into a Substack-ready markdown recap using a fixed template and CTA placement matrix. Includes a Voice-Calibration checklist tuned to Manny's Gegenpressing-style voice (first person minimal-I, casual-but-professional, ~4-5/10 technical depth, em-dash discipline, no cringe hype). Use when the user asks to 'interview me about a project', 'run the master interviewer', 'turn this transcript into an article', 'draft a project writeup from notes', 'build a Substack post from an interview', or wants a structured capture-to-article workflow. This is the upstream capture layer for the project-recap-substack skill; run this first when starting from scratch, then hand the Transcript Summary to project-recap-substack for the final draft."
metadata:
  author: manny-rodriguez
  version: '1.0'
  companion_skill: project-recap-substack
---

# Interview-to-Article

Reusable system for turning any project into a Substack-ready recap. Four modules: Master Interviewer prompt, transformation workflow, voice checklist, and template. Designed to sit upstream of the `project-recap-substack` skill — this one captures raw material; that one writes the final article. Both can also be used independently.

## When to Use This Skill

Use when the user asks to:

- "Interview me about [project]" / "run the master interviewer"
- "Turn this transcript into an article"
- "Draft a Substack post from these notes"
- "Build a project writeup from scratch" (no draft yet, just a project in their head)
- "Voice-check this draft" (Module 3 only)
- "Format this article for Substack" (Module 4 only)

Do NOT use this skill when:

- The user already has a full draft and just wants an edit pass → use `project-recap-substack` directly.
- The user wants a resume, LinkedIn post, or non-Substack format → use the appropriate skill.
- The project involves fabricating metrics or outcomes → refuse; this skill is grounded in real transcript material only.

## Relationship to `project-recap-substack`

This skill is the **upstream capture layer**. It produces a `Transcript Summary` block from a live interview. `project-recap-substack` is the **downstream writer** that takes structured input and produces the final markdown article using Manny's fixed editorial template (Gegenpressing skeleton).

Typical flow:

1. User: "New project recap: [name]. Interview me."
2. This skill runs Module 1 (interview), then Module 2 (transformation planning).
3. Hand the Transcript Summary + verbatim answers to `project-recap-substack` for the final draft.
4. Run Module 3 (voice check) on the output.
5. Apply Module 4 (CTA placement).

If `project-recap-substack` is unavailable, this skill can produce the full article on its own using Module 4's template.

## Module 1 — The Master Interviewer System Prompt

When invoked to run an interview, adopt this operating stance for the entire session:

### Operating rules

1. Interview ONE project at a time. If the user names two, ask which one first and park the other.
2. Ask ONE section at a time. Never dump all questions at once. Wait for the user's answer before moving on.
3. Keep every question short. Bullets over paragraphs. No preamble like "Great question!" or "That's interesting."
4. If the user already answered a question in an earlier message, transcript, or attached file, SKIP it. Acknowledge in one line ("Got the origin story from your notes — moving on.") and proceed.
5. Push for specificity, but only once per question. If vague, ask ONE follow-up ("Which library?" / "What was the actual number?" / "What broke the first time?"). Then move on.
6. Never invent details. If the user says "I don't remember," record it as "unknown" and continue.
7. At the end, print a `## Transcript Summary` block that is copy-pasteable into a writing tool.

### The three-layer arc

Every section extracts one or more of:

- **CONSTRAINTS**: what the project had to work around (data limits, budget, time, personal skill gaps, deployment realities).
- **TECHNICAL STAKES**: what was hard, what the interesting design calls were, what the naive version would have gotten wrong.
- **HUMAN NARRATIVE**: why this person built this thing, what it cost them personally, what they learned about themselves.

If an answer is only technical, follow up for the human layer. If it's only vibes, follow up for a concrete constraint.

### The seven sections

**Section 1 — Frame (30 seconds)**

- Project name, one-line description, current status (shipped, paused, running, abandoned).
- Who is this recap FOR? (Hiring managers, future self, technical peers, a specific company, general readers.)
- Hard length ceiling or specific CTA the piece needs to land on?

**Section 2 — Origin (human layer)**

- What in actual life made you notice this problem? (Hobby, frustration, a bet, a job.)
- What did you try BEFORE building this? Why didn't it work?
- What made you finally start? A specific week, tweet, conversation, or breaking point?

**Section 3 — Constraints (shape of the box)**

- Time budget: evenings and weekends, one sprint, ongoing?
- Money / compute budget, if any.
- Skill gaps you knew about going in.
- Data or access limits (rate limits, paywalls, no ground truth).
- Anything deliberately NOT built, and why.

**Section 4 — The System (technical stakes)**

Walk end-to-end as 4–7 numbered stages. For each:

- 2–4 word stage name.
- One sentence: what happens here.
- One sentence: what the naive version would get wrong.
- Optional: one library, formula, or config value worth naming.

Fewer than 4 stages → keep it. More than 7 → ask which two to merge.

**Section 5 — Design Calls (the interesting part)**

- 2–3 decisions most public versions get wrong or skip. Each: 2–4 word label, one sentence on the call, one sentence on why it matters.
- The single decision you are LEAST sure about.

**Section 6 — AI Stack & Workflow**

- Which models / coding agents, in what role (architect, executor, reviewer, rubber duck).
- How wired in? (MCP, IDE, CLI, browser, copy-paste.)
- Ritual that kept work focused? (`HANDOFF.md`, system prompt, nightly eval, Sunday review.)
- What did the AI actively make worse, if anything.

**Section 7 — Reflection & CTA**

- One honest thing this build taught you about the domain.
- One honest thing it taught you about yourself as a builder.
- Natural next step — specific feature, coverage expansion, rebuild.
- Where should readers go after this article? (Repo, demo, follow, hire, DM, none.)
- Anything that must be redacted, anonymized, or framed as "not financial / legal / medical advice"?

### Final output — Transcript Summary block

Once all seven sections are answered, print a single fenced markdown block:

````
## Transcript Summary

- FRAME: {project, one-liner, audience, CTA target}
- ORIGIN: (3 bullets max)
- CONSTRAINTS: (3 bullets max)
- SYSTEM: (numbered list of stages with the naive-version failure mode)
- DESIGN CALLS: (2–3 labeled blocks)
- AI STACK: (2 short paragraphs)
- REFLECTION: (3 bullets — domain lesson, self lesson, next step)
- CTA TARGET: (one line)
- REDACTIONS: (bullet list or "none")
````

Then stop. Do NOT write the article in the same turn. Handoff is a separate step.

## Module 2 — Transformation Workflow

Once the interview is done and the Transcript Summary exists, follow these steps to turn it into an article (or hand it to `project-recap-substack`).

### Step 1 — Load and lint the transcript

- Read the FULL transcript, not just the summary block. The summary is scaffolding; the phrasing to preserve lives in the raw answers.
- Copy every distinctive turn of phrase into a scratch list. These become anchor lines in the draft.
- Flag anything vague ("some issues with the model") for a follow-up ping. Never paper over vagueness with confident filler.

### Step 2 — Map summary blocks to article sections

| Transcript Summary block | Article section                     | Notes                                             |
| ------------------------ | ----------------------------------- | ------------------------------------------------- |
| FRAME                    | Title, subtitle, epigraph           | Epigraph pulls from project name etymology or a framing quote. |
| ORIGIN                   | Opening two paragraphs (no header)  | First paragraph = personal through-line. Second = the gap.     |
| SYSTEM                   | "The End-to-End Loop" numbered list | Preserve stage names verbatim.                    |
| DESIGN CALLS             | "Design Calls I Needed to Flag"     | Keep the 2–4 word bold lead-ins.                  |
| AI STACK                 | "The AI Stack"                      | Two paragraphs, max.                              |
| REFLECTION               | "My Thoughts Overall"               | Ends with the italic closing paragraph.           |
| CTA TARGET               | Footer CTA                          | Placement depends on CTA type; see Module 4 matrix. |
| CONSTRAINTS              | Woven into origin + design calls    | Do not give constraints their own section.        |
| REDACTIONS               | Applied globally                    | Redact before draft, not after.                   |

### Step 3 — Draft in a single pass

Write the whole article top to bottom before editing anything. This preserves voice consistency.

- Anchor every section on at least one verbatim phrase from the transcript.
- Cap at ~1,200 words. If longer, cut design calls before origin — the human layer is the moat.
- One code block or formula, max, across the whole piece. Choose the one a smart non-specialist can still parse.
- 3–6 named tools total. Everything else becomes "the usual suspects" or gets cut.
- No em-dashes as default connectors. Use semicolons, colons, or full stops. Reserve em-dashes for definitional labels and one or two genuinely emphatic breaks.

### Step 4 — Structural checks

Before running Module 3, verify:

- [ ] H1 title exists, only appears once.
- [ ] Italic epigraph directly under title/subtitle block, followed by `---`.
- [ ] Two opening paragraphs with no header (origin story).
- [ ] "What [Project] Is" H2 with marquee image placeholder.
- [ ] "The End-to-End Loop" H2 with numbered stages, each starting with bold stage name + period.
- [ ] "Design Calls I Needed to Flag" H2 with bold lead-ins ending in periods.
- [ ] "The AI Stack" H2, two paragraphs.
- [ ] "My Thoughts Overall" H2 ending in italic paragraph.
- [ ] Footnotes at bottom, numbered, with source links.
- [ ] CTA placed per Module 4 matrix.
- [ ] Horizontal rules (`---`) between major sections.

### Step 5 — Run Module 3, then revise

Voice edits are surgical, not rewrites.

### Step 6 — Ship

- Save as `<project-slug>-recap.md` in the workspace.
- Share the file (do not paste the whole article inline).
- Note what got cut, what's still unknown, and one specific ask if you want feedback.

## Module 3 — Voice-Calibration Checklist

Read the draft top to bottom with this checklist next to it. Mark pass / fail / N/A. Any fail → ONE targeted edit, not a rewrite.

### Voice fingerprint (must-pass)

- [ ] **First person, minimal "I".** Count explicit "I"s. If more than ~1 per 150 words, rewrite offenders to start with a verb or object ("Built a small agent…" not "I built…").
- [ ] **Casual-but-professional.** Sharp builder at a bar, not a paper abstract. Contractions and conversational asides allowed.
- [ ] **Technical depth ~4–5/10.** Plain English first. Jargon only when it earns its keep, always with a one-line gloss on first use.
- [ ] **Nostalgic, concrete origin.** Origin paragraph names a specific memory, place, hobby, or lived detail. Not "I've always been interested in X."
- [ ] **Sober close, not triumphant.** Closing italic paragraph names what's actually true right now, including uncertainty. No victory laps.

### Language discipline (must-pass)

- [ ] **No cringe hype.** Zero: "10x," "game-changing," "revolutionary," "unlock," "supercharge," "next-level," "world-class."
- [ ] **Em-dash discipline.** Ceiling is 2 across the whole article. Semicolons, colons, or full stops replace the rest.
- [ ] **No AI-tell phrases.** Zero: "delve," "in the realm of," "it's worth noting," "in today's fast-paced world," "the intersection of," "leverage" (as a verb outside finance), "seamless," "robust" (as filler), "furthermore," "moreover."
- [ ] **Betting / trading framing.** If markets or wagering are involved, the article frames it as a modeling and decision-making testbed, not a get-rich pitch. "Advice" appears only in a "not financial/betting advice" disclaimer if needed.
- [ ] **Acronym discipline.** Every acronym except API, SQL, LLM, HTTP, CSV is spelled out on first use.

### Structural voice (must-pass)

- [ ] **Bold lead-ins end with a period.** Every design call and reflection block starts with 2–4 bold words + period, not a colon.
- [ ] **Stage names are 2–4 words.** No "Stage 3: The Part Where We Do Feature Engineering With SciPy."
- [ ] **Section rhythm mirrors Gegenpressing.** Epigraph → origin → what it is → loop → design calls → AI stack → thoughts → footnotes.
- [ ] **One code block / formula, max.** The one kept should be the one a smart non-specialist can still roughly parse.
- [ ] **3–6 named tools total.** Rest are "the usual suspects" or cut.

### The "smart non-specialist" test (must-pass)

Read as a recruiter or exec who codes zero. Mark any sentence they would need to Google. Ceiling: **3 such sentences across the whole article**. Above that, cut jargon.

### The "sharp peer" test (should-pass)

Read as a strong engineer in the same domain. Are there at least **two** places where they'd stop and think "oh, that's a real design call, not a hand-wave"? If not, the design calls section is too thin.

### The "voice match" test (should-pass)

Read the draft next to the Gegenpressing recap (or the last published article in the series). Score 1–5 on cadence (sentence length distribution), vocabulary (specific verbs, absence of filler), and tone (dry, curious, not selling). Any dimension below 4 → one targeted rewrite pass.

### Redaction check (must-pass)

- [ ] Every redaction from the Transcript Summary applied.
- [ ] No real dollar amounts, user counts, or performance claims that weren't in the transcript.
- [ ] Any external person named has been cleared or anonymized.

## Module 4 — Substack-Ready Template

Fill-in-the-blanks template. Every placeholder is `{{double braces}}`. CTA logic below.

````markdown
# {{Project Name}}

*{{One-line subtitle in plain language.}}*

By {{Author Name}} · {{Publish Date}}

![Hero image: {{one-line description of the banner image}}]({{hero-image-path}})

**{{Epigraph — 2 to 5 sentences in bold italics. Define, quote, or frame the project name. No header above this block.}}**

---

{{Origin paragraph 1 — personal through-line. Concrete and slightly nostalgic. Names a specific memory, hobby, or lived detail. 3 to 5 sentences.}}

{{Origin paragraph 2 — the gap that made this project necessary. Ends with a sentence that names what was missing. 3 to 5 sentences.}}

---

## What *{{Project Name}}* Is

{{One tight paragraph. 3 to 5 sentences. Inputs → core method → output. Plain English first.}}

![{{Marquee screenshot / dashboard description}}]({{marquee-image-path}})

---

## The End-to-End Loop

1. **{{Stage 1 name — 2 to 4 words}}.** {{1 to 3 sentences. What happens here, and what would go wrong with the naive version.}}

2. **{{Stage 2 name}}.** {{1 to 3 sentences.}}

3. **{{Stage 3 name}}.** {{1 to 3 sentences.}}

   ```{{language}}
   {{Optional: the single code block or formula for the whole article. Only include if it captures something prose cannot. Delete this block if unused.}}
   ```

4. **{{Stage 4 name}}.** {{1 to 3 sentences.}}

5. **{{Stage 5 name (optional)}}.** {{1 to 3 sentences.}}

6. **{{Stage 6 name (optional)}}.** {{1 to 3 sentences.}}

7. **{{Stage 7 name (optional)}}.** {{1 to 3 sentences.}}

---

## Design Calls I Needed to Flag

**{{Design call 1 — 2 to 4 words}}.** {{1 to 2 sentences on the decision and why it matters versus how others typically do it.}}

**{{Design call 2}}.** {{1 to 2 sentences.}}

**{{Design call 3 (optional)}}.** {{1 to 2 sentences.}}

---

## The AI Stack

{{Paragraph 1: which models / agents were used, in what roles, and how they were wired in. 3 to 5 sentences.}}

{{Paragraph 2: the session-management ritual that kept the work focused. Name the actual file / prompt / eval. 2 to 4 sentences.}}

---

## My Thoughts Overall

**{{Reflection 1 — 2 to 4 words}}.** {{1 to 3 sentences. Meta-lesson about modeling, agents, or the domain.}}

**{{Reflection 2 — 2 to 4 words}}.** {{1 to 3 sentences. Meta-lesson about yourself as a builder.}}

**{{Narrow Focus / What's Next — 2 to 4 words}}.** {{1 to 3 sentences. A specific natural next step. Not "the sky's the limit."}}

*{{Closing italic paragraph. 2 to 4 sentences. Sober, honest, not triumphant. Names the current state, the target metric, and why measuring it honestly is the point.}}*

---

{{CTA BLOCK — see matrix below.}}

---

## Footnotes

1  [{{Source title}}]({{url}})

2  [{{Source title}}]({{url}})

3  [{{Source title}}]({{url}})
````

### CTA Placement Matrix

Pick ONE row based on the CTA TARGET from the Transcript Summary. Do not stack multiple action CTAs.

| CTA target                     | Placement                                                                        | Exact phrasing pattern                                                                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Repo / demo / read the code** | Directly under the closing italic paragraph. One line. No header.                | "Code lives at [{{repo-url}}]({{repo-url}}). Demo: [{{demo-url}}]({{demo-url}})."                                                                                                               |
| **Follow the Substack**         | Bottom, after footnotes, one italic line.                                        | "*More writeups like this: [subscribe]({{substack-url}}).*"                                                                                                                                     |
| **Hire me / work with me**      | Bottom, above footnotes, in a bordered blockquote.                               | "> Building something adjacent to this? I take on ~one contract at a time. [{{contact-url}}]({{contact-url}})."                                                                                 |
| **DM me / conversation ask**    | Bottom, one line, no header.                                                     | "If you're working on {{specific domain}}, I'd genuinely like to compare notes: {{contact handle}}."                                                                                            |
| **No CTA (portfolio-only)**     | Nothing. End on the italic closing paragraph.                                    | (empty)                                                                                                                                                                                         |
| **Compliance / disclaimer**     | Directly under the byline OR at the very bottom in small italics.                | "*This is a technical exploration, not financial / betting / medical / legal advice.*"                                                                                                          |

**Stacking rule:** disclaimer can combine with any other CTA (disclaimer at top, action CTA at bottom). Never stack two action CTAs.

**Anti-patterns to avoid:**

- Mid-article CTAs ("Enjoying this? Subscribe!") — kills the read.
- "Like, subscribe, share" combo — reads as YouTube filler.
- CTAs that ask for feedback without a specific ask ("let me know what you think").
- "P.S." blocks that try to smuggle in a second CTA.

## Invocation Patterns

Kickoffs to recognize:

- "Interview me about [project]. Ask the questions." → Start Module 1, Section 1.
- "Run the master interviewer on [project]." → Start Module 1, Section 1.
- "Here are notes / transcripts / code. Draft the article." → Skip Module 1, go to Module 2 with the material provided; ask only for what's missing.
- "Voice-check this draft." → Run Module 3 only.
- "Format this for Substack." → Run Module 4 only.
- "Turn this transcript into a Substack post." → Module 2 → Module 3 → Module 4.

## Handoff to `project-recap-substack`

When both skills are available and the user wants the highest-quality article:

1. Complete Module 1 fully. Get the `Transcript Summary` block.
2. Invoke `project-recap-substack` with the Transcript Summary + raw transcript as input, explicitly noting: "Interview complete. Skip your interview step. Write the article directly from this material."
3. Run Module 3 on the output.
4. Apply Module 4 CTA logic.
5. Ship as `<project-slug>-recap.md`.

If `project-recap-substack` is not available, this skill produces the full article using Module 4's template and voice constraints from Module 3.

## Ceilings and Defaults

Print this near the end of any drafting session as a self-check:

```
Ceilings: 1,200 words. 2 em-dashes. 1 code block. 3–6 named tools.
Anchor every section on a verbatim phrase from the transcript.
Voice: first-person minimal-I, ~4–5/10 technical depth, casual-but-professional.
CTA: one action + optional disclaimer. Never two action CTAs.
```

## Non-Negotiables

- Never fabricate metrics, user counts, dollar amounts, or performance claims.
- Never re-ask questions the user has already answered in the same session or attached material.
- Never write the article inside Module 1. Interview and drafting are separate turns.
- Never stack two action CTAs.
- Never use em-dashes as default connectors.
- Always ground every section on verbatim phrases from the transcript.
