# Engineering Workflow

Bang Motion is the laboratory/source of lessons for Motionav. This workflow governs changes made in this repository while keeping the repository suitable for experiments and evidence gathering.

## Core loop

For a non-trivial change:

1. **Inspect** — understand the current repository state and relevant implementation before editing.
2. **Plan** — state the smallest change that addresses the task, including verification.
3. **Implement** — make the minimum scoped change; do not refactor unrelated code.
4. **Verify** — run the checks relevant to the change. For visual/runtime changes, perform browser verification and inspect representative output.
5. **Review** — inspect the final diff and check for unrelated files, temporary artifacts, and unintended behavior.
6. **Commit** — create a focused commit that describes the change.

## Branches

- Keep `main` stable.
- Use a short-lived branch for non-trivial changes.
- Keep each branch focused on one coherent purpose.
- Do not use branches to bypass review or verification.

## Verification expectations

Verification must match the change:

- Documentation-only changes: inspect the rendered/source diff and references affected.
- Code changes: run the relevant existing checks or scripts.
- Runtime/visual changes: verify in a browser and inspect representative states/frames when practical.
- Deterministic behavior: confirm that the same scene and timeline input produce consistent results.

Do not invent a test command or claim a check passed unless it was actually run.

## Commit discipline

Prefer small, focused commits. A commit should leave the repository in a coherent state and should not contain unrelated generated files or local experiments.

Commit messages should use a concise imperative description, for example:

- `feat: add ...`
- `fix: correct ...`
- `docs: document ...`
- `chore: update ...`

## Pull requests

For changes that benefit from review:

- explain the purpose and scope;
- list verification performed and its result;
- call out known risks or remaining uncertainty;
- keep the PR focused enough that the diff can be reviewed as a unit.

## Motionav boundary

Do not treat this workflow as evidence that Bang Motion should become the Motionav repository. Bang Motion remains a laboratory. Capabilities should move toward Motionav only when their implementation is understood, provenance is known, the ownership boundary is clear, the capability is useful to Motionav, and it does not lock Motionav Core to a channel-specific need.
