# SkillOpt — Paper Summary

Source: Yang, Gong, Huang, Yang, Zhou, Huang, Li, Gao, Dai, Liu, Qiu, Yang, Chen, Yang, Luo. *SkillOpt: Executive Strategy for Self-Evolving Agent Skills*. arXiv:2605.23904v2 (May 2026). Microsoft, Shanghai Jiao Tong University, Tongji University, Fudan University. Code: https://aka.ms/SkillOpt.

Load this file when you need the empirical justification, headline numbers, or transfer evidence behind the SkillOpt loop.

## Problem Framing

Frontier LLMs are deployed as agents with tools, files, verifiers, and multi-step harnesses. Domain adaptation is no longer only about weights or prompts — it is about the *procedures* the agent uses: how it gathers evidence, calls tools, follows domain conventions, and formats outputs. A **skill** is the natural interface for that procedural adaptation: a portable natural-language artifact that packages procedures, domain heuristics, tool policies, output constraints, and failure modes, letting a frozen agent adapt through external text.

Existing skill workflows are one of three things, none satisfactory:

1. **Hand-crafted** — brittle outside the author's target domain.
2. **One-shot LLM-generated** — high variance, frequently regresses against no-skill.
3. **Loosely controlled self-revision** — large semantic jumps, unstable updates.

None behaves like a deep-learning optimizer for the skill, and none reliably improves over its starting point under feedback. SkillOpt treats the skill as the **external state** of a frozen agent and trains it with weight-space-style discipline.

## Method (Section 3)

### 3.1 Problem setup

- Skill `s` is a natural-language policy prepended to the agent context (or written as persistent procedural memory in tool-use harnesses).
- `M` is the frozen target model. Harness `h` produces `(τ(s), r(s)) = h(M, x, s)` with `r ∈ [0, 1]`.
- Splits: `D_tr` (rollout evidence), `D_sel` (update gate), `D_test` (locked until final report).
- Optimizer state: current skill, best validation-gated skill, cached skill hashes, epoch-local rejected-step buffer, optional slow/meta-update state.
- Deployed output: `best_skill.md` only.

### 3.2 Forward pass — rollout evidence

Target model runs a rollout batch from `D_tr` with the current skill. Harness records task metadata, messages, tool calls, observations, command outputs, final answers, verifier feedback, and benchmark-specific context. Accumulation: several rollout batches reflected on separately, then merged into one update.

### 3.3 Backward pass — minibatch reflection

Optimizer model separates failures from successes and partitions each group into reflection minibatches. Single trajectories produce anecdotal fixes; minibatches expose **reusable procedural errors** (e.g., agent consistently searches the wrong source, writes the answer in the wrong format, fails to verify a tool result). Failure minibatches propose missing/corrective rules; success minibatches preserve working behaviors. Output: structured add/delete/replace edits (patch mode) or a small set of rewrite suggestions (rewrite mode).

Hierarchical merge: failure-driven first, success-driven second, then combined with **priority on failure corrections**. Drops duplicates, contradictions, example-specific suggestions.

### 3.4 Bounded text updates

Edit budget `L_t` is the textual learning rate. Optimizer ranks the merged edit pool by expected utility and **clips to top `L_t` edits**. Schedules: constant / linear / cosine *(default)* / autonomous. Patch mode = atomic append/insert/replace/delete; rewrite mode = full skill rewrite conditioned on selected suggestions. **Step-level edits cannot overwrite the protected slow-update field.**

### 3.5 Validation gate and rejected-edit buffer

Every candidate skill is evaluated on `D_sel` with the same frozen target model and harness.

- Improves over current → new current skill.
- Also exceeds best so far → becomes `best_skill.md`.
- Otherwise → rejected.

Rejected edits are written to an **epoch-local buffer** (failure patterns + tried edits + score drops) that is prepended to subsequent optimizer prompts in the same epoch. Negative feedback during training with **zero inference-time cost**.

### 3.6 Epoch-wise slow/meta update

At the end of each epoch, re-sample the same training items under the previous and current skill; bucket into improvements / regressions / persistent failures / stable successes. Optimizer writes a longitudinal guidance block into the **protected slow-update field**. Still passes through the validation gate.

The **meta-skill** is optimizer-side only — summarizes which edit patterns helped, which were rejected, which failures persisted. Prepended to future optimizer prompts. **Not shipped with the target model.** Deployed skill stays compact and portable; training benefits from a richer record.

### 3.7 Harness-agnostic deployment

Adapter constructs train/eval batches, injects current skill into agent context, runs native harness, returns scored trajectories. Same optimizer works for direct QA, spreadsheet execution, document reasoning, multimodal QA, embodied environments, Codex-style and Claude Code-style execution loops.

## Headline Results

**Benchmarks:** SearchQA, SpreadsheetBench, OfficeQA, DocVQA, LiveMathematicianBench, ALFWorld.
**Target models:** GPT–5.5, GPT–5.4, GPT–5.4-mini, GPT–5.4-nano, GPT–5.2, Qwen3.5–4B, Qwen3.6–35B-A3B.
**Harnesses:** direct chat, Codex, Claude Code.
**Baselines:** No skill, Human skill, LLM skill (one-shot), Trace2Skill, TextGrad, GEPA, EvoSkill.

- SkillOpt is **best or tied-best on all 52 evaluated (model, benchmark, harness) cells**.
- On GPT–5.5, average gain over no skill: **+23.5 (direct chat)**, **+24.8 (Codex)**, **+19.1 (Claude Code)**.
- On GPT–5.5 direct chat: SearchQA 77.7→87.3, SpreadsheetBench 41.8→80.7, OfficeQA 33.1→72.1, DocVQA 78.8→91.2, LiveMath 37.6→66.9, ALFWorld 83.6→95.5.
- Beats strongest per-cell baseline by **+5.4 points on average** in direct chat.
- Beats EvoSkill by **+14.0** (Codex) and **+3.2** (Claude Code).

## Transfer Evidence

- A SpreadsheetBench skill trained on GPT–5.4 improves every smaller GPT variant tested (cross-model).
- A Codex-trained spreadsheet skill transfers to Claude Code with **+59.7** points (cross-harness).
- An OlympiadBench skill yields positive gains on Omni-MATH (cross-benchmark).

Implication: optimize once, audit as text, reuse across related models / harnesses / tasks **without changing model weights**.

## Ablation Highlights

- **Bounded textual learning** outperforms uncontrolled rewriting.
- **Held-out gating** prevents harmful proposals from accumulating.
- **Rejected-step buffer** converts failed edits into useful negative feedback.
- **Epoch-wise slow/meta update** improves long-horizon refinement without bloating the deployed skill.
- Learned skills remain **compact (300–2,000 tokens, 1–4 accepted edits)**, **inspectable**, and **procedural rather than instance-specific**.

## Operational Defaults Implied by the Paper

- Skill size target: **300–2,000 tokens**.
- Accepted edits per converged run: **1–4**.
- Validation rule: **strict improvement** on `D_sel`.
- Default schedule: **cosine**.
- Default mode: **patch** (atomic add/delete/replace).
- Slow/meta update: **once per epoch**, protected field, same validation gate.
- Meta-skill: **never deployed**, only prepended to optimizer prompts.
