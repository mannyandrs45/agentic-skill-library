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
